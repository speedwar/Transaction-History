var app = angular.module('transactionHistoryApp', []);
app.controller('transactionHistoryController', function($scope, $http) {
	'use strict';

	//cachebuster: Always fetch the file from the server instead of from the cache.
	var startTime = new Date().getTime(),
		cachebuster = '?cachebuster=' + startTime,
		jsonPath = 'assets/json/';

	//TODO: JS - these values should be coming from config.json?
	var initialTransactions = 5,
		transactionsIncrement = 5;

	$scope.transactionHistory = { "path": "transactionHistory.json" };
	$scope.userInput = null;
	$scope.search = {};
	$scope.quantity = initialTransactions;

	//Put all functions here
	function initialise() {
		transactionHistoryRequest();
		//$scope.$watch();
	}

	function transactionHistoryRequest () {
		var fetchData = $scope.transactionHistory.path;
		$http.get(jsonPath + fetchData + cachebuster, false)
		.success(function(response) {
			$scope.transactionHistoryList = response.transactionHistory;
			return false;
		})
		.error(handleFailure.bind(this));
	}

	function handleFailure(response) {
		//TODO: Show server response error message
		//Ex: $scope.errorMessage = response.error;
		//console.log('error');
		return false;
	}

	$scope.descriptionSearch = function() {
		/**
			* TODO: JS - Write better search key validation rules
			* TODO: UX-Enhancement
			* Show no search result message
			*/
		if ($scope.userInput === null) {
			return false;
		}

		$scope.search.description = $scope.userInput;
	}

	$scope.loadMoreList = function() {
		initialTransactions = (initialTransactions + transactionsIncrement);
		$scope.quantity = initialTransactions;
		/**
			* TODO: UX-Enhancement
			* Check length of transactions and throw message when reaches last transaction.
			* Implement ngAnimate slideDown
			*/
	}

	//Run
	initialise()
});
