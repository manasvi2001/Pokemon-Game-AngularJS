angular.module('PokemonApp.login', ['ngRoute', 'PokemonApp.signup'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/login', {
	    templateUrl: 'app/components/login/login.html',
	    controller: 'LoginController'
		});
	}])
	.controller("LoginController", ['$scope', '$log', '$location', 'UserService', function($scope, $log, $location, UserService) {
		$log.debug('Login controller initialized');
		$scope.input = {
			username: '',
			password: ''
		}
		$scope.login = function() {
			UserService.loginUser($scope.input.username, $scope.input.password)
		}
	}]);