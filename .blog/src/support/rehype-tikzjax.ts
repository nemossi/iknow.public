import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';
import type { Element, Root } from 'hast';
import tikzjax from 'node-tikzjax';

interface RehypeTikzjaxOptions
{
    debug: boolean;
    fmcp?: string;
}

function getValueByPath(obj: any, path: string): any
{
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

const rehypeTikzjax: Plugin<[], Root> = function rehypeTikzjax(options: RehypeTikzjaxOptions = { debug: true })
{
    return async function transformer(tree: Root, file: VFile): Promise<Root> 
    {
        const enabled = getValueByPath(file.data, options.fmcp || 'astro.frontmatter.tikz');
        if (!enabled)
        {
            return tree;
        }

        const nodesToReplace: Array<{ node: Element; index: number; parent: Element; code: string }> = [];
        visit(tree, 'element', (node: any, index, parent: any) =>
        {
            if
            (
                node.tagName === 'pre' &&
                node.children &&
                node.children.length > 0 &&
                node.children[0].tagName === 'code'
            )
            {
                const codeNode = node.children[0];
                if
                (
                    codeNode.properties &&
                    codeNode.properties.className &&
                    (codeNode.properties.className as string[]).some(cls => cls.toLowerCase().includes('language-tikz'))
                )
                {
                    const code = codeNode.value || (codeNode.children && codeNode.children[0]?.value);
                    nodesToReplace.push({ node, index: index!, parent, code });
                }
            }
        });

        for (const { index, parent, code } of nodesToReplace)
        {
            try
            {
                const svg = await tikzjax.default(code, { showConsole: true });
                const newNode: Element =
                {
                    type: 'element',
                    tagName: 'div',
                    properties: { className: ['tikz-diagram'] },
                    children:
                    [
                        {
                            type: 'raw',
                            value: svg,
                        },
                    ],
                };
                parent.children[index] = newNode;
            }
            catch (error)
            {
                console.error('TikZ Error:', error);
                const errorMessage = typeof error === 'string'
                    ? error
                    : error instanceof Error
                        ? error.message
                        : String(error);
                const errorNode: Element =
                {
                    type: 'element',
                    tagName: 'div',
                    properties: { className: ['tikz-error'] },
                    children:
                    [
                        {
                            type: 'raw',
                            value: `<pre style="color:red;">${errorMessage}</pre>`,
                        },
                    ],
                };
                parent.children[index] = errorNode;
            }
        }
        return tree;
    }
};

export default rehypeTikzjax;
