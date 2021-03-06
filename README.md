## Description
This table displays SpaceX launch information received from the [SpaceX-API](https://github.com/r-spacex/SpaceX-API).

It includes the following functionality:
- An ability to sort the launches by flight number by clicking the column header.
- Easy to use pagination that is directly using the SpaceX-API pagination queries.
- Launches with presskit are highlighted with red and open the presskit in a new window.


## Running the App in Development Mode
- Clone the repo locally
- Run `yarn install`
- Run `yarn start` to run it in development mode
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running the App as a Production Build
- Clone the repo locally
- Run `yarn install`
- Run `yarn build` to create an optimized production build that can then be served.
- Run `yarn global add serve` (if you don't have the library and want to serve the app)
- Run `serve -s build`
- Go to [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Notes
- Originally I put the sortable header on the "Launch Year" `th` tag, but then I thought it would be confusing as the order would be sorting by utc date, but that column only includes the year.  I noticed the flight numbers went in order of the launch dates, so I put the sorting on `Flight #` instead.
- Rows with presskits will have a light red tint to them and will open the presskit into a new window.

## Things I Would Do If I Continued Working On This App
- **Testing!** With more time I would be adding in some `react-testing-library` or `jest` tests.
   - Things to test:
      - Any shared visual components (easy to test with a jest snapshot test) (e.g Loader)
      - A few tests to make sure loading, error, and data states are working correctly - would need to mock the SpaceX API.
- Think about an improved visual design overall including:
  - A more responsive layout for mobile phones. For now the table scrolls on the x-axis.
  - Make the table header fixed, so it's easier to understand what you are looking at in the table.
  - A better way to note which rows have a presskit.

## Recording of Basic Functionality
https://user-images.githubusercontent.com/13773557/129830072-b9c9462d-6ba9-4518-9ab6-422bd512bd48.mov



