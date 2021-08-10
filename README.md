# Guestline - Hotel Group Page

Solution to guestline hotel group page solution. To run application type:

`npm install`
`npm start`

## The challenge

Your challenge is to product a page showing a list of hotels and their rooms.

Please use [React](https://reactjs.org) and (preferably) [Typescript](https://www.typescriptlang.org/) to implement this challenge as this is our platform of choice. There are no other restrictions on technology choices.

To get the information to present, you will need to query the following API:

`https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG`

This returns a list of hotels, with an Id. The Id can be used to query this query for the room types:

`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/[hotelId]` for example, `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/OBMNG1`

Guests using site should be able to:

- Filter based on the star rating of the hotel, that is, given I have selected 3 stars, then I am able to see all hotels with a 3 and above rating.

- Filter based on the capacity of the room. That is, when I have selected 1 adult and 1 child then I am able to see all rooms with at least that capacity.

For other requirements, please see the attached mockup sketch. Note that the mockup attempts to show hotel images. The the URLs can be found in the response to the initial request.

## Submitting your solution

We expect to build your submission locally and review it's code. If you host it publicly let us know, but that's not necessary. Please provide us with instructions how to build it in a readme file `Readme.md`. We will always provide feedback about your work.

## Got feedback for us?

We love receiving feedback! We're always looking to improve our recruitment process. So if you have anything you'd like to mention, please email talent[at]guestline[dot]com.

**Good Luck!** 🚀
