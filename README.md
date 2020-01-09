# Cypress Auto Test

* Angular
* Cypress
* Mocha
* Puppeteer

## Installation

### 1. Cypress

* Install [Cypress](https://www.cypress.io): `npm install cypress --save-dev`
* Install [Cypress-xpath](https://github.com/cypress-io/cypress-xpath): `npm install -D cypress-xpath`

### 2. If you want to use Typescript

* Install Webpack: `npm install --save-dev webpack`
* Install Typescript: `npm install --save-dev typescript`
* Install Ts-loader: `npm install --save-dev ts-loader`
* Install Cypress Webpack: `npm install --save-dev @cypress/webpack-preprocessor`

### 3.  Puppeteer

> Install puppeteer for do something extra like take 'Local Storage' or 'Session Storage', write the function on 'cypress' > 'plugins' > 'index.js' like a task (there are an example)
* Install [Puppeter](https://github.com/puppeteer/puppeteer): `npm i puppeteer`

### 4.  Report

* Install Mocha: `npm install --save-dev mocha`
* Install Mochawesome: `npm install --save-dev mochawesome`
* Install Mochawesome Report Generator: `npm install --save-dev mochawesome-report-generator`

## Steps

* Cypress Open: `npx cypress open`
* Cypress Run: `npx cypress run `
* Common options:
  1. `--project "project_name"`
  2. `--key "cypress.io_key"`


## Common Errors

* Solution: ["TypeError: Cannot read property 'passes' of undefined"](https://stackoverflow.com/questions/55138378/got-typeerror-cannot-read-property-passes-of-undefined-using-cypress-when-gen)
Install version 5.2.0 from mocha `npm install mocha@5.2.0.`

## Last implementation (09-01-2020)
* [Cypress-log-to-output](https://github.com/flotwig/cypress-log-to-output): Now we can see logs in our command and check if some log is showed.
