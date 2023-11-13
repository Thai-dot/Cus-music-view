const formatTime = (timeInSeconds: number) => {
  
  if (timeInSeconds === 0 || Number.isNaN(timeInSeconds)) {
    return `00:00`;
  }
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
export default formatTime;
