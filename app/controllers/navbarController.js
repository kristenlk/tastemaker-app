(function navbarControllerIIFE() {

  var NavbarController = function(authFactory, appSettings, $cookies) {

    var vm = this;

    vm.isLoggedIn = function(){
      return ($cookies.get('connect.sid'));
    }

    // vm.logOut = function(){

    // };

  };

  NavbarController.$inject = ['$location', 'authFactory', '$cookies'];
  angular.module('tastemakerApp').controller('navbarController', NavbarController);

})(angular);
