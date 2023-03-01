/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    "^lodash-es$": "lodash",
    ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "identity-obj-proxy",
        "\\.(css|jpg|svg|png)$": "empty-module.js"
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
