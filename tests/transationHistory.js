var _ = require('lodash-compat'),
	fs = require('fs');

// requireJS needs to be implemented
module.exports = function () {
	// Load standard world object to be 'this' in steps.
	this.World = require('../tasks/world.js').World;

	// Add common steps to this suite, using this suite as the scope.
	_.bind(require('../tasks/steps.js'), this)();

	this.Before(function (scenario, callback) {

		// Semantic selectors for inspecting the widget.
		this.widget = { container: '.transactionHistoryApp' };

		this.widget.topMenu = this.widget.container + ' .navigation-top';

		callback();

	});


};
