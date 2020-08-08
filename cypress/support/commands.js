// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getStory', () => {
	// TODO - DOC https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
	/*
		.get('iframe[id="storybook-preview-iframe"]', { log: false })
		.its('0.contentDocument', { log: false })
		.should('exist')
		.its('body', { log: false })
		.should('not.be.undefined')
	*/

	// get the iframe > document > body
	// and retry until the body element is not empty
	cy.log('getStory - it takes 500ms')

	return cy
		.wait(500, { log: false })
		.get('iframe[id="storybook-preview-iframe"]', { log: false })
		.then(($iframe) => {
			const $body = $iframe.contents().find('body')

			return cy.wrap($body, { log: false })
		})
})

Cypress.Commands.add('getApp', () => {
	// get the iframe > document > body
	// and retry until the body element is not empty

	return cy
		.getStory()
		.find('iframe[id="iframe-0"]', { log: false })
		.then(($iframeApp) => {
			const $bodyApp = $iframeApp.contents().find('body')

			return cy.wrap($bodyApp, { log: false })
		})
})

// TODO - new command
// function iget(doc, selector) {
// return cy.wrap(doc.find(selector))
// }
