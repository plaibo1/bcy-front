export const debounce = (fn: (value: string) => void, delay: number) => {
  let timeoutId: number;

  return (value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(value);
    }, delay);
  };
};
