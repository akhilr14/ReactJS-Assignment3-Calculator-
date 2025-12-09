import { useState } from "react";
import Output from "./Output";

export default function Buttons() {
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const opertors = ["+", "-", "*", "/", "%", "."];
  const [out, setOutput] = useState("");
  function handleClick(e) {
    const value = e.target.value;
    setOutput(out + value);
  }

  return (
    <>
      <Output result={out} />
      {numbers.map((num) => (
        <button key={num} onClick={(e) => handleClick(e)} value={num}>
          {num}
        </button>
      ))}
      <br />
      {opertors.map((ops) => (
        <button key={ops} onClick={(e) => handleClick(e)} value={ops}>
          {ops}
        </button>
      ))}
      <br />
    </>
  );
}
