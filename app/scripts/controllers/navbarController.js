(function navbarControllerIIFE() {

  var NavbarController = function(authFactory, appSettings, $cookies) {

    var vm = this;

    vm.isLoggedIn = function(){
      return ($cookies.get('connect.sid'));
    }

    vm.logout = function(){
      debugger;
      authFactory.logout();
    };

  };

  NavbarController.$inject = ['authFactory', '$location', '$cookies'];
  angular.module('tastemakerApp').controller('navbarController', NavbarController);

})(angular);
