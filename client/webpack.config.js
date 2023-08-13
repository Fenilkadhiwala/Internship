// webpack.config.js

module.exports = {
  // ... other webpack configuration ...
  mode: "production",

  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
};
