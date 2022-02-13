import Keywords from './keywords.js'

export default function format(rawCode) {
    const { STRING_KY, TERMINATION_KY, FUNCTION_KY } = Keywords

    // adds periods at the end of each line
    let newCode = rawCode.split('\n').join(TERMINATION_KY)
    newCode += TERMINATION_KY

    // removes spaces
    let inString = false
    const space = ' '
    newCode = newCode
        .split('')
        .map(char => {
            if (!inString && char === space) return ''

            if (char === STRING_KY) inString = !inString

            return char
        })
        .join('')

    // adds periods at the end of function keywords
    for (let i = 0; i < newCode.length; i++) {
        if (i >= newCode.length - FUNCTION_KY.length) break

        if (newCode.substr(i, FUNCTION_KY.length) === FUNCTION_KY) {
            newCode =
                newCode.substring(0, i) +
                FUNCTION_KY +
                TERMINATION_KY +
                newCode.substring(i + FUNCTION_KY.length)
            i += FUNCTION_KY.length + TERMINATION_KY.length
        }
    }

    return newCode
}
