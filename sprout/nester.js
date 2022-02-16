import Keywords from './keywords.js'

export default function nester(tokens, terminationKeywordIndex, messenger) {
    let nextCommandIndex
    let amountOfFunctionKeywords = 1
    let amountofFunctionTerminationKeywords = 0
    let tokensCopy = tokens.slice(terminationKeywordIndex + 1)

    let counter = 0

    while (amountOfFunctionKeywords !== amountofFunctionTerminationKeywords) {
        let functionKeywordIndex = tokensCopy.indexOf(Keywords.FUNCTION_KY)
        let functionTerminationKeywordIndex = tokensCopy.indexOf(
            Keywords.FUNCTION_TERMINATION_KY
        )

        if (functionKeywordIndex === -1) functionKeywordIndex = Infinity
        if (functionTerminationKeywordIndex === -1)
            functionTerminationKeywordIndex = Infinity

        if (functionKeywordIndex < functionTerminationKeywordIndex) {
            amountOfFunctionKeywords++
            tokensCopy = tokensCopy.slice(functionKeywordIndex + 1)
        }

        if (functionKeywordIndex > functionTerminationKeywordIndex) {
            amountofFunctionTerminationKeywords++
            nextCommandIndex =
                functionTerminationKeywordIndex +
                (tokens.length - tokensCopy.length) +
                2
            tokensCopy = tokensCopy.slice(functionTerminationKeywordIndex + 1)
        }

        counter++
        if (counter > 100) {
            messenger(
                'You forgot to type "stop" to complete one or more of the following:\n- function\n- if statement\n- else statement'
            )
            return 1
        }
    }

    return nextCommandIndex
}
