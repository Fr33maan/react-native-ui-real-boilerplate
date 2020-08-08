declare namespace Cypress {
	interface Chainable {
		/**
		 * get the app document context inside the iframe, inside the storybook iframe
		 */
		getStory(): Chainable<Element> // get the story document context contained inside the story iframe
		getApp(): Chainable<Element> // get the app document context inside the iframe, inside the storybook iframe
	}
}
