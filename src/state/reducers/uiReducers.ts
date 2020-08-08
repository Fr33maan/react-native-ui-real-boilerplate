export function setRoute(actionParams: { newRoute: string; params: object }): Partial<AppStateI> {
	let newRoute: string, params: any
	if (typeof actionParams === 'string') {
		newRoute = actionParams
	} else {
		newRoute = actionParams.newRoute
		params = actionParams.params
	}

	// TODO - if (!Screen) throw new Error(`${currentRoute} is not a valid route`)
	return {
		currentRoute: newRoute,
		routeParams: params,
	}
}

export function setMenuVisible(isMenuVisible: boolean): Partial<AppStateI> {
	return {
		menuVisible: isMenuVisible,
	}
}
