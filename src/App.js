import { useState } from "react";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  };

  return (
    <>
      <div className="App">
        <div className="calculator">
          <div id="display" >
            <div id="answer" className="outPutScreen">{answer}</div>
            <div id="expression" className="outPutScreen">{expression}</div>
          </div>
          <div className="buttons">
          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="light-gray"
          >
            C
          </button>
          <button
            id="divide"
            onClick={() => buttonPress("/")}>
            /
          </button>
          <button
            id="seven"
            onClick={() => buttonPress("7")}>
            7
          </button>
          <button
            id="eight"
            onClick={() => buttonPress("8")}>
            8
          </button>
          <button
            id="nine"
            onClick={() => buttonPress("9")}>
            9
          </button>
          <button
            id="multiply"
            onClick={() => buttonPress("*")}>
            *
          </button>
          <button
            id="four"
            onClick={() => buttonPress("4")}>
            4
          </button>
          <button
            id="five"
            onClick={() => buttonPress("5")}>
            5
          </button>
          <button
            id="six"
            onClick={() => buttonPress("6")}>
            6
          </button>
          <button
            id="subtract"
            onClick={() => buttonPress("-")}>
            -
          </button>
          <button
            id="one"
            onClick={() => buttonPress("1")}>
            1
          </button>
          <button
            id="two"
            onClick={() => buttonPress("2")}>
            2
          </button>
          <button
            id="three"
            onClick={() => buttonPress("3")}>
            3
          </button>
          <button id="add" onClick={() => buttonPress("+")} className="yellow">
            +
          </button>
          <button
            id="zero"
            onClick={() => buttonPress("0")}>
            0
          </button>
          <button
            id="decimal"
            onClick={() => buttonPress(".")}>
            .
          </button>
          <button
            id="equals"
            onClick={() => buttonPress("=")}>
            =
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;