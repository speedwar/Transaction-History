Feature: Transaction History Widget

	@desktop
	Scenario: Transaction History View Test
		Given I have loaded mock "assets/json/transactionHistory.json"
		There will be an element "topMenu"
		There will be an element "breadcrumbs"
		There will be an element "searchField"
		There will be an element "transactionHistoryContent"
		There will be an element "footer"

	@desktop
	Scenario: Transaction History Feature Test
		Given I have loaded mock "assets/transactionHistory.json"
		Then there will be an element for "container"
		And I click "btnLoadmore"
		Then there will be "7" elements "listTransaction"
		When I type "lorem" into "inputSearch"
		And I click "btnSearch"
		Then there will be "2" elements "listTransaction"

	@mobile
	Scenario: Transaction History Mobile View Test
		Given I have loaded mock "assets/transactionHistory.json"
		Then there will be an element for "container"
		#Add more tests

	@mobile
	Scenario: Transaction History Mobile Menu Test
		Given I have loaded mock "assets/transactionHistory.json"
		Then there will be an element for "container"
		#Add more tests such as mobile menu
