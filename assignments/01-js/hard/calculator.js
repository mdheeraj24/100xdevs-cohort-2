/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

        10 * 3 + 2 / 4 / 7

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
    this.operations = new Set(['+', '-', '/', '*', '(', ')']);
  }
  add(num) {
    this.result += num;
  }
  subtract(num) {
    this.result -= num;
  }
  multiply(num) {
    this.result *= num;
  }
  divide(num) {
    if (num == 0) throw new Error("Zero divisibility not allowed");
    this.result = this.result / num;
  }
  clear() {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }

  _tokenize(exp) {
    let tokens = [];
    let ten = 1;
    let curr = 0;
    let decimal_placevalue = 1;
    let open_brackets = 0;
    for (let i = 0; i < exp.length; i++) {
      if (open_brackets < 0) throw new Error("Wrong  bracketing");
      if (exp[i] == ' ') continue;
      if (!isNaN(exp[i])) {
        if (decimal_placevalue >= 1) {
          curr = curr * ten + Number(exp[i]);
          ten = 10 * ten;
        } else {
          curr = curr + Number(exp[i]) * decimal_placevalue;
          decimal_placevalue = decimal_placevalue / 10;
        }
      } else if (exp[i] == '.') {
        decimal_placevalue = 0.1;
      } else if (this.operations.has(exp[i])) {
        if (exp[i] == '(') open_brackets++;
        if (exp[i] == ')') open_brackets--;
        ten = 1;
        decimal_placevalue = 1;
        if (curr != 0) {
          tokens.push(curr);
        }
        tokens.push(exp[i]);
        curr = 0;
      } else {
        throw new Error(`Invalid character`);
      }
    }
    if (exp[exp.length - 1] != ')')
      tokens.push(curr);
    if (open_brackets != 0) throw new Error("Wrong brackets");
    return tokens;
  }

  _eval_op(val1, val2, op) {
    if (val2 == 0 && op == '/') throw new Error("Div by zero not allowed");
    if (op == '+') return val1 + val2;
    if (op == '-') return val1 - val2;
    if (op == '/') return val1 / val2;
    if (op == '*') return val1 * val2;
    throw new Error("Unsupported operation");
  }

  _eval(tokens) {
  
    if (tokens.length == 0) return 0;
    if (tokens.length == 1) return tokens[0];
    let value_stack = [];
    let op_stack = [];
    value_stack.push(tokens[0]);
    value_stack.push(tokens[2]);
    op_stack.push(tokens[1]);
    for (let i = 3; i < tokens.length; i++) {
      let curr_token = tokens[i];
      if (curr_token == '+' || curr_token == '-') {
        let val2 = value_stack.pop();
        let val1 = value_stack.pop();
        let val = this._eval_op(val1, val2, op_stack.pop());
        value_stack.push(val);
        op_stack.push(curr_token);
      } else if (curr_token == '/' || curr_token == '*') {
        op_stack.push(curr_token);
      } else {
        value_stack.push(curr_token);
      }
    }
    
    while (op_stack.length > 0) {
      let val2 = value_stack.pop();
      let val1 = value_stack.pop();
      let op = op_stack.pop();
      let val = this._eval_op(val1, val2, op);
      value_stack.push(val);
    }
    
    let result = value_stack.pop();
    return result;
  }

  calculate(exp) {
    let tokens = this._tokenize(exp);
    let expression_stack = [];
    let curr_exp = [];
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (token == '(') {
        expression_stack.push(curr_exp.slice());
        curr_exp = [];
      } else if (token == ')') {
        let curr_res = this._eval(curr_exp);
        curr_exp = expression_stack.pop();
        curr_exp.push(curr_res);
      } else {
        curr_exp.push(token);
      }
    }
    this.result =  this._eval(curr_exp);
  }
}


module.exports = Calculator;
