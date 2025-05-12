import StateInline from 'markdown-it/lib/rules_inline/state_inline'

import {escape} from './constants';

export function isEscaped(state: StateInline): boolean {
    return state.pos > 0 && state.src.charCodeAt(state.pos - 1) === escape
}