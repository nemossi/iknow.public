import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

import type { Element, Root } from 'hast';
import type { VFile } from 'vfile';
import rehypeKatex from 'rehype-katex';
import rehypeMathjax from 'rehype-mathjax';

// Force no line-breakings in inline math mode for KaTeX
const mathjaxCssData =
`
    mjx-container.MathJax[jax="SVG"],
    mjx-container.MathJax_inline[jax="SVG"],
    mjx-nobr
    {
        display: inline !important;
        white-space: nowrap !important;
        overflow-wrap: normal !important;
        word-break: normal !important;
    }
    
    mjx-container.MathJax[jax="SVG"] > svg,
    mjx-container.MathJax_inline[jax="SVG"] > svg
    {
        display: inline !important;
    }
`;

export interface RehypeMathDynOptions
{
    default: 'katex' | 'mathjax' | 'mathml';
    rehypeKatexOptions?: any;
    rehypeMathjaxOptions?: any;
    css?: boolean;
    fmcp?: string;
}

function injectCssFile(tree: Root, href: string) {
  const head = getOrCreateHead(tree);
  const linkNode: Element = {
    type: 'element',
    tagName: 'link',
    properties: { rel: 'stylesheet', href },
    children: []
  };
  head.children.push(linkNode);
}

function getOrCreateHead(tree: Root): Element
{
    let head: Element | undefined;

    visit(tree, 'element', (node: Element) =>
    {
        if (node.tagName === 'head')
        {
            head = node;
        }
    });

    if (!head)
    {
        visit(tree, 'element', (node: Element) =>
        {
            if (node.tagName === 'html')
            {
                head = { type: 'element', tagName: 'head', properties: {}, children: [] };
                node.children.unshift(head);
            }
        });
    }

    return head!;
}

function injectCssLink(tree: Root, href: string, integrity?: string, crossorigin?: string)
{
    const head = getOrCreateHead(tree);
    const link: Element =
    {
        type: 'element',
        tagName: 'link',
        properties:
        {
            rel: 'stylesheet',
            href,
            integrity,
            crossorigin
        },
        children: []
    };

    head.children.push(link);
}

function injectInlineCss(tree: Root, cssCode: string)
{
    const head = getOrCreateHead(tree);
    const css: Element =
    {
        type: 'element',
        tagName: 'style',
        properties: {},
        children: [{ type: 'text', value: cssCode }]
    };
    head.children.push(css);
}

function getValueByPath(obj: any, path: string): any
{
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

const rehypeMathDyn: Plugin<[], Root> = function rehypeMathDyn(options: RehypeMathDynOptions = { default: 'mathml', css: false })
{
    return function transformer(tree: Root, file: VFile)
    {
        const engine = getValueByPath(file.data, options.fmcp || 'astro.frontmatter.formula');
        if(engine === 'katex')
        {
            var katex = rehypeKatex(options.rehypeKatexOptions);
            katex(tree, file);
            if (options.css)
            {
                injectCssLink
                (
                    tree,
                    'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css',
                    'sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib', 
                    'anonymous'
                );
            }
        }
        else if(engine === 'mathjax')
        {
            var mathjax = rehypeMathjax(options.rehypeMathjaxOptions);
            mathjax(tree);
            if (options.css)
            {
                injectInlineCss(tree, mathjaxCssData);
            }
        }

        return tree;
    }
};

export default rehypeMathDyn;
