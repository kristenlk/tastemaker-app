(function favoritesFactoryIIFE(){

  var favoritesFactory = function($http, appSettings) {
    var factory = {};
    factory.favorites = [];

    factory.getFavorites = function(){
      return $http.get(appSettings.apiURL + '/account/favorites').success(function(response){
        angular.copy(response, factory.favorites);
      });
    };

    return factory;
  };

  favoritesFactory.$inject = ['$http', 'appSettings'];

  angular.module('tastemakerApp').factory('favoritesFactory', favoritesFactory);

})();
