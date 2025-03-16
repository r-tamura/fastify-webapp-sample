import { setCommonPlugins, setHeadlessWhen } from "@codeceptjs/configure";
require("dotenv").config();
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

if (process.env.BASE_URL === undefined) {
  throw new Error("BASE_URL is required to run tests");
}
console.log("BASE_URL", process.env.BASE_URL);
console.log("HEADLESS", process.env.HEADLESS);

export const config: CodeceptJS.MainConfig = {
  tests: "./*_test.ts",
  output: "./output",
  helpers: {
    Playwright: {
      url: process.env.BASE_URL,
      browser: "chromium",
      show: false,
    }
  },
  translation: "en-US",
  vocabularies: ["./vocabularies.json"],
  include: {
    I: "./steps_file"
  },
  name: "e2e",
  plugins: {
    allure: {
      enabled: true,
      require: "allure-codeceptjs",
    },
    stepByStepReport: {
      enabled: true,
      screenshotsForAllureReport: true,
      deleteSuccessful: false,
    },
  },
}