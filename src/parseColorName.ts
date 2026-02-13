import type StateInline from 'markdown-it/lib/rules_inline/state_inline';

import {ColorTokenChar} from './constants';
import {isEscaped} from './utils';

/**
 * Parse color name inside `{...}`; returns end position or -1 on failure.
 *
 * @param state - Inline state from markdown-it.
 * @param start - Start position (at the opening `{`).
 * @param disableNested - If true, reject nested `{` inside the name.
 * @param shouldEscape - If true, respect backslash escapes.
 * @returns End position of the closing `}`, or -1.
 */
export const parseColorName = (
    state: StateInline,
    start: number,
    disableNested: boolean,
    shouldEscape = false,
): number => {
    let level = 1;
    let found = false;
    let prevPos: number;
    let labelEnd = -1;
    const max = state.posMax;
    const oldPos = state.pos;

    state.pos = start + 1;

    while (state.pos < max) {
        const marker = state.src.charCodeAt(state.pos);

        if (
            !(shouldEscape && isEscaped(state.src, state.pos)) &&
            marker === ColorTokenChar.CloseColorName
        ) {
            level--;
            if (level === 0) {
                found = true;
                break;
            }
        }

        prevPos = state.pos;
        state.md.inline.skipToken(state);

        if (
            !(shouldEscape && isEscaped(state.src, state.pos)) &&
            marker === ColorTokenChar.OpenColorName
        ) {
            if (prevPos === state.pos - 1) {
                // increase level if we find open bracket, which is not a part of any token
                level++;
            } else if (disableNested) {
                state.pos = oldPos;
                return -1;
            }
        }
    }

    if (found) {
        labelEnd = state.pos;
    }

    // restore old state
    state.pos = oldPos;

    return labelEnd;
};
