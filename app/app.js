var app = angular.module('PokemonApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);