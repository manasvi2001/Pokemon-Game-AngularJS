var app = angular.module('PokemonApp', ['ngRoute', 'PokemonApp.login', 'PokemonApp.signup', 'PokemonApp.game']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/login'});
}]);