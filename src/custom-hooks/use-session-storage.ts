import { useState, useEffect } from "react";

const useSessionStorage = (name: string) => {
  const [value, setValue] = useState<any>("");

  useEffect(() => {
    if (window) {
      // set props data to session storage or local storage
      setValue(sessionStorage.getItem(name));
    }
  }, [name]);

  return value;
};

export default useSessionStorage;
