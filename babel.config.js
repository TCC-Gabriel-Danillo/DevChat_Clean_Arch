module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '_assets': './assets',
            "_": "./src"
          },
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
          ]
        },
      ]
   ],
  };
};