(function findRestaurantControllerIIFE(){

  var FindRestaurantController = function(findRestaurantFactory, favoritesFactory, appSettings, $timeout, uiGmapGoogleMapApi, usSpinnerService){
    var vm = this;
    vm.appSettings = appSettings;
    vm.formPhase = 1;

    vm.url;
    vm.userLocationMap = {};
    vm.directionsMap = {};
    var areaZoom = 16;

    vm.restaurants = {};

    // Increments phase of restaurant finding process
    vm.nextPhase = function(){
      vm.formPhase++;
    }

  // Decrements phase of restaurant finding process
    vm.previousPhase = function(){
      vm.formPhase--;
      vm.restaurants = {}
      vm.currentRestaurant = 0;
    }

    vm.category = 'mexican';

    // ids are Yelp's category IDs
    vm.categories = [
      { id: 'newamerican', name: 'American (New)' },
      { id: 'tradamerican', name: 'American (Traditional)' },
      { id: 'bbq', name: 'Barbeque' },
      { id: 'breakfast_brunch', name: 'Breakfast & Brunch' },
      { id: 'burgers', name: 'Burgers' },
      { id: 'cafes', name: 'Cafes' },
      { id: 'caribbean', name: 'Caribbean' },
      { id: 'chinese', name: 'Chinese' },
      { id: 'cupcakes', name: 'Cupcakes' },
      { id: 'desserts', name: 'Desserts' },
      { id: 'hotdogs', name: 'Fast Food' },
      { id: 'foodtrucks', name: 'Food Trucks' },
      { id: 'french', name: 'French' },
      { id: 'gastropubs', name: 'Gastropubs' },
      { id: 'german', name: 'German' },
      { id: 'gluten_free', name: 'Gluten-Free' },
      { id: 'greek', name: 'Greek' },
      { id: 'icecream', name: 'Ice Cream & Frozen Yogurt' },
      { id: 'italian', name: 'Italian' },
      { id: 'japanese', name: 'Japanese' },
      { id: 'juicebars', name: 'Juice Bars & Smoothies' },
      { id: 'kosher', name: 'Kosher' },
      { id: 'latin', name: 'Latin American' },
      { id: 'mediterranean', name: 'Mediterranean' },
      { id: 'mexican', name: 'Mexican' },
      { id: 'mideastern', name: 'Middle Eastern' },
      { id: 'moroccan', name: 'Moroccan' },
      { id: 'pizza', name: 'Pizza' },
      { id: 'pubfood', name: 'Pub Food' },
      { id: 'sandwiches', name: 'Sandwiches' },
      { id: 'seafood', name: 'Seafood' },
      { id: 'southern', name: 'Southern' },
      { id: 'thai', name: 'Thai' },
      { id: 'vegan', name: 'Vegan' },
      { id: 'vegetarian', name: 'Vegetarian' },
      { id: 'vietnamese', name: 'Vietnamese' },
    ];

    vm.distance = '1609';

    // ids are distances in meters (as defined by Yelp API)
    vm.distances = [
      { id: '402', name: '1/4 mile' },
      { id: '804', name: '1/2 mile' },
      { id: '1609', name: '1 mile' },
      { id: '3218', name: '2 miles' },
      { id: '8046', name: '5 miles' }
    ];

    vm.price = 2;

    // ids are distances in meters (as defined by Yelp API)
    vm.prices = [
      { id: 1, name: '$' },
      { id: 2, name: '$$ (and below)' },
      { id: 3, name: '$$$ (and below)' },
      { id: 4, name: '$$$$ (and below)' }
    ];

    // Get geolocation
    function init(){
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        $timeout(function() {
          vm.formPhase++;
        }, 500);

        console.log('Your current position is ' + vm.pos.latitude + ', ' + vm.pos.longitude)

        uiGmapGoogleMapApi.then(function(maps) {
          vm.userLocationMap = {
            center: {
              latitude: vm.pos.latitude,
              longitude: vm.pos.longitude
            },
            zoom: areaZoom
          };
          vm.options = {
            scrollwheel: false
          };

          vm.userLocation = [
            {
              id: 1,
              latitude: vm.pos.latitude,
              longitude: vm.pos.longitude,
              title: 'user location'
            }
          ];
        });

      });
    }

    init();

    vm.getRestaurant = function(){
      var url = '';
      url = '/restaurant?categories=';
      url += vm.category;
      url += '&sort=2&latitude=';
      url += vm.pos.latitude;
      url += '&longitude=';
      url += vm.pos.longitude;
      url += '&radius=';
      url += vm.distance;
      url += '&price=' + vm.price

      findRestaurantFactory.getRestaurants(url)
        .then(function(restaurants){
          vm.formPhase++;
          vm.restaurants = restaurants;
          if (restaurants.data.length === 0) {
            console.log('Your search didn\'t return any restaurants. Please try searching again!');
          } else {
            vm.restaurants = JSON.parse(restaurants.data);
            if (vm.restaurants.businesses.length === 0) {
              return;
            }

            vm.restaurants = vm.restaurants.businesses.sort(function(a, b){
              if (a.rating > b.rating) return -1;
              if (a.rating < b.rating) return 1;
              if (a.review_count > b.review_count) return -1;
              if (a.review_count < b.review_count) return 1;
              return 0;
            });

            uiGmapGoogleMapApi.then(function(maps) {
              // stores maps in vm.maps so I can access it in redrawRoute() later on
              vm.maps = maps;
              vm.directionsMap = {
                control: {},
                center: {
                  latitude: vm.pos.latitude,
                  longitude: vm.pos.longitude
                },
                zoom: areaZoom
              };
              vm.options = {
                scrollwheel: false
              };

              vm.directionsService = new maps.DirectionsService();
              vm.directionsDisplay = new maps.DirectionsRenderer();

              vm.route = {
                origin: new maps.LatLng(
                  vm.pos.latitude,
                  vm.pos.longitude
                ),
                destination: new maps.LatLng(
                  vm.restaurants[vm.currentRestaurant].coordinates.latitude,
                  vm.restaurants[vm.currentRestaurant].coordinates.longitude
                ),
                travelMode: maps.TravelMode['DRIVING']
              };

              vm.directionsService.route(vm.route, function(response, status){
                if (status === google.maps.DirectionsStatus.OK) {
                  vm.directionsDisplay.setDirections(response);
                  vm.directionsDisplay.setMap(vm.directionsMap.control.getGMap());
                } else {
                  console.log('Directions unsuccessful');
                }
              })

            });
          }
        }, function(data, status, headers, config){
          console.log('Error getting restaurants.');
        });
      };

    vm.currentRestaurant = 0;

  // Increments phase of restaurant finding process
    vm.nextRestaurant = function(){
      vm.currentRestaurant++;
      // If there is a restaurant past the one you're on, redraw the maps route.
      if (vm.restaurants[vm.currentRestaurant]) {
        redrawRoute();
      } else {
        console.log('There are no more restaurants that match your criteria. Please try searching again!')
      }
    }

    function redrawRoute(){
      vm.route = {
        origin: new vm.maps.LatLng(
          vm.pos.latitude,
          vm.pos.longitude
        ),
        destination: new vm.maps.LatLng(
          vm.restaurants[vm.currentRestaurant].coordinates.latitude,
          vm.restaurants[vm.currentRestaurant].coordinates.longitude
        ),
        travelMode: vm.maps.TravelMode['DRIVING']
      };

      vm.directionsService.route(vm.route, function(response, status){
        if (status === google.maps.DirectionsStatus.OK) {
          vm.directionsDisplay.setDirections(response);
          vm.directionsDisplay.setMap(vm.directionsMap.control.getGMap());
        } else {
          console.log('Directions unsuccessful');
        }
      })
    };

    vm.inFavorites = function(currRstId){
      for (var i = 0; i < favoritesFactory.favorites.length; i++) {
        if (currRstId === favoritesFactory.favorites[i].restaurant.yelp_id) {
          return true;
        }
      }
    };

    // Decrements phase of restaurant finding process
    vm.previousRestaurant = function(){
      vm.currentRestaurant--;
      redrawRoute();
    }

    vm.saveToFavorites = function(){
      favoritesFactory.saveToFavorites(vm.restaurants[vm.currentRestaurant])
        // Gets favorites so "Save to Favorites" button is dynamically updated
        .success(function(){
          favoritesFactory.getFavorites();
        })
        .error(function() {
          console.log('Error getting favorite.');
        });;
    }
}

  FindRestaurantController.$inject = ['findRestaurantFactory', 'favoritesFactory', 'appSettings', '$timeout', 'uiGmapGoogleMapApi', 'usSpinnerService'];

  angular.module('tastemakerApp').controller('findRestaurantController', FindRestaurantController);

})();
