# Mobile Web Specialist Certification Course Project
---
#### _Three Stage Course Material: Project - Restaurant Reviews App_

### How to set up Local HTTP Server to run this app?
1. In command prompt, cd into the cloned project folder. For eg. `C:\Users\USERNAME>cd mws-restaurant-stage-1`
2. cd into 'src' folder. For eg. `C:\Users\USERNAME\mws-restaurant-stage-1>cd src` 
3. Start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 
4. In a terminal, check the version of Python you have: `python -V`. 
For eg. `C:\Users\USERNAME\mws-restaurant-stage-1\src>python -V` Gives the result, Python 3.7.3
If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.
5. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) 
6. For Python 3.x, you can use `python -m http.server`. 
7. With your server running, visit the site at: `http://localhost:8000`. The local development API server should be set up before you can fully explore the site. Please follow the steps given below. 

### How to set up Local Development API Server required to run this app?
## Architecture
Local server
- Node.js
- Sails.js

## Contributors

- [Brandy Lee Camacho - Technical Project Manager](mailto:brandy.camacho@udacity.com)
- [David Harris - Web Services Lead](mailto:david.harris@udacity.com)
- [Omar Albeik - Frontend engineer](mailto:omaralbeik@gmail.com)

### Pre-Requisites 

Local Development API Server depends on [node.js LTS Version: v6.11.2 ](https://nodejs.org/en/download/), [npm](https://www.npmjs.com/get-npm), and [sails.js](http://sailsjs.com/) Please make sure you have these installed before proceeding forward.

1. Clone the API from [mws-restaurant-stage-3] (https://github.com/NerinElsa/mws-restaurant-stage-3.git) 
2. Open node.js CLI
3. cd into cloned API folder. 
For eg. `C:\Users\USERNAME>cd mws-restaurant-stage-3`
4. Install project dependancies
`npm i`
5. Install Sails.js globally
`npm i sails -g`
6. Start the server
`node server`
### You can now have access to your API server environment
- debug: Environment : development
- debug: Port        : 1337

Keep the server running. Visit the endpoints given in the readme file of the API repo [mws-restaurant-stage-3] (https://github.com/NerinElsa/mws-restaurant-stage-3.git). 

## Project Overview: 

The  **Restaurant Reviews App** project had three stages. 

In **Stage One**, I have taken a static design that lacked accessibility and converted the design to be responsive on different sized displays and accessible for screen readers. I have also added a service worker to begin the process of creating a seamless offline experience for the users.

In **Stage Two**, an API was introduced from which restaurant information was retrived. The local development API server is available at [mws-restaurant-stage-2] (https://github.com/NerinElsa/mws-restaurant-stage-2.git). I have refactored the stage 1 project to make use of this new API. Implemented 'Fetch API' to retrive data from API and made use of 'IndexedDB' to cache retrived data. 

In **Stage Three**, a new richer API was introduced with additional functionalities from which restaurant information was retrived. The local development API server is available at [mws-restaurant-stage-3] (https://github.com/NerinElsa/mws-restaurant-stage-3.git). I have refactored the stage 2 project to make use of this new API. 

### Added Functionaliies

1. Responsive design. Try resizing the browser to see this in action.
2. Accessible design. Try using screen reader to see this in action. 
3. Implemented 'Service Worker'and browser caching. 
4. Properly aligned widgets with optimised content display. Try revealing and hiding the map in homepage. 
5. Optimised code.
6. 'Add a review' form implementation. Try adding a review for a restaurant.
7. 'Mark as favorite' button implementation. Try marking a restaurant as favorite. 

### Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. As much as possible, I have tried to maintain use of ES6 in any additional JavaScript I wrote. 