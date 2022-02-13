import Keywords from './keywords.js'

export default function tokenize(rawCode) {
    if (rawCode.length === 0) return []

    let token = ''
    const keywordsList = Object.values(Keywords)

    for (let i in keywordsList) {
        const keyword = keywordsList[i]

        if (rawCode.startsWith(keyword)) {
            const { STRING_KY } = Keywords

            if (keyword === STRING_KY) {
                const secondCharString = rawCode.indexOf(
                    STRING_KY,
                    STRING_KY.length
                )

                if (secondCharString === -1)
                    return [
                        STRING_KY,
                        ...tokenize(rawCode.substring(STRING_KY.length)),
                    ]

                const stringText = rawCode.substring(
                    STRING_KY.length,
                    secondCharString
                )
                const length = 2 * STRING_KY.length + stringText.length

                return [
                    STRING_KY,
                    stringText,
                    STRING_KY,
                    ...tokenize(rawCode.substring(length)),
                ]
            }

            token = keyword
            break
        }
    }

    if (token.length === 0) {
        const indexes = keywordsList.map(keyword => {
            const index = rawCode.indexOf(keyword)
            return index === -1 ? Infinity : index
        })
        let minIndex = Infinity

        indexes.forEach(index => (minIndex = Math.min(minIndex, index)))

        if (!Number.isFinite(minIndex)) token = rawCode
        else token = rawCode.substring(0, minIndex)
    }

    return [token, ...tokenize(rawCode.substring(token.length))]
}
