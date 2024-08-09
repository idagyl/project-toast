import { useEffect } from "react";

export const useKeydown = (key, callback) => {
  useEffect(() => {
    const handleKeyDownEvent = (event) => {
      if (event.key === key) {
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [key, callback]);
};
