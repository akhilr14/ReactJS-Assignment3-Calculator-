import { useState } from "react";
import Output from "./Output";

export default function Wrapper() {
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, "+/-", 0, "."];
  const operator = ["/", "*", "+", "-", "="];
  const [out, setOutput] = useState("");

  function operation(expression) {
    let ans;
    let proexp = expression.replaceAll("%", "/100*");
    try {
      ans = eval(proexp).toString();
    } catch {
      ans = "Invalid Expression";
    }
    return ans;
  }

  function minus(inp) {
    if (inp[0] == "-") {
      inp = inp.slice(1);
    } else {
      inp = "-" + inp;
    }
    return inp;
  }

  function handleClick(e) {
    const value = e.target.value;
    if (
      out == "Invalid Expression" ||
      out == "Infinity" ||
      (out.charAt(0) == 0 && value != "." && out.charAt(1) != ".")
    ) {
      setOutput(value);
    } else if (value == "bksp") {
      setOutput(out.slice(0, -1));
    } else if (value == "=") {
      setOutput(operation(out));
    } else if (value == "+/-") {
      setOutput(minus(out));
    } else {
      setOutput(out + value);
    }
  }

  function handleClickAC() {
    setOutput("");
  }

  return (
    <>
      <Output result={out} />
      <div className="Buttons-container">
        <div className="Left-Grid">
          <button
            className="Buttons"
            key="AC"
            onClick={(e) => handleClickAC(e)}
            value="AC"
          >
            AC
          </button>
          <button
            className="Buttons"
            key="bksp"
            onClick={(e) => handleClick(e)}
            value="bksp"
          >
            bksp
          </button>
          <button
            className="Buttons"
            key="%"
            onClick={(e) => handleClick(e)}
            value="%"
          >
            %
          </button>
          {numbers.map((num) => (
            <button
              className="NumButtons"
              key={num}
              onClick={(e) => handleClick(e)}
              value={num}
            >
              {num}
            </button>
          ))}
        </div>
        <div className="Right-Grid">
          {operator.map((ops) => (
            <button
              className="OpsButtons"
              key={ops}
              onClick={(e) => handleClick(e)}
              value={ops}
            >
              {ops}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
