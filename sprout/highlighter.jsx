import React, { Fragment } from 'react'
import Keywords from './keywords'
import KeywordsWithSpaces from './keywordsWithSpaces'
import tokenize from './tokenize'

function isNumber(text) {
    return !Number.isNaN(Number(text))
}

export default function highlighter(rawCode) {
    let code = rawCode
    let tokens = []

    while (code.length !== 0) {
        let done = false
        let sliceBias = 0

        // handles line breaks
        if (!done && code.startsWith('\n')) {
            tokens.push(<br />)
            sliceBias = 1
            done = true
        }

        // handles spaces before number handler handles it
        if (!done && code.startsWith(' ')) {
            tokens.push(<span>&nbsp;</span>)
            sliceBias = 1
            done = true
        }

        // highlights special keywords
        if (!done) {
            const specials = [
                Keywords.DECLARATION_KY,
                Keywords.ASSIGNMENT_KY,
                Keywords.FUNCTION_KY,
                Keywords.FUNCTION_CALL_KY,
                Keywords.FUNCTION_ARGUMENT_KY,
                Keywords.FUNCTION_ARGUMENT_RENAME_KY,
                Keywords.FUNCTION_TERMINATION_KY,
                Keywords.IF_DECLARATION_KY,
                Keywords.ELSE_DECLARATION_KY,
                Keywords.PRINT_KY,
                Keywords.TRUE_KY,
                Keywords.FALSE_KY,
                KeywordsWithSpaces.DECLARATION_KY,
                KeywordsWithSpaces.ASSIGNMENT_KY,
                KeywordsWithSpaces.FUNCTION_KY,
                KeywordsWithSpaces.FUNCTION_CALL_KY,
                KeywordsWithSpaces.FUNCTION_ARGUMENT_KY,
                KeywordsWithSpaces.FUNCTION_ARGUMENT_RENAME_KY,
                KeywordsWithSpaces.FUNCTION_TERMINATION_KY,
                KeywordsWithSpaces.IF_DECLARATION_KY,
                KeywordsWithSpaces.ELSE_DECLARATION_KY,
                KeywordsWithSpaces.PRINT_KY,
                KeywordsWithSpaces.TRUE_KY,
                KeywordsWithSpaces.FALSE_KY,
            ]

            specials.forEach(special => {
                if (!done && code.startsWith(special)) {
                    tokens.push(
                        <font style={{ fontWeight: 'bold' }}>{special}</font>
                    )

                    sliceBias = special.length
                    done = true
                }
            })
        }

        // highlights operators
        if (!done) {
            const operators = [
                Keywords.AND_OPERATOR,
                Keywords.OR_OPERATOR,
                Keywords.EQUAL_OPERATOR,
                Keywords.LESS_THAN_OPERATOR,
                Keywords.LESS_THAN_EQUAL_OPERATOR,
                Keywords.GREATER_THAN_OPERATOR,
                Keywords.GREATER_THAN_EQUAL_OPERATOR,
                Keywords.ADDITION_OPERATOR,
                Keywords.SUBTRACTION_OPERATOR,
                Keywords.MULTIPLICATION_OPERATOR,
                Keywords.DIVISION_OPERATOR,
                KeywordsWithSpaces.AND_OPERATOR,
                KeywordsWithSpaces.OR_OPERATOR,
                KeywordsWithSpaces.EQUAL_OPERATOR,
                KeywordsWithSpaces.LESS_THAN_OPERATOR,
                KeywordsWithSpaces.LESS_THAN_EQUAL_OPERATOR,
                KeywordsWithSpaces.GREATER_THAN_OPERATOR,
                KeywordsWithSpaces.GREATER_THAN_EQUAL_OPERATOR,
                KeywordsWithSpaces.ADDITION_OPERATOR,
                KeywordsWithSpaces.SUBTRACTION_OPERATOR,
                KeywordsWithSpaces.MULTIPLICATION_OPERATOR,
                KeywordsWithSpaces.DIVISION_OPERATOR,
            ]

            operators.forEach(operator => {
                if (!done && code.startsWith(operator)) {
                    tokens.push(
                        <font style={{ fontWeight: 'bold' }}>{operator}</font>
                    )

                    sliceBias = operator.length
                    done = true
                }
            })
        }

        // highlights strings
        if (!done && code.startsWith(Keywords.STRING_KY)) {
            const otherStringKeywordIndex = code
                .slice(Keywords.STRING_KY.length)
                .indexOf(Keywords.STRING_KY)
            let tokenValue = ''

            console.log(otherStringKeywordIndex)

            if (otherStringKeywordIndex !== -1) {
                sliceBias =
                    otherStringKeywordIndex + Keywords.STRING_KY.length + 1

                tokenValue = code.substring(0, sliceBias)
            } else {
                tokenValue = code
                sliceBias = code.length
            }

            tokens.push(
                <font style={{ color: 'cornflowerblue' }}>{tokenValue}</font>
            )
            done = true
        }

        // highlights numbers
        if (!done && isNumber(code.charAt(0))) {
            tokens.push(
                <font style={{ color: 'violet' }}>{code.charAt(0)}</font>
            )
            sliceBias = 1
            done = true
        }

        // highlights termination keyword
        if (!done && code.startsWith(Keywords.TERMINATION_KY)) {
            tokens.push(
                <font style={{ color: 'red' }}>{Keywords.TERMINATION_KY}</font>
            )
            sliceBias += Keywords.TERMINATION_KY.length
            done = true
        }

        // handles rest
        if (!done) {
            tokens.push(code.charAt(0))
            sliceBias = 1
            done = true
        }

        code = code.slice(sliceBias)
    }

    tokens = tokens.map((token, i) => <Fragment key={i}>{token}</Fragment>)

    return tokens
}
