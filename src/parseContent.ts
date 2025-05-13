import StateInline from 'markdown-it/lib/rules_inline/state_inline'

import {ColorTokenChar} from './constants';
import {isEscaped} from "./utils";

/**
 * If successful, returns end pos.
 * Else, returns -1
 */
export const parseContent = (state: StateInline, start: number, shouldEscape: boolean = false): number => {
  let pos = start
  const max = state.posMax

  if (pos < max && state.src.charCodeAt(pos) === ColorTokenChar.OpenContent) {
    pos++

    let level = 1
    while (pos < max) {
      const char = state.src.charCodeAt(pos)
      if (!(shouldEscape && isEscaped(state)) && char === ColorTokenChar.CloseContent) {
        level--

        if (level === 0) {
          return pos
        }
      } else if (!(shouldEscape && isEscaped(state)) && char === ColorTokenChar.OpenContent) {
        level++
      }
      pos++
    }

    // if we failed to find ")"
    return -1
  } else {
    // if we failed to find "("
    return -1
  }
}
