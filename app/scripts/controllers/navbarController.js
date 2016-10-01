(function navbarControllerIIFE() {
  var NavbarController = function(authFactory, appSettings) {
    var vm = this;

    vm.isLoggedIn = function(){
      return simpleStorage.get("loggedIn") !== undefined;
    }

    vm.logout = function(){
      authFactory.logout();
    };
  };

  NavbarController.$inject = ['authFactory', '$location'];
  angular.module('tastemakerApp').controller('navbarController', NavbarController);

})(angular);
