(function findRestaurantControllerIIFE(){

  var FindRestaurantController = function(findRestaurantFactory, appSettings, $timeout, uiGmapGoogleMapApi){
    var vm = this;
    vm.appSettings = appSettings;
    vm.formPhase = 1;
    // vm.category_filter;
    // vm.radius_filter;
    vm.url;
    vm.map = {};
    var areaZoom = 16;

    vm.restaurants = {};

    // function init(){
    //   findRestaurantFactory.getRestaurants();
    // }

    // init();

    vm.nextPhase = function(){
      vm.formPhase++;
    }

    vm.previousPhase = function(){
      vm.formPhase--;
    }

    vm.category = 'mexican';

    // ids are Yelp's category IDs
    vm.categories = [
      { id: 'newamerican', name: 'American (New)' },
      { id: 'tradamerican', name: 'American (Traditional)' },
      { id: 'hotdogs', name: 'Fast Food' },
      { id: 'mexican', name: 'Mexican' },
      { id: 'pizza', name: 'Pizza' }
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

    // Get geolocation
    function init(){
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        // Why isn't this working...?
        $timeout(function() {
          vm.formPhase++;
        }, 500);
        // console.log(vm.formPhase);

        /////

          // var url = appSettings.apiUrl;
          // url += '?';
          // url += 'latitude=' + pos.latitude
        console.log('Your current position is ' + vm.pos.latitude + ', ' + vm.pos.longitude)
        // if (vm.pos.latitude && vm.pos.longitude) {
        //   vm.nextPhase();
        //   debugger;
        // }
        // return vm.formPhase;

      // Yelp

      uiGmapGoogleMapApi.then(function(maps) {
        vm.map = {
          center: {
            latitude: vm.pos.latitude,
            longitude: vm.pos.longitude
          },
          zoom: areaZoom
        };
          vm.options = {
            scrollwheel: false
          };
        });

      });
    }

    init();

    vm.currentRestaurant // start at 0
    // increment with button press
    // vm.getRestaurants(vm.currentRestaurant)

    vm.getRestaurant = function(){
      var url = '';
      url = '/restaurant?term=food&category_filter=';
      url += vm.category;
      url += '&sort=2&ll=';
      url += vm.pos.latitude + ',' + vm.pos.longitude;
      url += '&radius_filter=';
      url += vm.distance;

      findRestaurantFactory.getRestaurants(url)
        .then(function(response){
          vm.restaurants = response.data.businesses;
        }, function(data, status, headers, config){
          console.log('Error getting restaurants.');
        });
      // http://localhost:3000/restaurant?category_filter=italian&sort=2&ll=42.3708805, -71.099856&radius_filter=1000
    };

}

    // uiGmapGoogleMapApi.
  FindRestaurantController.$inject = ['findRestaurantFactory', 'appSettings', '$timeout', 'uiGmapGoogleMapApi'];

  angular.module('tastemakerApp').controller('findRestaurantController', FindRestaurantController);

})();
