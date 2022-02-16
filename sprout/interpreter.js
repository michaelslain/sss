import format from './format.js'
import tokenize from './tokenize.js'
import lex from './lex.js'
import parse from './parse.js'

export default (rawCode, messenger) => {
    parse(lex(tokenize(format(rawCode)), messenger), messenger)
    messenger('Done.')
}
