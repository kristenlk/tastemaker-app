'use strict';

(function accountControllerIIFE() {
  var AccountController = function(authFactory, appSettings) {
    var vm = this;
    vm.currentUser = authFactory.currentUser;

    // To show error / success alerts in account view
    vm.updateEmailErrors = false;
    vm.updateEmailSuccess = false;

    function init(){
      authFactory.getCurrentUser();
      vm.updateEmailErrors = false;
      vm.updateEmailSuccess = false;
    }

    init();

    vm.updateUser = function(){
      authFactory.updateUser(vm.currentUser)
        .success(function() {
          vm.updateEmailErrors = false;
          vm.updateEmailSuccess = true;

        })
        .error(function(data, status, headers, config) {
          vm.updateEmailErrors = true;
          vm.updateEmailSuccess = false;
        });
    };
  };

  AccountController.$inject = ['authFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('accountController', AccountController);

})(angular);
