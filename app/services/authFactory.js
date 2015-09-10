(function authFactoryIIFE(){

  var authFactory = function($http, appSettings){

    var factory = {};

    factory.currentUser = {};

    factory.login = function(formData){
      return $http.post(appSettings.apiURL + '/login').success(function(response){
        angular.copy(response, factory.currentUser);
      });
    };

    factory.signup = function(formData){
      return $http.post(appSettings.apiURL + '/signup').success(function(response){
        factory.currentUser = data.user;
        // angular.copy(response, factory.restaurantMatches);
      });
    };

    return factory;
  };

  authFactory.$inject = ['$http', 'appSettings'];

  angular.module('tastemakerApp').factory('authFactory', authFactory);

})();
