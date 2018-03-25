# overwatch-heroes
A simple single page application that provides information about Overwatch heroes.

A demo is hosted on Heroku:
https://heroes-of-overwatch.herokuapp.com/

## Quick start

`npm run server` starts the server with nodemon

`npm run client` starts the client

`npm run dev` starts both the server and the client

`npm run test` starts tests with Mocha


Additional scripts are:

`start` (executed by Heroku server on start)

`heroku-postbuild` (executed by Heroku server on upload to install and build the client)


## Architecture

The project is composed of a server (main folder) and a client (*client* folder).

### Server

The server makes use of Express framework to serve static files (index.html, js and css files) and to expose data through a REST API. Server address while testing on local machine is http://localhost:5000.

Data are saved on a MongoDB instance hosted on https://mlab.com

Server folder contains the following directories:

*test*: contains the files to test the API. The libraries used are Mocha, SuperTest package to test APIs, and Chai assertion library.

*db*: used to connect to MongoDB. This is a module which exports a function that connects to MongoDB and then returns the database.

*routes*: exports a function accepting two parameters (the database already initialized and the Express app), defines endpoints, and returns the Express app.

API paths available are:

`/api/initdb` loads the db from AWS and saves it on database.

`/api/heroes/:name` returns a single hero object (e.g. `/api/heroes/bastion`).

`/api/heroes` returns an array of heroes ordered by hero name. 


In `api/heroes` path it is possible to include the following query parameters:

`limit` the maximum number of results

`filter` returns only heroes whose name starts with filter string

`lastname` returns only heroes whose name is greater than lastname (this is used to paginate the search)

Example: `/api/heroes?lastname=Bastion&limit=3` returns only the next 3 heroes after Bastian.

### Client

Client project is bootstrapped with create-react-app.
To test client on local machine, the address is http://localhost:3000. When uploaded to Heroku, client files (index.html and js and css files) are returned from the server by browsing the main address (or any address that does not match an API endpoint).

Client includes routing with react-router-dom and state management with Redux.

The components folder contains the HeroesPage component, to navigate and search heroes, and the HeroPage to display selected hero's data.

The HeroesPage dynamically loads more heroes while scrolling down (end eventually resizing page). To perform a paginated search, the name of the last hero received by server is saved, and then is passed as a parameter to the next search. When a search returns no heroes, a flag is set to true so that the search function is not called anymore.
When user writes in the input field, current loaded heroes are filtered to match the entered text, and a new search is performed to load heroes that were not yet loaded.