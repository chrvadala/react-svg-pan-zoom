module.exports = function (api) {
  const KEEP_MODULES = process.env.KEEP_MODULES === 'true'

  api.cache(true)

  const presets = [];
  const plugins = [];

  plugins.push("@babel/plugin-proposal-object-rest-spread")

  presets.push(["@babel/preset-env", {modules: KEEP_MODULES ? false : 'commonjs'}])
  presets.push("@babel/preset-react")

  return {
    presets,
    plugins
  };
}
