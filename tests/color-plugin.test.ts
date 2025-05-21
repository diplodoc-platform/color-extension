import MarkdownIt from 'markdown-it';
import colorPlugin from '../src/index';

describe('escape: false', () => {
    const mdNoEscape = MarkdownIt().use(colorPlugin, {
        defaultClassName: 'colorify',
        inline: false,
        escape: false,
    });

    test('Basic green color block', () => {
        const input = '{green}(hello)';
        const output = mdNoEscape.renderInline(input);
        expect(output).toBe('<span class="colorify colorify--green">hello</span>');
    });

    test('Nested blue inside green', () => {
        const input = '{green}(some{blue}(2,3){green}())';
        const output = mdNoEscape.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some' +
            '<span class="colorify colorify--blue">2,3</span>' +
            '<span class="colorify colorify--green"></span>' +
            '</span>'
        );
    });

    test('Unescaped nested parentheses inside color block', () => {
        const input = '{green}(some(2,3))';
        const output = mdNoEscape.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some(2,3)</span>'
        );
    });
});

describe('escape: true', () => {
    const md = MarkdownIt().use(colorPlugin, {
        defaultClassName: 'colorify',
        inline: false,
        escape: true,
    });

    test('Basic green color block', () => {
        const input = '{green}(hello)';
        const output = md.renderInline(input);
        expect(output).toBe('<span class="colorify colorify--green">hello</span>');
    });

    test('Nested blue inside green', () => {
        const input = '{green}(some{blue}(2,3){green}())';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some' +
            '<span class="colorify colorify--blue">2,3</span>' +
            '<span class="colorify colorify--green"></span>' +
            '</span>'
        );
    });

    test('Unescaped nested parentheses inside color block', () => {
        const input = '{green}(some(2,3))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some(2,3)</span>'
        );
    });

    test('Preserve backslashes with escape enabled', () => {
        const input = '{green}(some\(2,3\))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some(2,3)</span>'
        );
    });

    test('No escaping: plain nested colors', () => {
        const input = '{green}(some){blue}(2,3){green}()';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some</span>' +
            '<span class="colorify colorify--blue">2,3</span>' +
            '<span class="colorify colorify--green"></span>'
        );
    });

    test('Escaped parentheses in nested color blocks', () => {
        const input = '{green}(some\\(){blue}(2,3){green}(\\))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some(</span>' +
            '<span class="colorify colorify--blue">2,3</span>' +
            '<span class="colorify colorify--green">)</span>'
        );
    });


    test('Escaped and raw backslashes in nested blocks', () => {
        const input = '{green}(some\\(){blue}(2\\\\3){green}(\\))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some(</span>' +
            '<span class="colorify colorify--blue">2\\3</span>' +
            '<span class="colorify colorify--green">)</span>'
        );
    });

    test('Handle multiple backslashes and parentheses in nested blocks', () => {
        const input = '{green}(some\\\\\\(){blue}(2\\\\3){green}(\\\\\\))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some\\(</span>' +
            '<span class="colorify colorify--blue">2\\3</span>' +
            '<span class="colorify colorify--green">\\)</span>'
        );
    });

    test('Escaped backslashes and square brackets in nested blocks', () => {
        const input = '{green}(some\\(){blue}(2\\\[){green}(\\))';
        const output = md.renderInline(input);
        expect(output).toBe(
            '<span class="colorify colorify--green">some(</span>' +
            '<span class="colorify colorify--blue">2[</span>' +
            '<span class="colorify colorify--green">)</span>'
        );
    });
});