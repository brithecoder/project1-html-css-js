# Where In The World Project 

You can run this project on your local machine by running the index.html file on live server.
You can also view app from github pages with the link provided below.

## Overview

This project displays knowledge of HTML,CSS,and TypeScript/JavaScript I am also 
utilizing the [REST Countries API](https://restcountries.com).

## My process

First I looked at how the data would be return from the API if I made a fetch.The data came in as an array of county objects with different field objects inside the country object. I realize I had to use multiple fields for my project but you can only call ten at a time if you are receiving all of the country objects.I had to refactor my County class as my application grew and I realized how the different properties were coming in. After making sure my cards displayed
correctly I then worked on the search and filter functionality. After search and filter functionality I then worked on displaying the details page of each country,I went with an SPA approach ,for this I had to implement a router. After that was working correctly
I worked on the css of the cards and the page.This is when I worked on the toggle theme functionality.I had to fix the name of the country constructor to get the Common,Official, and Native names. 


 [!screenshot of app](/screenshot.png?raw=true)

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode


### Links

- Live Site URL: [https://brithecoder.github.io/project1-html-css-js/](https://brithecoder.github.io/project1-html-css-js/)

### What I learned

I learned alot Especially when doing the country code look up to display the bordering country badges.I also learned that a class can look differently when exectracting data from different APIs