# Out Tonight

## Deployed Heroku Project: https://mysterious-fjord-84629.herokuapp.com/

## Overview

It should be easy for vendors to promote local events and for people to find something fun to do on a given night.

Each of us has experienced the feeling of being suddenly energized to go out and do something, but there is a lack of aggregate lists that make last-minute planning easy.

## Design Process

* We discussed tackling this problem with movie showtimes and restaurants before settling on an aggregate events approach
* We wireframed our three client-side pages (home, vendor, search)
* We assumed siloed usage between vendors and attendees
  * We did not scope project to handle user abuse
* We factored in vendor and attendee UX for overall experience
* We initially used user ZIP codes for location-specific results but this approach was incompatible with a good vendor UX

## Technologies

* Node and Express web server
* Handlebars
* MVC model
* Sequelize and seeds.js file
* Moment.js
* Heroku hosting

## Challenges

* Working around MySQL date formatting
* Our dates ie., 2019-03-08 were being converted by MySql to 2019-03-08T00:00.000Z
  * Getting creative (trying Moment.js and the JavaScript slice method) to remove this took time
* Using the MVC model
* If/else logic for the search page
* GET routes and DOM appending
* Identifying a library that added value
* And, most notably ... time!

## Future Development

* Edit and delete functionality for vendors
  * User login
* Type filtering e.g., Family, Music, Festivals
* Add Bands in Town and similar APIs to not rely on vendor inputs
* Expand into other cities
  * Or broaden app with automated location detection or user ZIP codes, and address vendor requirement
* Monetization of app with ads, subscription model or paid listings


