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
          console.log('User has been successfully updated.');
          vm.updateEmailErrors = false;
          vm.updateEmailSuccess = true;

        })
        .error(function(data, status, headers, config) {
          console.log("Error updating user: " + status);
          vm.updateEmailErrors = true;
          vm.updateEmailSuccess = false;
        });
      // vm.master = angular.copy(vm.currentCustomer);
    };

  };

  AccountController.$inject = ['authFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('accountController', AccountController);

})(angular);
