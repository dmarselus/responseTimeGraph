import React, { useState } from "react";

const url = "https://api.jobtread.com/healthz";

let arr = [];
let counter = 1;

let box = {
  borderRadius: 5,
  width: 50,
  lineHeight: 0
};

let container = {
  margin: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end"
};
export default function App() {
  const [timeArray, setTimeArray] = useState([]);

  /*
    getFetchTime
    params: none
    def: get a single response time, and push into timeArray
    return: void
  */
  function getFetchTime() {
    let tempTime = [...timeArray];
    let start = Date.now();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        tempTime.push({ type: "Manual", time: Date.now() - start });
        setTimeArray(tempTime);
      });
  }

  /*
    getTenFetchesTime
    params: callAgain - boolean
    def: get 10 responses time recursively, and write it into temporary
          array, after its finished then set the timeArray
    return: void
   */
  function getTenFetchesTime(callAgain = counter < 10) {
    if (!callAgain) {
      setTimeArray([...timeArray, ...arr]);
    }
    let start = Date.now();
    fetch(url)
      .then((res) => res.json())
      .then(() => {
        counter++;
        arr.push({ type: "Auto", time: Date.now() - start });
        if (callAgain) getTenFetchesTime(counter < 10);
      });
  }

  /*
    renderGraph
    params: none
    def: iterate through timeArray then draw the graph
    return: JSX
   */
  function renderGraph() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {timeArray.map(({ type, time }, index) => {
          let backgroundColor =
            time <= 50 ? "green" : time <= 60 ? "orange" : "red";
          return (
            <div key={index} style={container}>
              <div style={{ ...box, height: time, backgroundColor }} />
              <span>{type}</span>
              <span>{time + " ms"}</span>
            </div>
          );
        })}
      </div>
    );
  }

  /*
    reset
    params: none
    def: resetting all the variables
    return: void
   */
  function reset() {
    setTimeArray([]);
    counter = 1;
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
