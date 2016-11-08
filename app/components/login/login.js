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
			if(UserService.loginUser($scope.input.username, $scope.input.password)) {
				$log.debug('Login Successful');
				$location.path('/game');
			} else {
				$log.error('Login not successful. User not found or password incorrect');
			}
		}
	}]);