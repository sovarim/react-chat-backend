export default (token: string) => {
  const Bearer = 'Bearer' as const;
  const splittedToken = token.split(' ');
  if (splittedToken[0] !== Bearer) return false;
  return splittedToken[1];
};
