// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const wp = require('@cypress/webpack-preprocessor')
const puppeteer = require('puppeteer')
let isEventError = false

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
        rules: [{
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }]
      }
    },
  }
  on('file:preprocessor', wp(options))
  on("task", {
    puppeteerFunction() { // call with cy.task('puppeeterFunction')
      return (async () => {
        const browser = await puppeteer.launch({
          headless: true,
          slowMo: 250,
          defaultViewport: null
        });
        const page = await browser.newPage();
        await page.goto('');
        await page.click('');
        await page.waitForNavigation({
          waitUntil: 'networkidle0'
        });
        const elements = await page.$x('');
        await elements[0].click();
        await page.waitForNavigation({
          waitUntil: 'networkidle0'
        });

        const localStorageData = await page.evaluate(() => {
          let json = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            json[key] = localStorage.getItem(key);
          }
          return json;
        });

        const sessionStorageData = await page.evaluate(() => {
          let json = {};
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            json[key] = sessionStorage.getItem(key);
          }
          return json;
        });

        console.log(localStorageData)
        console.log(sessionStorageData)

        await page.waitFor(5000);

        await page.screenshot({
          path: 'puppeteerFunction.png'
        });

        await browser.close();

        return localStorageData
      })();
    },
    getEventError() {
      return isEventError
    },
    resetEventError() {
      isEventError = false
      return isEventError
    }
  })
  require('cypress-log-to-output').install(on, (type, event) => {
    if (event.level === 'error' || event.type === 'error') {
      isEventError = true
    }
    return true
  })
}
