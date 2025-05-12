import MarkdownIt from 'markdown-it';
import colorPlugin from '../src/index';

describe('markdown-it-color plugin', () => {
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

    test('Escaped parentheses are preserved', () => {
        const input = '{green}(\\(test\\))';
        const output = md.renderInline(input, {escape: true});
        expect(output).toBe('<span class="colorify colorify--green">(test)</span>');
    });
});