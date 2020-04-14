export const convertCurrentTime = (numb: number): string => {
    const mins: number = Math.floor(numb / 60);
    const secs: number = +(numb % 60).toFixed();
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`
};