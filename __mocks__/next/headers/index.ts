const set = jest.fn((...props)=>{console.warn(...props)});
module.exports = {
  __setcookies: set,
  cookies: jest.fn(() => {
    return { set: set };
  }),
};
