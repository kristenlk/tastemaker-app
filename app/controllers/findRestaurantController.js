(function findRestaurantControllerIIFE(){

  var FindRestaurantController = function(findRestaurantFactory, appSettings){
    var vm = this;
    vm.appSettings = appSettings;
    vm.formPhase = 1;
    vm.category_filter;
    vm.radius_filter;

    // vm.restaurants = []; ??

    function init(){
      findRestaurantFactory.getRestaurants();
    }

    init();

    vm.nextPhase = function(){
      vm.formPhase++;
    }

    vm.previousPhase = function(){
      vm.formPhase--;
    }

    vm.category = 'mexican';

    vm.categories = [
      { id: 'newamerican', name: 'American (New)' },
      { id: 'tradamerican', name: 'American (Traditional)' },
      { id: 'hotdogs', name: 'Fast Food' },
      { id: 'mexican', name: 'Mexican' },
      { id: 'pizza', name: 'Pizza' }
    ];

    vm.distance = '1609';

    vm.distances = [
      { id: '402', name: '1/4 mile' },
      { id: '804', name: '1/2 mile' },
      { id: '1609', name: '1 mile' },
      { id: '3218', name: '2 miles' },
      { id: '8046', name: '5 miles' }
    ];

    // Get geolocation
    navigator.geolocation.getCurrentPosition(function(position) {
      vm.pos = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      // Why isn't this working...?
      // vm.nextPhase();
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
      vm.url = appSettings.apiUrl + '/restaurant?term=food&category_filter=';
      vm.url += vm.category_filter;
      vm.url += '&sort=2&ll=';
      vm.url += vm.pos.latitude + ', ' + vm.pos.longitude;
      vm.url += '&radius_filter=';
      vm.url += vm.radius_filter;

      console.log(vm.url);
      // http://localhost:3000/restaurant?category_filter=italian&sort=2&ll=42.3708805, -71.099856&radius_filter=1000

    });

}

    // uiGmapGoogleMapApi.
  FindRestaurantController.$inject = ['findRestaurantFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('findRestaurantController', FindRestaurantController);

})();
