import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export function remarkReadingTime()
{
    return function (tree: any, { data }: { data: any })
    {
        const textOnPage = toString(tree)
        const readingTime = getReadingTime(textOnPage)
        data.astro.frontmatter.minutesRead = readingTime.text
    }
}

export function remarkRemoveH1()
{
    return function (tree: any)
    {
        tree.children = tree.children.filter
        (
            (node: any) => !(node.type === 'heading' && node.depth === 1)
        );
    };
}
