const set = jest.fn((...props) => {
  console.warn(...props);
});

module.exports = {
  __setcookies: set,
  cookies: jest.fn(() => {
    //@ts-expect-error
    return {
      set: set,
      get: jest.fn(() => {
        return { value: global.session };
      }),
    };
  }),
};
