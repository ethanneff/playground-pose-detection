const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);
  const { assetExts } = defaultConfig.resolver;
  return {
    resolver: {
      assetExts: [...assetExts, "bin"],
    },
  };
})();
