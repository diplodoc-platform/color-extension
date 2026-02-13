[![NPM version](https://img.shields.io/npm/v/@diplodoc/color-extension.svg?style=flat)](https://www.npmjs.org/package/@diplodoc/color-extension)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=diplodoc-platform_color-extension&metric=alert_status)](https://sonarcloud.io/summary/overall?id=diplodoc-platform_color-extension)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=diplodoc-platform_color-extension&metric=coverage)](https://sonarcloud.io/summary/overall?id=diplodoc-platform_color-extension)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=diplodoc-platform_color-extension&metric=sqale_rating)](https://sonarcloud.io/summary/overall?id=diplodoc-platform_color-extension)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=diplodoc-platform_color-extension&metric=reliability_rating)](https://sonarcloud.io/summary/overall?id=diplodoc-platform_color-extension)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=diplodoc-platform_color-extension&metric=security_rating)](https://sonarcloud.io/summary/overall?id=diplodoc-platform_color-extension)

# @diplodoc/color-extension

Inline color plugin for [Diplodoc](https://diplodoc.com/) and [markdown-it](https://github.com/markdown-it/markdown-it). Renders `{colorName}(text)` as styled spans (e.g. for semantic or custom colors).

## Install

```bash
npm install @diplodoc/color-extension
```

**Peer dependency:** `markdown-it` ^13.0.0.

## Quick start

```javascript
const MarkdownIt = require('markdown-it');
const colorPlugin = require('@diplodoc/color-extension');

const md = new MarkdownIt().use(colorPlugin);

md.renderInline('{green}(hello)');
// => '<span class="yfm-colorify yfm-colorify--green">hello</span>'
```

With ESM:

```javascript
import MarkdownIt from 'markdown-it';
import colorPlugin from '@diplodoc/color-extension';

const md = new MarkdownIt().use(colorPlugin);
md.renderInline('{primary}(sample)');
```

## Syntax

- **Pattern:** `{colorName}(content)`
- **Color name:** any valid CSS color (e.g. `red`, `#f00`, `rgb(255,0,0)`) or semantic names like `primary`, `green`.
- **Nested colors:** `{green}(some {blue}(nested) text)`.

Examples:

| Input                    | Output (default)                                              |
| ------------------------ | ------------------------------------------------------------- |
| `{green}(hello)`         | `<span class="yfm-colorify yfm-colorify--green">hello</span>` |
| `{red}(alert)`           | `<span class="yfm-colorify yfm-colorify--red">alert</span>`   |
| `{green}(a {blue}(b) a)` | green span containing «a », blue span «b», green span « a»    |

## API

Use the plugin with optional settings:

```javascript
const md = new MarkdownIt().use(colorPlugin, {
  defaultClassName: 'yfm-colorify', // base class; modifier is `${defaultClassName}--${colorName}`
  inline: false, // if true, add inline style="color: ${colorName};"
  escape: false, // if true, allow \ to escape parentheses inside content
});
```

### Options

| Option             | Default          | Description                                                                                       |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------- |
| `defaultClassName` | `'yfm-colorify'` | Base CSS class; modifier `--${colorName}` is added.                                               |
| `inline`           | `false`          | When `true`, add `style="color: ${colorName};"` to the span.                                      |
| `escape`           | `false`          | When `true`, backslash escapes parentheses inside `(content)` so literal `(` and `)` can be used. |

### Example: custom class and inline style

```javascript
const md = new MarkdownIt().use(colorPlugin, {
  defaultClassName: 'my-color',
  inline: true,
});

md.renderInline('{red}(sample)');
// => '<span class="my-color my-color--red" style="color: red;">sample</span>'
```

### Example: escape parentheses

With `escape: true`, `\(` and `\)` inside the content are rendered as literal `(` and `)`:

```javascript
const md = new MarkdownIt().use(colorPlugin, {escape: true});
md.renderInline('{green}(some(2,3))'); // => green span with "some(2,3)"
md.renderInline('{green}(some\\(2,3\\))'); // => green span with "some(2,3)"
```

## Development

- **Build:** `npm run build`
- **Tests:** `npm test` (Vitest), `npm run test:watch`, `npm run test:coverage`
- **Lint:** `npm run lint`, `npm run lint:fix`
- **Type check:** `npm run typecheck`
