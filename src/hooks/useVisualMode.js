import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(newMode, replace = false) {
    setHistory((prev) => {
      let newHistory = [...prev]
      if (replace) {
        newHistory.pop()
      }
      newHistory.push(newMode);
      return newHistory;
    });
    setMode(newMode);
  }

  function back() {
    if (history.length === 1) {
      return;
    }
    setHistory((prev) => {
      let newHistory = [...prev];
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  }

  return { mode, transition, back};
}

