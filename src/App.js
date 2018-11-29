import React, { useReducer, useRef, useEffect } from "react";

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useStopwatch() {
  const [{ running, lapse }, setState] = useReducer(reducer, {
    running: false,
    lapse: 0
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleRunClick() {
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - lapse;
      intervalRef.current = setInterval(() => {
        setState({ lapse: Date.now() - startTime });
      }, 0);
    }
    setState({ running: !running });
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setState({ lapse: 0, running: false });
  }
  return { handleRunClick, handleClearClick, lapse, running };
}

const StopwatchComparison = () => {
  const stopwatchOne = useStopwatch();
  const stopwatchTwo = useStopwatch();

  return (
    <div style={{ textAlign: "center" }}>
      <label style={{ fontSize: "5em", display: "block" }}>
        {stopwatchOne.lapse} ms
      </label>
      <button onClick={stopwatchOne.handleRunClick}>
        {stopwatchOne.running ? "Stop" : "Start"}
      </button>
      <button onClick={stopwatchOne.handleClearClick}>Clear</button>
      <hr />
      <strong>Lapse Difference:</strong>
      <span>{stopwatchOne.lapse - stopwatchTwo.lapse} ms</span>
      <hr />
      <label style={{ fontSize: "5em", display: "block" }}>
        {stopwatchTwo.lapse} ms
      </label>
      <button onClick={stopwatchTwo.handleRunClick}>
        {stopwatchTwo.running ? "Stop" : "Start"}
      </button>
      <button onClick={stopwatchTwo.handleClearClick}>Clear</button>
    </div>
  );
};

export default StopwatchComparison;
