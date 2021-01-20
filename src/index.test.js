/* eslint-disable */

const glob = require("glob")
const { forEach } = require("@asd14/m")

require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
})

// Find and run all test files across units
const testFiles = glob.sync("./*/**/*.test.tsx", { cwd: __dirname })

forEach(source => require(source), testFiles)
