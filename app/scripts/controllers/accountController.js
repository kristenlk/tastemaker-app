'use strict';

(function accountControllerIIFE() {

  var AccountController = function(authFactory, appSettings) {

    var vm = this;
    vm.currentUser = authFactory.currentUser;

    function init(){
      authFactory.getCurrentUser();
    }

    init();

  };

  AccountController.$inject = ['authFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('accountController', AccountController);

})(angular);
