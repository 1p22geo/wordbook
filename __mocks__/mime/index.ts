module.exports = {
  getType: jest.fn((path: string) => {
    if (path.match(/.jpg$/)) return "image/jpeg";
  }),
};
