(function findRestaurantFactoryIIFE(){

  var findRestaurantFactory = function($http, appSettings){
    var factory = {};
    factory.topRestaurantMatch = {};
    factory.restaurantMatches = [];

    factory.getRestaurants = function(url){
      return $http.get(appSettings.apiURL + url).success(function(response){
        angular.copy(response, factory.restaurantMatches);
      });
    };

    return factory;
  };

  findRestaurantFactory.$inject = ['$http', 'appSettings'];

  angular.module('tastemakerApp').factory('findRestaurantFactory', findRestaurantFactory);

})();
