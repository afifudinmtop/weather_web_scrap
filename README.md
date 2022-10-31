# weather_web_scrap

web scarpe to get weather information

## Installation

```
npm i weather_web_scrap
```

## Demo

Local demo:

```
git clone https://github.com/afifudinmtop/weather_web_scrap.git
cd weather_web_scrap
npm install && node test.js

// it will return the weather of jakarta
// please change the city variable to get different result
```

## Examples

```jsx
const app = require("weather_web_scrap");
const city = "jakarta";

app.weather(city).then(function (result) {
  console.log(result);
});
```

// you can see the example files on test.js

## License

weather_web_scrap is open source software [licensed as MIT](https://github.com/afifudinmtop/weather_web_scrap/blob/main/LICENSE).
