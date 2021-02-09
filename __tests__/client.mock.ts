// @ts-ignore
import fs from 'fs'
import {GitHub} from '@actions/github/lib/utils'

/**
 * Centralized mock GitHub client for easier testing
 */
export function mockClient(): InstanceType<typeof GitHub> {
  return {
    repos: {
      // @ts-ignore
      getContent(params) {
        if (params?.path) {
          return {
            data: {
              content: fs.readFileSync(params.path, 'utf8'),
              encoding: 'utf-8'
            }
          }
        }
      }
    }
  }
}
