class Program {
    constructor(tree, messenger) {
        this.vars = {}
        this.functions = {}
        this.lastIfCondition = false
        this.messenger = messenger

        this.parse(tree)
    }

    parse(tree) {
        tree.forEach(command => {
            switch (command.type) {
                case 'declaration':
                    if (command.varType === 'var')
                        this.vars[command.varName] = this.parseMath(
                            command.content
                        )

                    if (command.varType === 'function')
                        this.functions[command.varName] = command.content
                    break
                case 'print':
                    this.messenger(this.parseMath(command.content))
                    break
                case 'if':
                    if (this.parseMath(command.condition)) {
                        this.lastIfCondition = true
                        this.parse(command.content)
                        break
                    }

                    this.lastIfCondition = false

                    break
                case 'else':
                    if (
                        !this.lastIfCondition &&
                        this.parseMath(command.condition)
                    ) {
                        this.parse(command.content)
                        this.lastIfCondition = true
                    }

                    break
                case 'call':
                    if (tree.arguments) {
                        tree.arguments.forEach(
                            argument =>
                                (this.vars[argument.name] = parseMath(
                                    argument.value
                                ))
                        )
                    }

                    this.parse(this.functions[command.functionName])

                    if (tree.argumens) {
                        tree.arguments.forEach(
                            argument => delete this.vars[argument.name]
                        )
                    }
                    break
            }
        })
    }

    parseMath(tree) {
        switch (tree.type) {
            case 'string':
                return String(tree.content)
            case 'number':
                return Number(tree.content)
            case 'boolean':
                return Boolean(tree.content)
            case 'variable':
                return this.vars[tree.variableName]
            case 'operator':
                const left = this.parseMath(tree.left)
                const right = this.parseMath(tree.right)

                switch (tree.operatorType) {
                    case 'and':
                        return left && right
                    case 'or':
                        return left || right
                    case 'add':
                        return left + right
                    case 'subtract':
                        return left - right
                    case 'multiply':
                        return left * right
                    case 'divide':
                        return left / right
                    case 'equal':
                        return left === right
                    case 'lessthan':
                        return left < right
                    case 'lessthanequal':
                        return left <= right
                    case 'greaterthan':
                        return left > right
                    case 'greaterthanequal':
                        return left >= right
                }
        }
    }
}

export default function parse(tree, messenger) {
    try {
        new Program(tree, messenger)
    } catch (err) {
        messenger(err)
    }
}
