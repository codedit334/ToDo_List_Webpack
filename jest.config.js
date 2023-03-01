/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "identity-obj-proxy",
  },
  moduleDirectories: [
    "node_modules",
    "/src"
  ],
  collectCoverageFrom: [
    "src/modules/sort-array/dist/{!(index),}.mjs"
  ],
  transformIgnorePatterns: [
    "/!node_modules\\/lodash-es/"
  ]
};

module.exports = config;
