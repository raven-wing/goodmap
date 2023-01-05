const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://www.staging.rzutberetem.eco/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
