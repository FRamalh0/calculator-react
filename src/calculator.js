import React from 'react';
import './calculator.css';
import icons from './icons';

class Calculator extends React.Component {

    symbols = ['+', '-', 'x', '/'];
    buttons = [];

    constructor(props) {
        super(props);
        this.state = {
            calc: [''],
            currentCalc: '',
            total: '',
            currentNumber: '',
            darkmode: true
        }

        this.inputFunction = this.inputFunction.bind(this);
    }

    //INPUT SYSTEM (NOT FINISHED!!)
    inputFunction(event){

        switch(event.keyCode){
            case 190: //KEY '.'
                this.changeCurrentNumber('.');
                break;
            case 48: //KEY 0
                this.changeCurrentNumber(0);
                break;
            case 49: //KEY 1
                this.changeCurrentNumber(1);
                break;
            case 50: //KEY 2
                this.changeCurrentNumber(2);
                break;
            case 51: //KEY 3
                this.changeCurrentNumber(3);
                break;
            case 52: //KEY 4
                this.changeCurrentNumber(4);
                break;
            case 53: //KEY 5 AND %
                this.changeCurrentNumber(5);
                break;
            case 54: //KEY 6
                this.changeCurrentNumber(6);
                break;
            case 55: //KEY 7
                this.changeCurrentNumber(7);
                break;
            case 56: //KEY 8
                this.changeCurrentNumber(8);
                break;
            case 57: //KEY 9
                this.changeCurrentNumber(9);
                break;

            case 8: //KEY 'backspace'
                this.deleteLastInput();
                break;
            
            default:
                break;

        }
            
      }

    componentDidMount(){
        document.addEventListener("keydown", this.inputFunction, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.inputFunction, false);
    }

    //CHANGES OR ADD A SYMBOL
    changeSymbol = (symbol) => {

        //EXISTS AT LEAST A DIGIT
        if(this.state.calc.length > 0 && this.state.calc[0] !== ''){

            //UPDATES THE STATE, WHEN ITS DONE CALL UPDATETOTAL METHOD
            //WHEN LAST INPUT WAS A SYMBOL
            if(this.symbols.includes(this.state.calc[this.state.calc.length-2]) && this.state.calc[this.state.calc.length-1] === '') {
                let output = this.state.calc;
                output[output.length-2] = symbol;
                this.setState(
                    {
                        calc: output,
                        currentNumber: ''
                    }, 
                    this.updateTotal
                );
            } else {
                let output = this.state.calc;
                output.push(symbol);
                output.push('');
                this.setState(
                    {
                        calc: output,
                        currentNumber: ''
                    }, 
                    this.updateTotal
                );
            }


        }
        
    
    }

    //CHANGE OR ADD A NUMBER (OR A DOT) TO THE CURRENT NUMBER
    changeCurrentNumber = (value) => {

        let output = this.state.calc;

        if(value === '.' && this.state.currentNumber === '0'){
            
            output[output.length-1] = this.state.currentNumber + value.toString();

            this.setState(
                {
                    calc: output,
                    currentNumber: this.state.currentNumber + value.toString()
                }, 
                this.updateTotal
            );

        } else if(this.state.currentNumber === '' || this.state.currentNumber === '0') {

            if(value === '.'){
                return;
            }

            output[output.length-1] = value.toString();

            this.setState(
                {
                    calc: output,
                    currentNumber: value.toString()
                }, 
                this.updateTotal
            );
        } else if (this.state.currentNumber.length > 14) {
            //DO NOTHING
        } else {

            if(value === '.' && this.state.currentNumber.includes('.')){
                return;
            }

            output[output.length-1] = this.state.currentNumber + value.toString();

            this.setState(
                {
                    calc: output,
                    currentNumber: this.state.currentNumber + value.toString()
                }, 
                this.updateTotal
            );
        }


    }

    //APLLIES THE PERCENTAGE IN THE CURRENT NUMBER
    applyPercentage() {
        let output = this.state.calc;
        output[output.length-1] = output[output.length-1] * 0.01;
        this.setState(
            {
                calc: output,
                currentNumber: output[output.length-1]
            }, 
            this.updateTotal
        );
    }

    //DELETES THE LAST INPUT MADE BY THE USER
    deleteLastInput() {

        if(this.state.calc.length > 0 && this.state.calc[0] !== '') {
            let output = this.state.calc;
            let lastNumber = '';
            
            if(output[output.length-1] === '') {

                output.splice(output.length-2, 2);
                lastNumber = output[output.length-1];

            } else {

                output[output.length-1] = output[output.length-1].substring(0, output[output.length-1].length-1);
                lastNumber = output[output.length-1];
                
                if(output.length <= 1 && output[0] === '') {
                    this.deleteEverything();
                    return;
                }

            }
            
            this.setState(
                {
                    calc: output,
                    currentNumber: lastNumber
                }, 
                this.updateTotal
            );
        }
        
    }

    //DELETES EVERYTHING (CLEAR THE CALCULATOR)
    deleteEverything() {
        this.setState(
            {
                calc: [''],
                currentCalc: '',
                total: '',
                currentNumber: ''
            }
        );
    }

    //CALCULATES THE CURRENT TOTAL OF THE CALCULATION
    updateTotal() {

        let lastSymbol = '';
        let total = 0.0;
        let calcAux = this.state.calc;

        //DO X AND / FIRST
        for(let i = 0; i < calcAux.length; ++i) {

            if(i + 1 < calcAux.length && calcAux[i+1] !== '')
                if(calcAux[i] === 'x') {
                    let output = calcAux.slice(0,i-1);
                    output.push(calcAux[i-1] * calcAux[i+1]);
                    calcAux = [...output, ...calcAux.slice(i+2)];
                    i = -1;
                } else if(calcAux[i] === '/') {
                    let output = calcAux.slice(0,i-1);
                    output.push(calcAux[i-1] / calcAux[i+1]);
                    calcAux = [...output, ...calcAux.slice(i+2)];
                    i = -1;
                }
        }

        for(const c of calcAux) {

            if(this.symbols.includes(c)) {
                lastSymbol = c;
            } else if(c !== '') {
                switch(lastSymbol) {
                    case '':
                        total = parseFloat(c);
                        break;
                    case '+':
                        total = total + parseFloat(c);
                        break;
                    case '-':
                        total = total - parseFloat(c);
                        break;
                    default:
                        //DO NOTHING
                        break;

                }
            } else {
                //DO NOTHING
            }

        }

        if(total % 1 === 0) {
            this.setState({
                currentCalc: this.state.calc.join(' '),
                total: '= ' + total.toPrecision(7).replace(/\.0+$/,"")
            });
        } else {
            this.setState({
                currentCalc: this.state.calc.join(' '),
                total: '= ' + total.toPrecision(7).replace(/\.([^0]+)0+$/,".$1")
            });
        }

    }

    //CHANGE BETWEEN  DARK AND LIGHT MODE
    turnDarkMode() {
        this.setState(
            {
                darkmode: !this.state.darkmode
            }, 
            this.setBody
        );
    }

    //CHANGE DARK/LIGHT MODE ON BODY
    setBody() {
        document.body.className = this.state.darkmode ? 'dark' : 'light'
    }

    render() {
        return (
        <div className={this.state.darkmode ? 'calculator dark' : 'calculator light'}>

            <p>{this.state.currentCalc}</p>
            <h3 className={this.state.darkmode ? 'dark' : 'light'}>{this.state.total}</h3>
            
            <div className={this.darkmode ? 'inputs dark' : 'inputs light'}>

                <button id="deleteButton" onClick={() => this.deleteEverything()}>C</button>
                <button className="nonDigits" aria-label="Backspace" onClick={() => this.deleteLastInput()}><icons.BackSpace /></button>
                <button className="nonDigits" onClick={() => this.applyPercentage()}>{'%'}</button>
                <button className="nonDigits" onClick={() => this.changeSymbol('/')}>{'/'}</button>
                <br></br>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(7)}>{7}</button>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(8)}>{8}</button>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(9)}>{9}</button>
                <button className="nonDigits" onClick={() => this.changeSymbol('x')}>{'x'}</button>
                <br></br>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(4)}>{4}</button>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(5)}>{5}</button>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(6)}>{6}</button>
                <button className="nonDigits" onClick={() => this.changeSymbol('-')}>{'-'}</button>
                <br></br>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(1)}>{1}</button>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(2)}>{2}</button>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(3)}>{3}</button>
                <button className="nonDigits" onClick={() => this.changeSymbol('+')}>{'+'}</button>
                <br></br>
                <button 
                    aria-label="Dark Mode"
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.turnDarkMode()}>
                        <icons.Moon />
                    </button>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber(0)}>{0}</button>
                <button 
                    className={this.state.darkmode ? 'dark' : 'light'}
                    onClick={() => this.changeCurrentNumber('.')}>{'.'}</button>
                <button id="equalsButton">{'='}</button>
                <br></br>

            </div>


        </div>
    )
    }
    

};

export default Calculator;