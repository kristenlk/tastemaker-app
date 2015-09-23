(function authFactoryIIFE(){

  var authFactory = function($http, appSettings, $location){

    var factory = {};

    factory.currentUser = {};
    factory.currentUser.favorites = {};
    //factory.error;

    factory.login = function(formData){
      // debugger;
      return $http.post(appSettings.apiURL + '/login', formData).success(function(){
        // angular.copy(response, factory.currentUser);
        simpleStorage.set('loggedIn', true, {TTL: 72000000});
        factory.getCurrentUser();
        $location.path('/account/favorites');
      });
    };

    factory.signup = function(formData){
      return $http.post(appSettings.apiURL + '/signup', formData)
        .success(function(response){
          // Checking if response has an error in it. Workaround for error handling not functioning as I expected
          if (response.error) {
            return response.error;
          }
          simpleStorage.set('loggedIn', true, {TTL: 72000000});
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
        simpleStorage.flush();
        $location.path('/');
      });
    };

    return factory;
  };

  authFactory.$inject = ['$http', 'appSettings', '$location'];

  angular.module('tastemakerApp').factory('authFactory', authFactory);

})();
