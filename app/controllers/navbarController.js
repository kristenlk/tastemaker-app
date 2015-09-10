(function navbarControllerIIFE() {

  var NavbarController = function(authFactory, appSettings) {

    this.login = authFactory.login;
    this.signup = authFactory.signup;
    this.logout = authFactory.logout;

  };

  NavbarController.$inject = ['$location', 'authFactory'];
  angular.module('tastemakerApp').controller('navbarController', NavbarController);

})(angular);
