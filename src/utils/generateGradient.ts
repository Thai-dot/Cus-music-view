function generateGradient(): string {
  const hexValues: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];

  function populate(a: string): string {
    for (let i = 0; i < 6; i++) {
      const x: number = Math.round(Math.random() * 14);
      const y: string = hexValues[x];
      a += y;
    }
    return a;
  }

  const newColor1: string = populate("#");
  const newColor2: string = populate("#");
  const angle: number = Math.round(Math.random() * 360);

  const gradient: string =
    "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";

  return gradient;
}

export default generateGradient;
