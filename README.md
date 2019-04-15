# Mobile Web Specialist Certification Course Project
---
#### _Three Stage Course Material: Project - Restaurant Reviews App_

### How to set up Local HTTP Server to run this app?
1. In command prompt, cd into the cloned project folder, cd into 'src' folder. Start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

2. With your server running, visit the site: `http://localhost:8000`, and look around for a bit to see what the current experience looks like.


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

Local Development API Server depends on [node.js LTS Version: v6.11.2 ](https://nodejs.org/en/download/), [npm](https://www.npmjs.com/get-npm), and [sails.js](http://sailsjs.com/)
Please make sure you have these installed before proceeding forward.

Great, you are ready to proceed forward; awesome!

Run these commands in ANOTHER terminal.

###### Install project dependancies
```Install project dependancies
# npm i
```
###### Install Sails.js globally
```Install sails global
# npm i sails -g
```
###### Start the server
```Start server
# node server
```
### You can now have access to your API server environment
debug: Environment : development
debug: Port        : 1337

## Project Overview: 

For the three staged **Restaurant Reviews App** project, I have incrementally converted a given static webpage into a mobile-ready web application. In **Stage One**, I have taken a static design that lacked accessibility and converted the design to be responsive on different sized displays and accessible for screen readers. I have also added a service worker to begin the process of creating a seamless offline experience for the users.

In **Stage Two**, an API was introduced from which restaurant information was retrived. The local development API server was available at Port : 1337. I have refactored the stage 1 project to make use of this new API.  

In **Stage Three**, a new richer API was introduced with additional functionalities from which restaurant information was retrived. The local development API server is available at Port : 1337. I have refactored the stage 2 project to make use of this new API. 

### Added Functionaliies

1. Responsive design. Try resizing the browser to see this in action.
2. Accessible design. Try using screen reader to see this in action. 
3. Properly aligned widgets with optimised content display. Try revealing and hiding the map in homepage. 
4. Optimised code.
5. 'Add a review' form implementation. Try adding a review for a restaurant.
6. 'Mark as favorite' button implementation. Try marking a restaurant as favorite. 

### Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. As much as possible, I have tried to maintain use of ES6 in any additional JavaScript I wrote. 