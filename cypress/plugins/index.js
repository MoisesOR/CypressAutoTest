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
const EWS = require('node-ews')

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
    },
    getEmail() { // Function to get email body from any email
      return (async () => {
        const ewsConfig = {
          username: '',
          password: '',
          host: 'https://outlook.office365.com',
          auth: 'basic'
        };
        const ews = new EWS(ewsConfig);
        const findEmail = 'FindItem';
        const getEmail = 'GetItem'
        const findEmailArgs = {
          "attributes": {
            "Traversal": "Shallow"
          },
          "ItemShape": {
            "BaseShape": "AllProperties"
          },
          "IndexedPageItemView": {
            "attributes": {
              "MaxEntriesReturned": "1",
              "Offset": "0",
              "BasePoint": "Beginning"
            }
          },
          "ParentFolderIds": {
            "DistinguishedFolderId": {
              "attributes": {
                "Id": "inbox"
              }
            }
          },
          "QueryString": "subject: Some Text" // Query to search email by: Subject, from, to...
        };
        const getEmailArgs = {
          "ItemShape": {
            "BaseShape": "Default",
            "IncludeMimeContent": "true"
          },
          "ItemIds": {
            "ItemId": {
              "attributes": {
                "Id": "xx",
                "ChangeKey": "zz"
              }
            }
          }
        }

        const ewsFindEmail = await ews.run(findEmail, findEmailArgs)
          .then(result => {
            return result
          })
          .catch(err => {
            return err.stack
          });

        const ChangeKey = ewsFindEmail.ResponseMessages.FindItemResponseMessage.RootFolder.Items.Message.ItemId.attributes.ChangeKey;
        const Id = ewsFindEmail.ResponseMessages.FindItemResponseMessage.RootFolder.Items.Message.ItemId.attributes.Id;
        getEmailArgs.ItemIds.ItemId.attributes.Id = Id;
        getEmailArgs.ItemIds.ItemId.attributes.ChangeKey = ChangeKey;

        const ewsGetEmail = await ews.run(getEmail, getEmailArgs)
          .then(result => {
            return result.ResponseMessages.GetItemResponseMessage.Items.Message.Body.$value
          })
          .catch(err => {
            return err.stack
          });

        var regex = new RegExp('')
        var emailRegex = regex.exec(ewsGetEmail)

        return emailRegex[1]
      })();
    }
  })
  require('cypress-log-to-output').install(on, (type, event) => {
    if (event.level === 'error' || event.type === 'error') {
      isEventError = true
    }
    return true
  })
}
