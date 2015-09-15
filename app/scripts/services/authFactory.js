(function authFactoryIIFE(){

  var authFactory = function($http, appSettings, $location){

    var factory = {};

    factory.currentUser = {};
    factory.currentUser.favorites = {};

    factory.login = function(formData){
      // debugger;
      return $http.post(appSettings.apiURL + '/login', formData).success(function(response){
        // angular.copy(response, factory.currentUser);
        factory.getCurrentUser();
        $location.path('/account');
      });
    };

    factory.signup = function(formData){
      return $http.post(appSettings.apiURL + '/signup', formData).success(function(response){
        // angular.copy(response, factory.currentUser);
        factory.getCurrentUser();
        $location.path('/account');
      });
    };

    factory.getCurrentUser = function(){
      return $http.get(appSettings.apiURL + '/account/').success(function(response){
        angular.copy(response.user, factory.currentUser);
      });
    };

    factory.updateUser = function(formData){
      return $http.patch(appSettings.apiURL + '/account/edit', formData);
    };

    factory.logout = function(){
      return $http.get(appSettings.apiURL + '/logout').success(function(response){
        factory.currentUser = {};
        $location.path('/');
      });
    };

    return factory;
  };

  authFactory.$inject = ['$http', 'appSettings', '$location'];

  angular.module('tastemakerApp').factory('authFactory', authFactory);

})();
