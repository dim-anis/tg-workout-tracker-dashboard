import * as React from "react";

export const useDarkMode = (key, initial) => {
  const [value, setValue] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(key);
      if (typeof saved === "string") {
        return JSON.parse(saved);
      }
    }

    return initial;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
