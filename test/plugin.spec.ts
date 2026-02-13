import MarkdownIt from 'markdown-it';
import {describe, expect, it} from 'vitest';

import colorPlugin from '../src/index';

describe('escape: false', () => {
    const mdNoEscape = new MarkdownIt().use(colorPlugin, {
        defaultClassName: 'colorify',
        inline: false,
        escape: false,
    });

    it('Basic green color block', () => {
        const input = '{green}(hello)';
        const output = mdNoEscape.renderInline(input);
        expect(output).toBe('<span class="colorify colorify--green">hello</span>');
    });

    it('Nested blue inside green', () => {
        const input = '{green}(some{blue}(2,3){green}())';
        const output = mdNoEscape.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some' +
                '<span class="colorify colorify--blue">2,3</span>' +
                '<span class="colorify colorify--green"></span>' +
                '</span>',
        );
    });

    it('Unescaped nested parentheses inside color block', () => {
        const input = '{green}(some(2,3))';
        const output = mdNoEscape.renderInline(input);
        expect(output).toBe('<span class="colorify colorify--green">some(2,3)</span>');
    });
});

describe('escape: true', () => {
    const md = new MarkdownIt().use(colorPlugin, {
        defaultClassName: 'colorify',
        inline: false,
        escape: true,
    });

    it('Basic green color block', () => {
        const input = '{green}(hello)';
        const output = md.renderInline(input);
        expect(output).toBe('<span class="colorify colorify--green">hello</span>');
    });

    it('Nested blue inside green', () => {
        const input = '{green}(some{blue}(2,3){green}())';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some' +
                '<span class="colorify colorify--blue">2,3</span>' +
                '<span class="colorify colorify--green"></span>' +
                '</span>',
        );
    });

    it('Unescaped nested parentheses inside color block', () => {
        const input = '{green}(some(2,3))';
        const output = md.renderInline(input);
        expect(output).toBe('<span class="colorify colorify--green">some(2,3)</span>');
    });

    it('Preserve backslashes with escape enabled', () => {
        const input = '{green}(some\\(2,3\\))';
        const output = md.renderInline(input);
        expect(output).toBe('<span class="colorify colorify--green">some(2,3)</span>');
    });

    it('No escaping: plain nested colors', () => {
        const input = '{green}(some){blue}(2,3){green}()';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some</span>' +
                '<span class="colorify colorify--blue">2,3</span>' +
                '<span class="colorify colorify--green"></span>',
        );
    });

    it('Escaped parentheses in nested color blocks', () => {
        const input = '{green}(some\\(){blue}(2,3){green}(\\))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some(</span>' +
                '<span class="colorify colorify--blue">2,3</span>' +
                '<span class="colorify colorify--green">)</span>',
        );
    });

    it('Escaped and raw backslashes in nested blocks', () => {
        const input = '{green}(some\\(){blue}(2\\\\3){green}(\\))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some(</span>' +
                '<span class="colorify colorify--blue">2\\3</span>' +
                '<span class="colorify colorify--green">)</span>',
        );
    });

    it('Handle multiple backslashes and parentheses in nested blocks', () => {
        const input = '{green}(some\\\\\\(){blue}(2\\\\3){green}(\\\\\\))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some\\(</span>' +
                '<span class="colorify colorify--blue">2\\3</span>' +
                '<span class="colorify colorify--green">\\)</span>',
        );
    });

    it('Escaped backslashes and square brackets in nested blocks', () => {
        const input = '{green}(some\\(){blue}(2\\[){green}(\\))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some(</span>' +
                '<span class="colorify colorify--blue">2[</span>' +
                '<span class="colorify colorify--green">)</span>',
        );
    });
});
