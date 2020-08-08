import { Dimensions } from 'react-native'
import * as Screens from '@screens'
const { width, height } = Dimensions.get('window')

/**
 * @description
 */
export const ui: UiStateI = {
	isLandscape: width > height,
	currentRoute: Object.keys(Screens)[0],
	routeParams: {},
	menuVisible: true,
}
