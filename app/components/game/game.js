angular.module('PokemonApp.game', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/game', {
	    templateUrl: 'app/components/game/game.html',
	    controller: 'GameController'
		});
	}])
	.controller("GameController", ['$scope', '$log', '$location', function($scope, $log, $location) {
		$log.debug('Game controller initialized');
		$scope.changeTab = function(difficulty) {
			// change our tab
			if(difficulty === 'easy')
			{
				document.getElementById('PokeMedium').style.display = "none";
				document.getElementById('PokeHard').style.display = "none";
				document.getElementById('PokeEasy').style.display = "block";
				document.getElementById('tabMedium').className = "";
				document.getElementById('tabHard').className = "";
				document.getElementById('tabEasy').className = "active";
			}
			else if(difficulty === 'medium')
			{
				document.getElementById('PokeEasy').style.display = "none";
				document.getElementById('PokeHard').style.display = "none";
				document.getElementById('PokeMedium').style.display = "block";
				document.getElementById('tabEasy').className = "";
				document.getElementById('tabHard').className = "";
				document.getElementById('tabMedium').className = "active";
			}
			else if(difficulty === 'hard')
			{
				document.getElementById('PokeEasy').style.display = "none";
				document.getElementById('PokeMedium').style.display = "none";
				document.getElementById('PokeHard').style.display = "block";
				document.getElementById('tabEasy').className = "";
				document.getElementById('tabMedium').className = "";
				document.getElementById('tabHard').className = "active";
			}
		}
		$scope.pokemonList = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu"];
	}])
	.controller("PokemonEasyController", ['$scope', '$log', function($scope, $log) {
		var tempPokemonList = $scope.pokemonList;
		var correctAnswer = "";
		var loadNewPokemon = function() {	
			tempPokemonList = $scope.pokemonList;
			var correctPokeName = Math.floor(Math.random()*4);
			for(var i=0;i<4;i++) {
				var randomPokemon = randomPokemonFinder();
				if(i==0) {
					$scope.pokeName1 = randomPokemon.name;
				} else if(i==1) {
					$scope.pokeName2 = randomPokemon.name;
				} else if(i==2) {
					$scope.pokeName3 = randomPokemon.name;
				} else {
					$scope.pokeName4 = randomPokemon.name;
				}
				if(i==correctPokeName) {
					$scope.pokeImg = "./assets/img/"+randomPokemon.name+".png";
					correctAnswer = randomPokemon.name;
				}
				tempPokemonList.splice(randomPokemon.index,1);
			}
		}

		var randomPokemonFinder = function() {
			var pokemonListLen = tempPokemonList.length;
			var pokemonIndex = Math.floor(Math.random()*pokemonListLen);
			var pokemon = tempPokemonList[pokemonIndex];
			return {
				name: pokemon,
				index: pokemonIndex
			};
		};
		
		$scope.checkForAnswer = function(selection) {
			if(selection == correctAnswer) {
				alert("Correct");
			}
			else {
				alert("Wrong");
			}
			loadNewPokemon();
		}
		loadNewPokemon();
	}])
	.directive("pokemonEasy", [function() {
		return {
			restrict: 'A',
			replace: true,
			template: '<div>\
			<div>\
			<img ng-src="{{pokeImg}}">\
			</div>\
			<div>\
			<button ng-click="checkForAnswer(pokeName1)">{{pokeName1}}</button>\
			<button ng-click="checkForAnswer(pokeName2)">{{pokeName2}}</button>\
			<button ng-click="checkForAnswer(pokeName3)">{{pokeName3}}</button>\
			<button ng-click="checkForAnswer(pokeName4)">{{pokeName4}}</button>\
			</div>\
			</div>'
			// ,
			// scope: {
			// 	pokeImg: '@',
			// 	pokeName1: '@',
			// 	pokeName2: '@',
			// 	pokeName3: '@',
			// 	pokeName4: '@'
			// }
		};
	}])
	.controller("PokemonMediumController", ['$scope', '$log', function($scope, $log) {
		var pokemonListLen = $scope.pokemonList.length;
		var pokemonIndex = Math.floor(Math.random()*pokemonListLen);
		var pokemon = $scope.pokemonList[pokemonIndex];
		$log.info("The pokemon I got was :: " + pokemon);
		$scope.pokeImg = "abc";
		$scope.pokeName1 = "abc";
		$scope.pokeName2 = "abc";
		$scope.pokeName3 = "abc";
		$scope.pokeName4 = "abc";
	}])
	.directive("pokemonMedium", [function() {
		return {
			restrict: 'A',
			replace: true,
			template: '<div>Medium</div>'
		};
	}])
	.controller("PokemonHardController", ['$scope', '$log', function($scope, $log) {
		var pokemonListLen = $scope.pokemonList.length;
		var pokemonIndex = Math.floor(Math.random()*pokemonListLen);
		var pokemon = $scope.pokemonList[pokemonIndex];
		$log.info("The pokemon I got was :: " + pokemon);
		$scope.pokeImg = "abc";
		$scope.pokeName1 = "abc";
		$scope.pokeName2 = "abc";
		$scope.pokeName3 = "abc";
		$scope.pokeName4 = "abc";
	}])
	.directive("pokemonHard", [function() {
		return {
			restrict: 'A',
			replace: true,
			template: '<div>Hard</div>'
		};
	}]);