import { useState, useEffect } from "react";

// initialCount by seconds
const useCountdown = (initialCount: number) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return count;
};

export default useCountdown;
