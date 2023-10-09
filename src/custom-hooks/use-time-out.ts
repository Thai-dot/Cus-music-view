import { useEffect } from "react";

const useTimeout = (callback: () => void, delay: number) => {
  useEffect(() => {
    const timerId = setTimeout(callback, delay);
    return () => clearTimeout(timerId);
  }, [callback, delay]);
};

export default useTimeout;
