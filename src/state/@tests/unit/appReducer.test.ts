import { appReducer, initialState } from '@state'
import * as logger from '@logger'
import * as reducers from '../../reducers/reducers'

/**
 * # README
 * For list of reducers, see reducers/__mocks__reducers.ts
 * updateState() - will merge oldState and newState
 * setUpdated() - will always set `updated` property in state to `true`
 */

jest.mock('../../reducers/reducers')
jest.mock('@logger')

describe('state manager', () => {
	afterEach(() => {
		logger.error.mockReset()
	})

	test('call error and return the exact same state than before', () => {
		const newState = appReducer(initialState, { nonExistantReducer: 'arbitraryValue' })
		expect(logger.error).toHaveBeenCalled()

		expect(newState).toEqual(initialState)
	})

	test('set the new state when calling an existing reducer', () => {
		const newState = appReducer(initialState, {
			updateState: {
				currentRoute: 'newRoute',
			},
		})
		expect(logger.error).not.toHaveBeenCalled()

		expect(newState).toEqual({
			...initialState,
			currentRoute: 'newRoute',
		})
	})

	test('`false` as a value is valid', () => {
		const newState = appReducer(initialState, {
			updateState: {
				currentRoute: false,
			},
		})
		expect(logger.error).not.toHaveBeenCalled()

		expect(newState).toEqual({
			...initialState,
			currentRoute: false,
		})
	})

	test('`undefined` as a value is valid and call the reducer with only the last state as argument', () => {
		const spy = jest.spyOn(reducers, 'setUpdated')

		const newState = appReducer(initialState, {
			setUpdated: undefined,
		})
		expect(logger.error).not.toHaveBeenCalled()

		expect(spy).toHaveBeenCalledWith(initialState)

		expect(newState).toEqual({
			...initialState,
			updated: true,
		})
	})
})
