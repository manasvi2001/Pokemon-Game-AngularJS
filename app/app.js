var app = angular.module('PokemonApp', ['ngRoute', 'PokemonApp.login']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/login'});
}]);