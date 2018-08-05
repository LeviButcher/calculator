function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch(operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '/':
      return divide(a,b);
    case '*':
      return multiply(a,b);
    default:
      return null;
  }
}

export function isOperator(value) {
  switch(value) {
    case '+':
    case '/':
    case '-':
    case '*':
      return true;
    default:
      return false;
  }
}

export function infexExpression(queryArray) {
  console.log(queryArray);
  if(queryArray.length === 1) {
    return queryArray[0];
  }
  let operators = ['/','*','-','+'];
  operators.forEach(operator => {
    console.log(operator);
    let index = queryArray.findIndex(element => element === operator);
    if(index >= 0) {
      let result = operate(queryArray[index], Number(queryArray[index - 1]), Number(queryArray[index + 1]));
      console.log(result);
      queryArray.splice(index - 1, 3, result);
      return;
    }
  });
  return infexExpression(queryArray);
}

export default operate;
