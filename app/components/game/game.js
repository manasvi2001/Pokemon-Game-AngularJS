angular.module('PokemonApp.game', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/game', {
	    templateUrl: 'app/components/game/game.html',
	    controller: 'GameController'
		});
	}])
	.controller("GameController", ['$scope', '$log', '$location', function($scope, $log, $location) {
		$log.debug('Game controller initialized');
	}]);