# EventCalendar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

## Getting started
- Clone or fork this repository.
- Install latest version of [node.js](https://nodejs.org/) .
- Make sure you have NPM installed, to check open cmd and type `npm -v` for version checking.
- Open the project directory and run command `npm install`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


List of Calendar Functionalities:-

- You can naviagte between Month view and week-day views through the buttons 'month' and 'week' at the top.
- Any created event can be seen in both week and month view.
- Month view
    - An Individual can add events in month view by clicking on the '+' icon.
    - The events of a particular date are displayed in the right panel.
    - You can navigate through previous and future months.
    - Event events can still be displayed in the right panel.
- Week view
    - You can add event by clicking the cell of a day of a week.
    - Each cell is equivalent to 30 minutes time interval.
    - You can navigate through previous and future weeks.
    
Frameworks and Libraries:-

- UI Framework
    - HTML5/CSS3
    - Material Design Bootstrap
- Frontend Framework and Libraries
    - Angular 2 with Angular CLI intigration.
    - Karma and protractor config for testing.
    - Moment.js
    - jQuery

Future Enhancements

- Editing of event can be done.
- Routing can be implemented between the 2 views.
- Responsive implementation can done.
- Recuring event functionalities can be added.
- Use of ngRx/stores for storing events locally can be done.
