function truncateText(text: string, maxLength: number): string {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

export default truncateText;
