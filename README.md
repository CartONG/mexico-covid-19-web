# UNICEF Mexico COVID-19 dashboard

Client side code of the UNICEF COVID-19 dashboard.

## Project setup
This project was scaffolded with [Vue CLI](https://cli.vuejs.org/) and thus require [Node.js](https://nodejs.org). To install all the dependencies run the following command: 
```
npm install
```

## Development
To start a local web server for development, run the following command and check in your terminal the URL to visit to get a local version of the dashboard (default URL is: http://localhost:8080).
```
npm run serve
```

## Compiles and minifies for production
To get production files run the following command (production files will be located in */dist* folder).
```
npm run build
```

## Unit tests
To run unit tests, use the following commands: 
```
npm run test:unit
```
Unit tests are located in the folder */tests/unit* and are written using [Vue Test Utils](https://vue-test-utils.vuejs.org/) and [Jest](https://jestjs.io/).

## Code
The code and the unit tests of this project are written in [Typescript](https://www.typescriptlang.org/).

## Architecture
This project follow the [hexagonal architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)):
 - domain (business) classes and interfaces are located in the */src/domain folder*
 - code dedicated to rendering is located in the */src/primary* folder
 - code dedicated to data retrieval through REST API is located in the directory */src/secondary*.
 
The rendering code is build upon [Vue.js framework](https://vuejs.org/). For ease the unit tests and separate the rendering part from the rest of the code, each Vue component is split into 2 files:
 - one *.vue* file containing the template (rendering)
 - one *.component.ts* file containing the Typescript code of the component
 
 The entry point is the *main.ts* file located in the *src* folder.

## Styles
This project use the Vue.js component library [Buefy](https://buefy.org/) build on top of the CSS framework [Bulma](https://bulma.io/).

CSS and Saas files are located in the */src/styles* directory.
  
