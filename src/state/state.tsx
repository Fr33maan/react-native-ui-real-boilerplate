import * as React from 'react'
import { initialAppState } from './states/initialState'
import * as reducers from './reducers/reducers'
import { error } from '@logger'

const { createContext, useReducer, useContext } = React
export const initialState = {
	...initialAppState,
}

/**
 * @description - get rid of the old redux convention, now an action get the following format { actionName: actionParams } which is more concise
 * @param {AppStateI} state - view hook usage
 * @param {ReducersI} action - view hook usage
 * @returns {AppStateI}
 */
export function appReducer(state: AppStateI, action: ReducersI): AppStateI {
	// TODO - work with immutable
	let newState = { ...state }
	for (const functionName of Object.keys(action)) {
		if (!reducers[functionName]) {
			error(`${functionName} is not a valid reducer`, action)
		} else {
			// false is a valid argument and should not be detected as no argument
			const argDefined = action[functionName] !== null && typeof action[functionName] !== 'undefined'

			// We allow to call an action without argument for a reducer will always set the value to true
			// eg. setLandscapeOrientation() or setPortraitOrientation()
			const actionState = argDefined ? reducers[functionName](action[functionName], state) : reducers[functionName](state)
			newState = { ...newState, ...actionState }
		}
	}
	return newState
}

export const AppContext = createContext({
	// Strange TS hack to get the first parameter ignored for unused parameters
	// https://stackoverflow.com/questions/38835001/skip-type-check-on-unused-parameters
	call: (_actions: ReducersI): void => undefined,
	state: initialState,
})

/**
 * @description The Provider object where global store is stored
 * @param {Object} props children is a JSX element
 */
export function createAppReducer(): AppReducerI {
	const [state, call] = useReducer(appReducer, initialState)
	return {
		state,
		call,
	}
}
export function ContextualizedApp({ children }) {
	const { state, call } = createAppReducer()
	return <AppContext.Provider value={{ state, call }}>{children}</AppContext.Provider>
}

export function getAppContext(): AppReducerI {
	return useContext(AppContext)
}
