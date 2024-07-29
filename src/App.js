import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [lines, setLines] = useState([[10, 5], [8], [7], [8], [30]]);
  const [inputValue, setInputValue] = useState();

  const handleValueAddition = (e) => {
    e.preventDefault();
    let leastSumLine;
    let totalLineSum = 1e9;
    for (let line of lines) {
      const sumOfLine = line.reduce((sum, curr) => {
        return sum + curr;
      }, 0);
      if (sumOfLine < totalLineSum) {
        leastSumLine = line;
        totalLineSum = sumOfLine;
      }
    }
    console.log(leastSumLine);

    // leastSumLine.push(Number(inputValue));
    if (!leastSumLine) return;

    setLines((prevLines) =>
      prevLines.map((line) =>
        line === leastSumLine ? [...line, Number(inputValue)] : line
      )
    );

    setInputValue("");
  };

  // TODO: Simulate the decrement task
  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) => {
        return prevLines.map((line) => {
          return [line[0] - 1, line.slice(1)].filter((ele) => ele > 0);
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <form onSubmit={handleValueAddition}>
        <input
          type="number"
          value={inputValue}
          placeholder="Enter value"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>Checkout</button>
      </form>

      <div className="lines">
        {lines.map((line, idx) => (
          <div className="line" key={idx}>
            {line.map((ele) => (
              <div>{ele}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
