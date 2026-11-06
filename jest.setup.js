const getTestRule = require('jest-preset-stylelint/getTestRule');

global.testRule = getTestRule({ plugins: [require.resolve('./index.js')] });
