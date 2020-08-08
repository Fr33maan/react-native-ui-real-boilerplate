declare interface AppStateI extends UiStateI {}

declare interface UiStateI {
	isLandscape: boolean
	currentRoute: string
	routeParams: object
	menuVisible: boolean
}
