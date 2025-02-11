import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export function remarkReadingTime()
{
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    return function (tree, { data })
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
        tree.children = tree.children.filter(
            (node: any) => !(node.type === 'heading' && node.depth === 1)
        );
    };
}
  