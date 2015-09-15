'use strict';

(function accountControllerIIFE() {

  var AccountController = function(authFactory, appSettings) {

    var vm = this;
    vm.currentUser = authFactory.currentUser;

    function init(){
      authFactory.getCurrentUser();
    }

    init();

    vm.updateUser = function(){
      authFactory.updateUser(vm.currentUser)
        .success(function() {
          console.log('User has been successfully updated.');
        })
        .error(function(data, status, headers, config) {
          console.log("Error updating user: " + status);
        });
      // vm.master = angular.copy(vm.currentCustomer);
    };

  };

  AccountController.$inject = ['authFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('accountController', AccountController);

})(angular);
