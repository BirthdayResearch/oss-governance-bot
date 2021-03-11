import {Capture} from '../config'
import {getBody} from '../command'
import {addLabels, hasReleaseByTag} from '../github'

async function parseLabel(
  capture: Capture,
  array: RegExpExecArray
): Promise<string | undefined> {
  let capturedText = (array[1] || '').trim()
  if (capture.github_release) {
    // Automatically parse semantic release
    capturedText = capturedText.replace(/^v/, '')

    if (
      !(await hasReleaseByTag(`v${capturedText}`)) &&
      !(await hasReleaseByTag(capturedText))
    ) {
      return
    }
  }

  return capture.label.replace('$CAPTURED', capturedText)
}

export default async function (capture: Capture): Promise<void> {
  const regex = new RegExp(capture.regex, `${capture.ignore_case ? 'i' : ''}`)

  for (const line of getBody().split('\n')) {
    const array = regex.exec(line)
    if (!array) {
      continue
    }

    const label = await parseLabel(capture, array)
    if (label) {
      await addLabels([label])
    }
  }
}
