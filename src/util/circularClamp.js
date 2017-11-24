export default (min, max) => (value) => {
    if (value < min) return max;
    if (value > max) return min;
    return value;
}
