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

export function combineNumbersWithinQuery(queryArray) {
  let fixQuery = [];

  for(let i = 0; i < queryArray.length; i++) {
    if(!isOperator(queryArray[i])) {
      if(isOperator(fixQuery[fixQuery.length - 1]) || fixQuery.length === 0) {
        fixQuery.push(queryArray[i]);
      }
      else {
        fixQuery[fixQuery.length - 1] = fixQuery[fixQuery.length - 1] + '' + (queryArray[i]);
      }
    }
    else {
      fixQuery.push(queryArray[i]);
    }
  }
  console.log(fixQuery);
  return fixQuery;
}


export function infexExpression(queryArray) {
  if(queryArray.length === 1) {
    return queryArray[0];
  }
  let operators = ['/','*','-','+'];
  operators.forEach(operator => {
    let index = queryArray.findIndex(element => element === operator);
    if(index >= 0) {
      let result = operate(queryArray[index], Number(queryArray[index - 1]), Number(queryArray[index + 1]));
      queryArray.splice(index - 1, 3, result);
      return;
    }
  });
  return infexExpression(queryArray);
}

export default operate;
