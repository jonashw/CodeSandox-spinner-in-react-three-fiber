import React from "react";
import useEventListener from "@use-it/event-listener";

const useKeyToggle = (key, defaultState) => {
  const [state, setState] = React.useState(!!defaultState);

  useEventListener("keypress", (e) => {
    if (e.key === key) {
      setState(!state);
    }
  });

  return state;
};

export default useKeyToggle;
