declare interface UiReducersI {
	setRoute?: { newRoute: string; params?: object } | string
	setMenuVisible?: boolean
}

/**
 * @description all the possible reducers actions and their expected type
 */
declare interface ReducersI extends UiReducersI {
	updateState?: Partial<AppStateI>
	setState?: AppStateI
}

/**
 * @description a mundane interface to correctly type the call arguments type
 * @todo refator with better typescript when knowledge is aquired
 */
declare interface AppReducerI {
	state: AppStateI
	call(arg0: ReducersI): void
}
