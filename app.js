const pptr = require("puppeteer");
let result = [];

const bot = {
  browser: null,
  page: null,

  init: async () => {
    // set headless to false, to see the progress
    bot.browser = await pptr.launch({ headless: true });
    bot.page = await bot.browser.newPage();
    bot.page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
    );
  },

  start: async (city) => {
    const urlWeb = "https://www.bbc.com/weather";

    // goto web
    await bot.page.goto(urlWeb);

    // wait input filed ready
    await bot.page.waitForSelector("#ls-c-search__input-label");

    // type
    await bot.page.focus("#ls-c-search__input-label");
    await bot.page.keyboard.type(city);

    // wait list field
    await bot.page.waitForSelector(".ls-c-locations-list-item");

    // click the first choice
    const target_city = await bot.page.$$(".ls-c-locations-list-item");
    await target_city[0].click();

    // wait for selector ready
    await bot.page.waitForSelector("#daylink-0");
    await bot.scrape();
  },

  scrape: async () => {
    let targets = await bot.page.$$("#daylink-0");

    for (const target of targets) {
      try {
        // document.querySelectorAll, then loop to get array of text
        const description = await target.$eval(
          ".wr-day__weather-type-description-container",
          (el) => el.innerText
        );
        result.push(description);
      } catch (error) {
        console.log(error);
      }
    }
  },
};

async function weather(city) {
  try {
    await bot.init();
    await bot.start(city);
    await bot.browser.close();
    return result[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { weather };
