export const formatTime = (time: String) => {

    const [hours, mins] = time.split(":");
    return hours + "%3A" + mins + "%3A00";
}