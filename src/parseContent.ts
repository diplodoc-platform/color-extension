import type StateInline from 'markdown-it/lib/rules_inline/state_inline';

import {ColorTokenChar} from './constants';
import {isEscaped} from './utils';

/**
 * Parse content inside `(...)`; returns end position or -1 on failure.
 *
 * @param state - Inline state from markdown-it.
 * @param start - Start position (at the opening `(`).
 * @param shouldEscape - If true, respect backslash escapes for parentheses.
 * @returns End position of the closing `)`, or -1.
 */
export const parseContent = (state: StateInline, start: number, shouldEscape = false): number => {
    let pos = start;
    const {posMax: max, src} = state;

    if (pos >= max || src.charCodeAt(pos) !== ColorTokenChar.OpenContent) {
        return -1;
    }

    pos++;
    let level = 1;

    while (pos < max) {
        const char = src.charCodeAt(pos);

        if (shouldEscape && isEscaped(src, pos)) {
            pos++;
            continue;
        }

        if (char === ColorTokenChar.CloseContent) {
            level--;

            if (level === 0) {
                return pos;
            }
        } else if (char === ColorTokenChar.OpenContent) {
            level++;
        }

        pos++;
    }

    // if we failed to find "("
    return -1;
};
