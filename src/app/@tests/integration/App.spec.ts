// https://medium.com/@mtiller/testing-react-components-using-storybook-and-cypress-1689a27f55aa

describe('Full app rendering', () => {
	beforeEach(() => {
		// Visiting our app before each test removes any state build up from
		// previous tests. Visiting acts as if we closed a tab and opened a fresh one.
		cy.visit('/')
	})
	// Let's build some tests around the DateRangePicker
	context('App is correctly render', () => {
		it('App has a navigation-menu and a navigation-screen', () => {
			cy.getApp().find('#navigation-menu').its('length').should('equal', 1)
			cy.getApp().find('#navigation-screen').its('length').should('equal', 1)
		})
	})
})
