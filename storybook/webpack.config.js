module.exports = async ({config}) => {
  return {
    ...config,
    performance: {hints: false}
  }
};
