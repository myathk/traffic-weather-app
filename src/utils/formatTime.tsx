/**
 * formats time in hours and minutes specifically to call traffic and weather APIs
 *
 * @param time string of time in format HH:mm
 * @returns formatted time
 */
export const formatTime = (time: String) => {
  const [hours, mins] = time.split(':');
  return hours + '%3A' + mins + '%3A00';
};
