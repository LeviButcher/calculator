import React, { Component } from 'react';
import '../styles/Calculator.css';
import {isOperator, infexExpression} from '../services/operations.js';

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
    let buttonValue = e.target.dataset.face
    console.log(buttonValue);
    this.addToCalculator(buttonValue);
  }

  setErrorMessage(message) {

  }

  addToCalculator(buttonValue) {
    let result = this.state.result;
    let query = this.state.query;
    let match = query.toString().match(/\/,0/);

    //Check for divide by 0 error
    if(match && match.length > 0) {
      alert("Don't try to divde by 0, bad");
      query = query.slice(0, query.length -1);
      this.setState({query: query});
      this.setState({result: ''});
      return;
    }

    if(this.state.justPressedEqual) {
      query = new Array(result);
      this.setState({justPressedEqual: !this.state.justPressedEqual});
      if(!isOperator(buttonValue)) {
        result = '';
        query = [];
      }
    }

    if(buttonValue === '=') {
      if(query.length > 0){
        console.log('herre');
        let calcResult = infexExpression(query).toString();
        query.push(buttonValue);
        this.setState({result: calcResult});
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
    return (
    <div className='calculator'>
      <Screen display={this.state.result} info={this.state.query}/>
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
  return <div onClick={props.clickHandler} data-face={props.face}>
    {props.face}
  </div>
}

export default Calculator;
