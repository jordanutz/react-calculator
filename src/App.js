import React, { useState } from "react";
import "./App.scss";

const App = () => {
   const [previousValue, setPreviousValue] = useState(0);
   const [total, setTotal] = useState(0);
   const [expression, setExpression] = useState("");
   const [evaluated, setEvaluated] = useState(false);
   const [disabled, setDisabled] = useState(false);
   const [operationSelected, setOperationSelected] = useState(false);
   let [userInput, setUserInput] = useState("");

   const appendPrevious = (e) => {
      setUserInput((userInput += e.target.value));
      setOperationSelected(false);

      if (userInput.length === 11) {
         setDisabled(true);
      }
   };

   const handleOperation = (e) => {
      let previous = userInput.slice();
      setOperationSelected(true);

      if (previousValue && !evaluated) {
         let updatedTotal = eval(`${expression} ${userInput}`);

         setPreviousValue(previous);
         setExpression(`${updatedTotal} ${e.target.value}`);
         setTotal(updatedTotal);
         setUserInput("");
         return;
      }

      if (previousValue && evaluated) {
         setExpression(`${total} ${e.target.value}`);
         setEvaluated(false);
         setDisabled(false);
         return;
      }

      let currentExpression = `${previous} ${e.target.value}`;

      setExpression(currentExpression);
      setPreviousValue(previous);
      setUserInput("");
      return;
   };

   const clearTotal = () => {
      setTotal(0);
      setUserInput("");
      setPreviousValue(0);
      setExpression("");
      setEvaluated(false);
      setDisabled(false);
   };

   const calculateTotal = () => {
      let previous = userInput.slice();
      let calculatedTotal = eval(`${expression} ${previous}`);

      setTotal(calculatedTotal);
      setPreviousValue(calculatedTotal);
      setExpression("");
      setEvaluated(true);
      setDisabled(true);
      setUserInput("");
      setOperationSelected(false);
   };

   const reverseSign = () => {
      let userInputValue = parseInt(userInput);

      if (evaluated) {
         if (Math.sign(total) === 1) {
            setTotal(parseInt(`-${total}`));
            return;
         }

         let totalValue = total.toString();
         totalValue = totalValue.slice(1, totalValue.length);

         setTotal(parseInt(totalValue));
         return;
      }

      if (Math.sign(userInputValue) === 1) {
         setUserInput(`-${userInputValue}`);
         return;
      }

      userInputValue = userInputValue
         .toString()
         .slice(1, userInputValue.length);
      setUserInput(userInputValue);
   };

   const convertDec = () => {
      if (evaluated) {
         setTotal(total / 100);
         return;
      }

      let userInputValue = userInput.slice();

      userInputValue = parseInt(userInput) / 100;
      setUserInput(`${userInputValue}`);
   };

   const formatVal = (val) => {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   };

   return (
      <div className="calculator">
         <div className="calculator__container">
            <div className="calculator__output">
               <span className="calculator__input">{expression}</span>
               <span className="calculator__total">
                  {expression || userInput
                     ? !userInput
                        ? 0
                        : formatVal(userInput)
                     : formatVal(total)}
               </span>
            </div>
            <div className="calculator__options">
               <button
                  className="calculator__option calculator__option--operation"
                  onClick={clearTotal}
               >
                  C
               </button>
               <button
                  className="calculator__option calculator__option--operation"
                  onClick={reverseSign}
               >
                  ±
               </button>
               <button
                  className="calculator__option calculator__option--operation"
                  onClick={convertDec}
               >
                  %
               </button>
               <button
                  className="calculator__option calculator__option--operation"
                  value="/"
                  onClick={(e) => handleOperation(e)}
                  disabled={operationSelected}
               >
                  ÷
               </button>
               <button
                  className="calculator__option"
                  value="7"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  7
               </button>
               <button
                  className="calculator__option"
                  value="8"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  8
               </button>
               <button
                  className="calculator__option"
                  value="9"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  9
               </button>
               <button
                  className="calculator__option calculator__option--operation"
                  value="*"
                  onClick={(e) => handleOperation(e)}
                  disabled={operationSelected}
               >
                  ×
               </button>
               <button
                  className="calculator__option"
                  value="4"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  4
               </button>
               <button
                  className="calculator__option"
                  value="5"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  5
               </button>
               <button
                  className="calculator__option"
                  value="6"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  6
               </button>
               <button
                  className="calculator__option calculator__option--operation"
                  value="-"
                  onClick={(e) => handleOperation(e)}
                  disabled={operationSelected}
               >
                  -
               </button>
               <button
                  className="calculator__option"
                  value="1"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  1
               </button>
               <button
                  className="calculator__option"
                  value="2"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  2
               </button>
               <button
                  className="calculator__option"
                  value="3"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  3
               </button>
               <button
                  className="calculator__option calculator__option--operation"
                  value="+"
                  onClick={(e) => handleOperation(e)}
                  disabled={operationSelected}
               >
                  +
               </button>
               <button
                  className="calculator__option"
                  value="0"
                  onClick={(e) => appendPrevious(e)}
                  disabled={disabled}
               >
                  0
               </button>
               <button
                  className="calculator__option"
                  value="."
                  onClick={(e) => appendPrevious(e)}
                  disabled={userInput.indexOf(".") !== -1 || disabled}
               >
                  .
               </button>
               <div></div>
               <button
                  className="calculator__option calculator__option--operation"
                  onClick={calculateTotal}
                  disabled={!userInput}
               >
                  =
               </button>
            </div>
         </div>
      </div>
   );
};

export default App;
