import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export const useAnimatedCounter = (
  maxValue: number,
  initialValue = 0,
  duration = 1
) => {
  const [counter, setCounter] = useState<number>(initialValue);

  useEffect(() => {
    const controls = animate(initialValue, maxValue, {
      duration,
      onUpdate(value) {
        const getNumber = value.toFixed(0);
        //@ts-ignore
        setCounter(getNumber);
      },
    });
    return () => controls.stop();
  }, [initialValue, maxValue, duration]);

  return counter;
};
