import React, { Component } from 'react';
import '../styles/Calculator.css';
import {isOperator, infexExpression, combineNumbersWithinQuery} from '../services/operations.js';

let ButtonFaces = [
  1,2,3,4,5,6,7,8,9,0,'+','-','/','*','=','C'
];

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result:'',
      query:[],
      justPressedEqual:false
    }
    this.clickedButton = this.clickedButton.bind(this);
    this.addToCalculator = this.addToCalculator.bind(this);
  }

  clickedButton(e) {
    let buttonValue = e.target.dataset.face;
    if(buttonValue === undefined) return;
    this.addToCalculator(buttonValue);
  }

  addToCalculator(buttonValue) {
    let result = this.state.result;
    let query = this.state.query;
    let match = query.toString().match(/\/,0/);

    //Just in case check
    if(buttonValue === undefined) return;

    //Stops double adding of operators or adding operator when empty
    if(isOperator(buttonValue)) {
      if(query.length === 0 || isOperator(query[query.length - 1])) {
        alert('Operator not allowed');
        return;
      }
    }

    //Check for divide by 0 error
    if(match && match.length > 0) {
      alert("Don't try to divde by 0, bad user");
      query = query.slice(0, query.length -1);
      this.setState({query: query});
      this.setState({result: ''});
      return;
    }

    //Sets up a new query after equals has been pressed
    if(this.state.justPressedEqual) {
      //check incase = is hit again
      if(buttonValue === '=') return;

      query = new Array();
      query.push(result);
      this.setState({justPressedEqual: !this.state.justPressedEqual});
      if(!isOperator(buttonValue)) {
        result = '';
        query = [];
      }
    }

    //Calculate results of query
    if(buttonValue === '=') {
      if(query.length > 0){
        if(isOperator(query[query.length - 1])) {
          alert('infex expression is not complete, add numbers to right side');
          return;
        };
        let fixedQuery = combineNumbersWithinQuery(query);
        let calcResult = infexExpression(fixedQuery).toString();
        query.push(buttonValue);
        this.setState({result: Math.ceil(calcResult)});
        this.setState({query: query});
        this.setState({justPressedEqual: !this.state.justPressedEqual});
      }
    }
    else if(buttonValue === 'C') {
      this.setState({result: ''});
      this.setState({query: []});
    }
    else {
      query.push(buttonValue);
      if(!isOperator(buttonValue)){
        this.setState({result: result.concat(buttonValue)})
      }
      else {
        this.setState({result: ''});
      }
      this.setState({query: query});
    }
  }


  render(){
    let info = this.state.query.length > 0 ? this.state.query : 'waiting for input...';
    return (
    <div className='calculator'>
      <Screen display={this.state.result} info={info}/>
      {ButtonFaces.map(face => <Button key={face} face={face} clickHandler={this.clickedButton}/>)}
    </div>
  );
  }
}

class Screen extends Component {
  render(){
    return (
      <div className='screen'>
        <div className="queryScreen">
          <span>{this.props.info}</span>
        </div>
        <div className="displayScreen">
          <span>{this.props.display}</span>
        </div>
      </div>
    )
  }
}

let Button = (props) => {
  let title = '';
  switch(props.face) {
    case 'C':
      title = 'Clear';
      break;
    case '=':
      title = 'Equal';
      break;
  }

  return(
    <div onClick={props.clickHandler} data-face={props.face} title={title}>
      {props.face}
    </div>
);
}

export default Calculator;
