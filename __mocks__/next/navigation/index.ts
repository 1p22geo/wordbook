module.exports = {
  redirect: jest.fn((...props) => {
    console.info(...props);
  }),
};
