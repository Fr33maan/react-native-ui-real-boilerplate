export * from './uiReducers'

export function updateState(newState: AppStateI, state: AppStateI): AppStateI {
	return {
		...state,
		...newState,
	}
}

export function setState(newState: AppStateI): AppStateI {
	return {
		...newState,
	}
}
