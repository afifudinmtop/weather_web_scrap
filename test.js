const app = require("./app.js");
const city = "jakarta";

app.weather(city).then(function (result) {
  console.log(result);
});
