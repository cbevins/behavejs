import { gxmlLine } from '$lib/gxml/gxmlTemplates.js'
/**
 * Returns an array of Gxml els[] for a gridded page
 * @param {number} cellWd cell width (inches)
 * @param {number} cellHt cell height (inches)
 * @param {number} left page left margin (inches)
 * @param {number} right page right margin (inches)
 * @param {number} top page top margin (inches)
 * @param {number} bottom page bottom margin (inches)
 * @param {number} pageWd page width (inches)
 * @param {number} pageHt page height (inches)
 * @returns Array of Gxml els[] to add to parent els or sumbitted to gxmlStr()
 */
export function gxmlGrid(cellWd=0.25, cellHt=0.25,
    left=0.25, right=0.25, top=0.25, bottom=0.25,
    pageWd=8.5, pageHt=11)
{
    const tLine = {...gxmlLine, stroke: 'grey', 'stroke-width': 0.5}
    const els = []

    // vertical lines
    let y1 = top + 'in'
    let y2 = (pageHt-bottom) + 'in'
    for (let x=left; x<=pageWd-right; x+=cellWd) {
        const a = x+'in'
        els.push({...tLine, x1: a, x2: a, y1, y2})
    }

    // horizontal lines
    let x1 = left + 'in'
    let x2 = (pageWd-right) + 'in'
    for (let y=top; y<=pageHt-bottom; y+=cellHt) {
        const a = y+'in'
        els.push({...tLine, x1, x2, y1: a, y2: a})
    }
    return els
}