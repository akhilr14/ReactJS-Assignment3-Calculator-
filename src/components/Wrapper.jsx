import { useState } from "react";
import Output from "./Output";

export default function Wrapper() {
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, "+/-", 0, "."];
  const operator = ["/", "x", "+", "-", "="];

  const [calc, setCalc] = useState({
    sign: "",
    num: "",
    res: "",
  });

  const numClickHandler = (e) => {
    const value = e.target.innerHTML;

    if (calc.res && !calc.sign) {
      setCalc({
        sign: "",
        num: value,
        res: "",
      });
    } else if (calc.sign && !calc.num) {
      setCalc({
        ...calc,
        num: value,
      });
    } else {
      setCalc({
        ...calc,
        num: calc.num + value,
      });
    }
  };

  const commaClickHandler = () => {
    if (!calc.num.includes(".")) {
      setCalc({
        ...calc,
        num: calc.num ? calc.num + "." : "0.",
      });
    }
  };

  const signClickHandler = (e) => {
    const value = e.target.innerHTML;
    if (!calc.num && !calc.res) return;

    if (!calc.res && calc.num) {
      setCalc({
        ...calc,
        sign: value,
        res: calc.num,
        num: "",
      });
    } else {
      setCalc({
        ...calc,
        sign: value,
        num: "",
      });
    }
  };

  const equalsClickHandler = () => {
    if (!calc.sign || !calc.num) return;

    const a = parseFloat(calc.res);
    const b = parseFloat(calc.num);

    const math = (a, b, op) =>
      op === "+" ? a + b : op === "-" ? a - b : op === "x" ? a * b : a / b;

    setCalc({
      sign: "",
      num: "",
      res:
        calc.sign === "/" && calc.num === "0"
          ? "Cannot divide by 0"
          : math(a, b, calc.sign).toString(),
    });
  };

  const invertClickHandler = () => {
    if (calc.num) {
      setCalc({
        ...calc,
        num: (parseFloat(calc.num) * -1).toString(),
      });
    } else if (calc.res) {
      setCalc({
        ...calc,
        res: (parseFloat(calc.res) * -1).toString(),
      });
    }
  };

  const percentClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? (parseFloat(calc.num) / 100).toString() : "",
      res: calc.res ? (parseFloat(calc.res) / 100).toString() : "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      sign: "",
      num: "",
      res: "",
    });
  };

  const bkspClickHandler = () => {
    if (calc.num) {
      const newNum = calc.num.slice(0, -1);
      setCalc({
        ...calc,
        num: newNum === "" ? "0" : newNum,
      });
    }
  };

  return (
    <>
      <Output result={calc.num || calc.res || "0"} />
      <div className="Buttons-container">
        <div className="Left-Grid">
          <button className="Buttons" onClick={resetClickHandler}>
            AC
          </button>
          <button className="Buttons" onClick={bkspClickHandler}>
            &larr;
          </button>
          <button className="Buttons" onClick={percentClickHandler}>
            %
          </button>

          {numbers.map((num) => (
            <button
              key={num}
              className="NumButtons"
              onClick={
                num === "+/-"
                  ? invertClickHandler
                  : num === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            >
              {num}
            </button>
          ))}
        </div>

        <div className="Right-Grid">
          {operator.map((ops) => (
            <button
              key={ops}
              className="OpsButtons"
              onClick={ops === "=" ? equalsClickHandler : signClickHandler}
            >
              {ops}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
