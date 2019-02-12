## To Install

`npm install`

## To Run

`npm start` and it will start running in the browser in http://localhost:3000

## To Build

`npm run buil` and it will create a folder build with the files to use

## Config

By default the frontend expects the server running in http://localhost:8080.
You can change this with the environment variable `REACT_APP_BASE_URL`

## Documentation

To generate a html page with the documentation from the code comments run:

`jsdoc src/utils/wallet.js`

and it will generate a `index.html` file in `out/index.html`