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

    calculate() {
        // recursively reduce over list of operators
        let calc = function(expression, operators){
            if (!operators.length) {return Number(expression)}

            let [[operator, reducer], ...rest] = operators
            let [initialValue, ...expressions] = expression.split(operator).map(x => calc(x, rest))
            
            return expressions.reduce(reducer, initialValue)
        }

        // ignore whitespace and validate
        let expression = this.expression.replaceAll(" ", "")
        if (!/^-?\d+(\.\d+)?([\+\-\*\/]\d+(\.\d+)?)*$/.test(expression)) {return undefined}

        // used operators in order of reverse precedence
        let operators = [
            ["+", (x, y) => x+y],
            ["-", (x, y) => x-y],
            ["*", (x, y) => x*y],
            ["/", (x, y) => x/y]
        ].filter(op => expression.indexOf(op[0]) > -1)

        return calc(expression, operators);
    }
}
