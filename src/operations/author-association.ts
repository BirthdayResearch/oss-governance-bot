import {AuthorAssociation} from '../config'
import * as github from '@actions/github'

function getAuthorAssociation(): string | undefined {
  const payload = github.context.payload
  const current = payload.comment || payload.pull_request || payload.issue
  return current?.author_association
}

export function isAuthorAssociationAllowed(
  authorAssociation: AuthorAssociation | undefined
): boolean {
  if (!authorAssociation) {
    return true
  }

  switch (getAuthorAssociation()) {
    case 'COLLABORATOR':
      return !!authorAssociation.collaborator
    case 'CONTRIBUTOR':
      return !!authorAssociation.contributor
    case 'FIRST_TIMER':
      return !!authorAssociation.first_timer
    case 'FIRST_TIME_CONTRIBUTOR':
      return !!authorAssociation.first_time_contributor
    case 'MANNEQUIN':
      return !!authorAssociation.mannequin
    case 'MEMBER':
      return !!authorAssociation.member
    case 'NONE':
      return !!authorAssociation.none
    case 'OWNER':
      return !!authorAssociation.owner
    default:
      return false
  }
}
