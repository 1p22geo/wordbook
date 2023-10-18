const set = jest.fn();
module.exports = {
  __setcookies: set,
  cookies: jest.fn(() => {
    return { set: set };
  }),
};
