(function navbarControllerIIFE() {

  var NavbarController = function(authFactory, appSettings) {

    var vm = this;

    vm.isLoggedIn = function(){
      // return ($cookies.get('connect.sid'));
      // return authFactory.currentUser.id !== undefined;
      return simpleStorage.get("loggedIn") !== undefined;
    }

    vm.logout = function(){
      // debugger;
      authFactory.logout();
    };

  };

  NavbarController.$inject = ['authFactory', '$location'];
  angular.module('tastemakerApp').controller('navbarController', NavbarController);

})(angular);
