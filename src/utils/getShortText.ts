export const getShortText = ({
  text,
  maxLength = 12,
  cutMode = "middle",
}: {
  text: string;
  maxLength?: number;
  cutMode?: "start" | "end" | "middle";
}) => {
  if (cutMode === "start")
    return text.length > maxLength ? text.slice(0, maxLength) : text;
  if (cutMode === "end")
    return text.length > maxLength ? text.slice(-maxLength) : text;

  //   middle cut
  return text.length > maxLength
    ? text.slice(0, 4) + "..." + text.slice(-4)
    : text;
};
