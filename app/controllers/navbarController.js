(function navbarControllerIIFE() {

  var NavbarController = function(authFactory, appSettings, $cookies) {

    var vm = this;

    vm.isLoggedIn = function(){
      return ($cookies.get('connect.sid'));
    }

    vm.logout = function(){
      authFactory.logout();
    };

  };

  NavbarController.$inject = ['$location', 'authFactory', '$cookies'];
  angular.module('tastemakerApp').controller('navbarController', NavbarController);

})(angular);
