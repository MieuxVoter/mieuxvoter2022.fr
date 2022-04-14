export function shuffleArray(array) {
  /* https://stackoverflow.com/a/12646864/4986615 */
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const checkMajorityJugdment = (ballot, candidates, grades) => {
  const keys = Object.keys(ballot);
  for (const key of keys) {
    if (ballot[key] === undefined || !grades.includes(ballot[key])) {
      return false;
    }
  }
  return keys.length == candidates.length
}

export const displayNumber = (number) => {
  return `${number < 1000 ? '' : `${parseInt(number / 1000)} ${(number % 1000).toString().padStart(3, '0')}`}`;
}

