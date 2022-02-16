import Keywords from './keywords.js'
import { getOperatorType, operatorValues } from './operators.js'
import nester from './nester.js'

export default function lex(tokens = [], messenger) {
    if (tokens.length === 0) return []

    const token = tokens[0]
    const terminationKeywordIndex = tokens.indexOf(Keywords.TERMINATION_KY)

    let tree
    switch (token) {
        case Keywords.DECLARATION_KY:
            tree = {
                type: 'declaration',
                varName: tokens[1],
                ...lex(tokens.slice(2), messenger),
            }

            if (terminationKeywordIndex === 2)
                return [
                    tree,
                    ...lex(
                        tokens.slice(terminationKeywordIndex + 1),
                        messenger
                    ),
                ]

            switch (tokens[2]) {
                case Keywords.ASSIGNMENT_KY:
                    tree = {
                        ...tree,
                        varType: 'var',
                        content: lexMath(
                            tokens.slice(3, terminationKeywordIndex)
                        ),
                    }
                    return [
                        tree,
                        ...lex(
                            tokens.slice(terminationKeywordIndex + 1),
                            messenger
                        ),
                    ]
                case Keywords.FUNCTION_KY:
                    tree = {
                        ...tree,
                        varType: 'function',
                        content: lex(tokens.slice(3), messenger),
                    }

                    const nextCommandIndex = nester(
                        tokens,
                        terminationKeywordIndex,
                        messenger
                    )

                    return [
                        tree,
                        ...lex(tokens.slice(nextCommandIndex), messenger),
                    ]
            }
            break
        case Keywords.PRINT_KY:
            tree = {
                type: 'print',
                content: lexMath(tokens.slice(1, terminationKeywordIndex)),
            }

            return [
                tree,
                ...lex(tokens.slice(terminationKeywordIndex + 1), messenger),
            ]
        case Keywords.FUNCTION_CALL_KY:
            tree = {
                type: 'call',
                functionName: tokens[1],
            }

            if (tokens[2] === Keywords.FUNCTION_ARGUMENT_KY) {
                try {
                    const args = []

                    let tokensCopy = tokens.slice(3)

                    for (let i = 0; 1; i++) {
                        const separatorKeywordIndex = tokensCopy.indexOf(
                            Keywords.FUNCTION_ARGUMENT_SEPARATOR_KY
                        )
                        if (separatorKeywordIndex === -1) break

                        const argument = tokensCopy.slice(
                            0,
                            separatorKeywordIndex
                        )

                        const renameIndex = Keywords.FUNCTION_ARGUMENT_RENAME_KY

                        if (renameIndex !== -1) {
                            const value = argument.slice(0, renameIndex)
                            const name = argument.slice(renameIndex + 1)

                            tokensCopy = tokensCopy.slice(separatorKeywordIndex)
                            args.push({ value: lexMath(value), name })
                        }

                        tokensCopy = tokensCopy.slice(2)

                        args.push({
                            value: lexMath(argument),
                            name: `var${i}`,
                        })
                    }

                    tree.arguments = args
                } catch (err) {
                    messenger('You are using function arguments incorrectly.')
                }
            }

            return [
                tree,
                ...lex(tokens.slice(terminationKeywordIndex + 1), messenger),
            ]
        case Keywords.IF_DECLARATION_KY:
        case Keywords.ELSE_DECLARATION_KY:
            const functionKeywordIndex = tokens.indexOf(Keywords.FUNCTION_KY)
            const conditionTokens = tokens.slice(
                1,
                -(tokens.length - functionKeywordIndex)
            )
            const ifContentTokens = tokens.slice(functionKeywordIndex + 2)

            const type = token === Keywords.IF_DECLARATION_KY ? 'if' : 'else'

            tree = {
                type,
                condition: lexMath(conditionTokens),
                content: lex(ifContentTokens, messenger),
            }

            const nextCommandIndex = nester(
                tokens,
                terminationKeywordIndex,
                messenger
            )

            return [tree, ...lex(tokens.slice(nextCommandIndex), messenger)]
        case Keywords.FUNCTION_TERMINATION_KY:
            return []
        case Keywords.TERMINATION_KY:
            return lex(tokens.slice(1), messenger)
    }

    return []
}

function lexMath(tokens = []) {
    const operators = operatorValues

    let maxIndex = -1
    operators.forEach(
        operator => (maxIndex = Math.max(maxIndex, tokens.indexOf(operator)))
    )

    if (maxIndex !== -1) {
        let tree = {
            type: 'operator',
            operatorType: getOperatorType(tokens[maxIndex]),
            left: lexMath(tokens.slice(0, -(tokens.length - maxIndex))),
            right: lexMath(tokens.slice(maxIndex + 1)),
        }

        return tree
    }

    const token = tokens[0]

    switch (token) {
        case Keywords.STRING_KY:
            return { type: 'string', content: tokens[1] }
        case Keywords.TRUE_KY:
        case Keywords.FALSE_KY:
            return {
                type: 'boolean',
                content: token === Keywords.TRUE_KY,
            }
        default:
            if (!Number.isNaN(Number(token)))
                return { type: 'number', content: Number(token) }

            return { type: 'variable', variableName: token }
    }
}
