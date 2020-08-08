// Pure implementation of reducers with the minimal set of reducers

export function updateState(newState: AppStateI, state: AppStateI): AppStateI {
	return {
		...state,
		...newState,
	}
}

export function setUpdated(state: AppStateI): AppStateI {
	return {
		...state,
		updated: true,
	}
}
