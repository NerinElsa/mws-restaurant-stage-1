let restaurants,
  neighborhoods,
  cuisines
var map
var markers = []

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    option.setAttribute('role', 'option');
    option.setAttribute("aria-label", neighborhood);
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    option.setAttribute('role', 'option');
    option.setAttribute("aria-label", cuisine);
    select.append(option);
  });
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
    
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  document.getElementById('map').style.display = 'none'; //initially hides the map
  updateRestaurants();
}

/**
 * Toggle button for map
 */
const toggle_map = () => {    
  
    if (document.getElementById('map').style.display === 'none')      
      document.getElementById('map').style.display = 'block' //displays the map   
    else      
    document.getElementById('map').style.display = 'none'   //hides the map
    }


/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */

fillRestaurantsHTML = (restaurants = self.restaurants) => {
  
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */

createRestaurantHTML = (restaurant) => {
  if(typeof  restaurant.photograph=== 'undefined'){
    restaurant.photograph = 'default'
  } 

  const li = document.createElement('li');
  const image = document.createElement('img');
  
  const alternativeText = ['Gotcha!',
                           'Mission Chinese Food',
                           'Emily',
                           'Kang Ho Dong Baekjeong',
                           'Katz\'s Delicatessen',
                           'Roberta\'s pizza',
                           'Hometown BBQ',
                           'Superiority Burger',
                           'The Dutch',
                           'Mu Ramen',
                           'Casa Enrique'];
  image.className = 'lazy';
  //image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.src = ('/img/spinner.gif'); //'spinner.gif' for initial page load
  image.srcset = DBHelper.imageSourceSetUrlForRestaurant(restaurant);
  image.sizes = '(max-width: 500px) 500px, (max-width: 640px) 260px, (max-width: 1024px) 320px, (min-width: 1025px) 210px';
  image.alt = alternativeText[restaurant.id];

  //Creating 'data-src' attrbute
  //const src = image.getAttribute('src');
  const srcset = image.getAttribute('srcset');
  const datasrc = document.createAttribute('data-src');
  datasrc.value = srcset;
  image.setAttributeNode(datasrc);
  image.removeAttribute('srcset');
 // console.log('Here is new image tag', srcset);
  
  li.append(image);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  
  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  more.id = 'detailsbutton';
  more.className = 'viewdetails-button';
  more.setAttribute('aria-label', 'More about this restaurant');
  more.setAttribute('role', 'link');
  li.append(more);

  return li
} 

function initialiseImages() {
  var images = document.currentScript.parentNode.getElementsByTagName('img');
  //debugger;
  for (var i = 0; i < images.length; i++) {
                  var src = images[i].getAttribute('src');
                  var datasrc = document.createAttribute('data-src');
                  datasrc.value = src;
                  images[i].setAttributeNode(datasrc);
                  images[i].removeAttribute('src');
                  console.log('Here is new image tag',images[i]);           
  }
  console.log('Here are images',images);  
}


/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}
