'use strict';
var app = angular.module('transactionHistoryApp', ['underscore']);
app.controller('transactionHistoryController', function($scope, $http, _) {

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

	//TODO: Haven't tested with angularjs
	function convertUnits(value, type, showUnits, handler) {
		var result = value;

		if (_.isNull(showUnits) || _.isUndefined(showUnits)) {
			showUnits = false;
		}

		switch (type.toLowerCase()) {
			case 'cent':
			case 'cents':
				// showUnits is redundant in this use case.
				// Multiple purposing showUnits to determine how many decimals we want to show.
				var decimals = _.isBoolean(showUnits) ? 2 : showUnits;
				result = this.convertCentsToDollars(value, 1, decimals);
				break;
			case '$':
			case 'dollar':
				// No change to value - server provided data in correct format.
				// Force to 2 decimal places, that means 50 -> $50.00.
				value = parseFloat(value);
				if (value < 0) {
					value = -1 * value;
					result = '$' + (value || 0).toFixed(2) + '(CR)';
				} else {
					result = '$' + (value || 0).toFixed(2);
				}
				break;
			case 'showdecimals':
				var decimals = _.isBoolean(showUnits) ? 2 : showUnits;
				result = parseFloat(value).toFixed(decimals);
				break;
			default:
				result = showUnits ? [result, type].join(' ') : result;
				break;
		}
		return result;
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
