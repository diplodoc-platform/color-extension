import StateInline from 'markdown-it/lib/rules_inline/state_inline'

import {escape} from './constants';

export function isEscaped(state: StateInline): boolean {
    // An escape is valid if it is preceded by an **odd** number of consecutive
    // backslashes. This handles cases like `\\(` where the first backslash
    // escapes the second, so the parenthesis is *not* escaped.
    let count = 0;
    let i = state.pos - 1;

    while (i >= 0 && state.src.charCodeAt(i) === escape) {
        count++;
        i--;
    }

    return count % 2 === 1;
}