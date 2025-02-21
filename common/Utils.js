const processHrTimeToSeconds = (hrtime) => {
    return (hrtime[0] + hrtime[1] / 1e9).toFixed(9);
}
module.exports = {
    processHrTimeToSeconds
}