module.exports = function Babel(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
