'use strict';

(function favoritesControllerIIFE() {
  var FavoritesController = function(favoritesFactory, appSettings) {
    var vm = this;
    vm.favorites = favoritesFactory.favorites;

    function init(){
      favoritesFactory.getFavorites().then(function(favorites){
        for (var i = 0; i < vm.favorites.length; i++) {
          vm.favorites[i].restaurant.display_address = JSON.parse(vm.favorites[i].restaurant.display_address);
        }
      });
    }

    init();

    vm.deleteFromFavorites = function(id) {
      // Grabs id of itself. Work-around because passing in {{fav.favorite.id}} into favCtrl.deleteFromFavorites() in the view wasn't working
      // var favoriteToDelete = +event.target.id.substr(3, event.target.id.length);
      favoritesFactory.deleteFromFavorites(id)
        .success(function(){
          init();
        })
        .error(function() {
          console.log('Error deleting favorite.');
        });
    };
  };

  FavoritesController.$inject = ['favoritesFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('favoritesController', FavoritesController);

})(angular);
