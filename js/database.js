
(function loadIDB () {
    'use strict';
  
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }
    
    //if there is no service worker dont create an IDB
    if (!navigator.serviceWorker){
        console.log('There is no Service Worker available!');
        return Promise.resolve();
    }
    
    
    //Opens a new indexed database called restaurantDB
    let dbPromise = idb.open('restaurantDB', 1, function(upgradeDB){
        //Checks if the objectStore already exists and creates new if one doesnt exist 
        console.log('making a new object store');
        if (!upgradeDB.objectStoreNames.contains('restaurantsObjStr')) {
            let restaurantObjectStore = upgradeDB.createObjectStore('restaurantsObjStr',{keyPath:'id'});
            restaurantObjectStore.createIndex('by-name', 'name'); 
            } 
        }); 

    //Get all restaurant objects from IDB if there is one avalable and applicable     
    function showCachedRestaurants () {
        return dbPromise.then(function(db){
            if (!db) return;
                let tx = db.transaction('restaurantsObjStr', 'readonly');
                let ObjectStoreTransaction = tx.objectStore('restaurantsObjStr');
                return ObjectStoreTransaction.getAll();
            }).then(function(restaurants){
                console.log('Restaurants retrieved from IDB', restaurants);
                //debugger;
                fillRestaurantsHTML(restaurants);
                console.log('Restaurants displayed from IDB, HURRAY!')
                });
    }

 
    /*Fetch all restaurants*/
    fetch('http://localhost:1337/restaurants')
        .then(function(response) {

          if(response.ok){//Got a successful response from server!
            console.log('Looks like the response is here', response);
            console.log(`This is the response status, ${response.status}`);
            console.log(`This is the response status text, ${response.statusText}`);
            return response.json();
          }
          else if(!response.ok){//if the fetch url is wrong this error message displays in '.catch'
            return Promise.reject('Please double check the fetch request URL!'); //If the response was not `ok` a custom reject message is sent.
          }
        }).then(function fetchRestaurantData(restaurants) { //Fetches restaurant data from json object
            console.log('Here are the restaurants JSON object array', restaurants);
            
            //Adds each JSON restaurant object into IDB as a transaction
            dbPromise.then(function(db) {
                if(!db) return;
                    //Opens a new transaction tx on object store called restaurantsObjStr
                    let tx = db.transaction('restaurantsObjStr', 'readwrite');
                    let ObjectStoreTransaction = tx.objectStore('restaurantsObjStr');
                    restaurants.forEach(function(restaurants) {//Puts each restaurant into IDB
                        ObjectStoreTransaction.put(restaurants);
                    });
                }).then (function(){
                       console.log('Added restaurants to IDB!'); 
                       showCachedRestaurants (); //Retrieves and displays restaurants from IDB
                    });      
            })
            
         .catch(function(error) {//Displays this error message when 'promise'gets rejected from 'else if'
                console.log(`Error! Fetch request failed. `, error);
                showCachedRestaurants (); //Retrieves and displays restaurants from IDB
        });  
        
  })();


