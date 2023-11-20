import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "@/custom-hooks/use-darkside";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch
        checked={darkSide}
        moonColor="#0e79f1"
        sunColor="#0e79f1"
        onChange={toggleDarkMode}
        size={30}
      />
    </>
  );
}
