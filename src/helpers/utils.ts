export const generateRandomId = (): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const stringLength = 20;
  function pickRandom() {
    return possible[Math.floor(Math.random() * possible.length)];
  }
  return [...Array(stringLength)].map(pickRandom).join('');
};
