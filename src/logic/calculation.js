export default class Calculation {
    constructor(expression) {
        this.expression = expression;
    }

    // calculate() {
    //     let technicallyNotEval = function(expression) {
    //         return new Function("return " + expression)()
    //     }

    //     // ignore whitespace and validate
    //     expression = this.expression.replace(" ", "")
    //     if (/^\d+(\.\d+)?+([\+\-\*\/]\d+(\.\d+)?+)*$/.test(expression)) {return undefined}

    //     return technicallyNotEval(expression)
    // }

    validate(expression){
        // ignore whitespace
        expression = expression.replaceAll(" ", "")

        // braces are balanced 
        let balance = 0
        for (let symbol of expression){
            if (balance < 0) return undefined

            if (symbol === "(")balance += 1
            else if (symbol === ")")balance -= 1
        }
        if (balance !== 0)return undefined

        // braces don't appear in incorrect contexts
        // if (!/(\d\()|| (\)\d) || (\([*+-^/]) || ([*+-^/]\))/.test(expression)) return undefined

        // ignore braces for remaining validation
        let noBraces = expression.replaceAll("(", "").replaceAll(")", "")
        if (!/^-?\d+(\.\d+)?([\+\-\*\/\^]\d+(\.\d+)?)*$/.test(noBraces)) return undefined

        return expression

    }

    toPostfix(expression){
        // operators
        let operators = {
            "(": {associativity: "right", precendence: 1},
            "-": {associativity: "left", precedence: 2},
            "*": {associativity: "left", precedence: 3},
            "+": {associativity: "left", precedence: 2},
            "/": {associativity: "left", precedence: 3},
            "^": {associativity: "right", precedence: 4}
        };

        String.prototype.isNumeric = function() {
            return !isNaN(parseFloat(this));
        }

        String.prototype.precedence = function() {
            return operators[this]["precedence"]
        }

        String.prototype.associativity = function() {
            return operators[this]["associativity"]
        }

        Array.prototype.tail = function() {
            return this[this.length - 1]
        }

        // tokenize
        let tokens = expression.split(/([\+\-\*\/\^\(\)])/).filter((x) => x.length)

        let operatorStack = []
        let operandQueue = []

        // process equation left to right
        for (let token of tokens){
            if (token.isNumeric()) {
                operandQueue.push(token)
                continue
            }

            if (token === "(") {
                operatorStack.push(token)
                continue
            }

            if (token === ")") {
                while (operatorStack.tail() !== "("){
                    operandQueue.push(operatorStack.pop())
                }
                operatorStack.pop()
                continue
            }

            // higher precedence operators go on stack
            if (!operatorStack.length
                || token.precedence() > operatorStack.tail().precedencfe()
                || token === "^"){
                operatorStack.push(token)
                continue
            }

            // pop off everything with higher precedence first
            while (operatorStack.length
                && operatorStack.tail().precedence() >= token.precedence()){
                operandQueue.push(operatorStack.pop())
            }
            operatorStack.push(token)
        }

        while (operatorStack.length) {
            operandQueue.push(operatorStack.pop())
        }

        return operandQueue
    }

    evaluatePostfix(postfix){
        let stack = []

        for (let token of postfix){
            if (token.isNumeric()){
                stack.push(token)
                continue
            }

            let right = parseFloat(stack.pop())
            let left = parseFloat(stack.pop())
            switch(token){
                case "+":
                    stack.push(left + right)
                    break
                case "-":
                    stack.push(left - right)
                    break
                case "*":
                    stack.push(left * right)
                    break
                case "/":
                    stack.push(left / right)
                    break
                case "^":
                    stack.push(left ** right)

                // no default
            }
        }

        return stack.pop()
    }

    calculate() {
        let expression = this.validate(this.expression)
        if (expression === undefined) return undefined

        let postfix = this.toPostfix(expression)
        return this.evaluatePostfix(postfix)
    }
}
