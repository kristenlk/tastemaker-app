(function findRestaurantControllerIIFE(){

  var FindRestaurantController = function(findRestaurantFactory, appSettings){
    var vm = this;
    vm.appSettings = appSettings;
    vm.formPhase = 1;

    // vm.restaurants = []; ??

    function init(){
      findRestaurantFactory.getRestaurants();
    }

    init();

    vm.nextPhase = function(){
      vm.formPhase++;
    }

    vm.previousPhase = function(){
      vm.formPhase--;
    }

  };

  FindRestaurantController.$inject = ['findRestaurantFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('findRestaurantController', FindRestaurantController);

})();
