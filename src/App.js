import React, { useState } from "react";

const url = "https://api.jobtread.com/healthz";

let arr = [];
let i = 1;

let box = {
  backgroundColor: "grey",
  width: 50,
  margin: 10
};

let container = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end"
};
export default function App() {
  const [timeArray, setTimeArray] = useState([]);

  function getFetchTime() {
    let tempTime = [...timeArray];
    let start = Date.now();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let end = Date.now();
        tempTime.push(end - start);
        setTimeArray(tempTime);
      });
  }

  function getTenFetchesTime(callAgain = i < 10) {
    if (!callAgain) {
      setTimeArray([...timeArray, ...arr]);
    }
    let start = Date.now();
    fetch(url)
      .then((res) => res.json())
      .then(() => {
        i++;
        arr.push(Date.now() - start);
        if (callAgain) getTenFetchesTime(i < 10);
      });
  }

  function renderGraph() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {timeArray.map((height) => (
          <div style={container}>
            <div style={{ ...box, height }} />
            <p>{height + " ms"}</p>
          </div>
        ))}
      </div>
    );
  }

  function reset() {
    setTimeArray([]);
    i = 1;
    arr = [];
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={getFetchTime}>Single Fetch</button>
      <button onClick={getTenFetchesTime}>Auto Fetch (10)</button>
      <button onClick={reset}>Reset</button>
      {renderGraph()}
    </div>
  );
}
