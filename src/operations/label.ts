import {Label} from '../config'
import {Commands} from '../command'
import {
  addLabels,
  commitStatus,
  getLabels,
  postComment,
  removeLabels
} from '../github'
import * as github from '@actions/github'
import {isCreatedOpened} from '../ignore'

class PrefixLabelSet {
  public prefix: string
  public needs: boolean = false
  public labels: Set<string> = new Set<string>()
  public last: string | undefined
  private existing: string[] = []

  constructor(prefix: string) {
    this.prefix = prefix

    for (const label of getLabels()) {
      if (label === `needs/${prefix}`) {
        this.existing.push(label)
        this.needs = true
      } else if (label.startsWith(`${prefix}/`)) {
        this.existing.push(label)
        this.add(label)
      }
    }
  }

  remove(label: string) {
    this.labels.delete(label)
  }

  add(label: string) {
    this.labels.add(label)
    this.last = label
  }

  setMultiple(bool: boolean) {
    if (bool) {
      return
    }

    this.labels.clear()
    if (this.last) {
      this.labels.add(this.last)
    }
  }

  setNeeds(bool: boolean) {
    this.needs = bool && this.labels.size === 0
  }

  async persist() {
    const removes = []
    const adds = []

    for (const string of this.existing) {
      if (!this.labels.has(string)) {
        removes.push(string)
      }
    }

    for (const label of this.labels) {
      if (!this.existing.includes(label)) {
        adds.push(label)
      }
    }

    if (this.needs) {
      if (this.existing.includes(`needs/${this.prefix}`)) {
        // don't remove
        const index = removes.indexOf(`needs/${this.prefix}`)
        if (index > -1) {
          removes.splice(index, 1)
        }
      } else {
        // add missing
        adds.push(`needs/${this.prefix}`)
      }
    }

    await removeLabels(removes)
    await addLabels(adds)
  }
}

export default async function (
  label: Label,
  commands: Commands
): Promise<void> {
  const labelSet = new PrefixLabelSet(label.prefix)

  /**
   * Check if labeled is required
   */
  function needs() {
    const needCommands = [
      ...commands.prefix(`/needs ${label.prefix}`),
      ...commands.prefix(`/need ${label.prefix}`)
    ]

    if (needCommands.length) {
      return true
    }

    if (labelSet.needs) {
      return true
    }

    return !!label.needs
  }

  /**
   * Compute labels to add and remove
   * @return whether any prefixed label is present
   */
  function computeLabels() {
    const removing = commands
      .prefix(`/${label.prefix}-remove`)
      .flatMap(add => add.args.map(value => `${label.prefix}/${value}`))

    for (const value of removing) {
      labelSet.remove(value)
    }

    const adding = commands
      .prefix(`/${label.prefix}`)
      .flatMap(add => add.args.map(value => `${label.prefix}/${value}`))

    for (const value of adding) {
      labelSet.add(value)
    }
  }

  if (isCreatedOpened()) {
    computeLabels()
  }

  labelSet.setMultiple(label.multiple === undefined || label.multiple)
  labelSet.setNeeds(needs())
  await labelSet.persist()

  if (labelSet.needs) {
    await sendComment(label)
  }

  await sendStatus(label, !labelSet.needs)
}

/**
 * This only run on opened action so that it's not duplicated everytime a user comment.
 *
 * @param label to send comment to
 */
async function sendComment(label: Label) {
  if (github.context.payload.action !== 'opened') {
    return
  }

  if (typeof label.needs === 'boolean') {
    return
  }

  // Post comment if needs.comment is available
  const comment = label.needs?.comment
  if (comment) {
    await postComment(comment)
  }
}

async function sendStatus(label: Label, success: boolean) {
  if (typeof label.needs === 'boolean') {
    return
  }

  const status = label.needs?.status
  if (!status) {
    return
  }

  function description(): string | undefined {
    if (typeof status?.description === 'string') {
      return status?.description
    }

    if (success) {
      return status?.description?.success
    }

    return status?.description?.failure
  }

  function state(): 'success' | 'failure' | 'pending' {
    if (success) {
      return 'success'
    }

    if (typeof status?.description === 'string') {
      return 'failure'
    }

    if (typeof status?.description?.failure === 'string') {
      return 'failure'
    }

    return 'pending'
  }

  await commitStatus(status.context, state(), description(), status.url)
}
