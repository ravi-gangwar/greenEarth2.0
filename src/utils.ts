export const TextShortner = (s: string, len: number) => {
    if (s.length > len) {
        return s.substring(0, len) + "...";
    } else {
        return s;
    }
}