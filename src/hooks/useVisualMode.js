import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(newMode, replace = false) {

    if (replace) {
      let historyReplace = [...history];
      historyReplace[historyReplace.length - 1] = mode;
      setHistory((prev) => historyReplace);
      setMode((prev) => newMode);

    } else {
      setHistory([...history, newMode]);
      setMode((prev) => newMode); 
    }

  }

  function back() {
    let historyBack = [...history];
    historyBack.pop();
    setHistory((prev) => historyBack);
    if (history.length > 1) {
      setMode((prev) => historyBack[(historyBack.length - 1)]);
    }
  }

  return { mode, transition, back};
}

