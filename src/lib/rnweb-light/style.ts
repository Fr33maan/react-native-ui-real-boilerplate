import { StyleSheet, Dimensions, StatusBar } from 'react-native'
import { syncControlFlow } from '../controlFlow'

export function getNativeNestedStyle(styleSheet: any) {
	let finalStyle = {}
	for (const styleName in styleSheet) {
		let activeStyle = { ...styleSheet[styleName] }
		for (const prop in activeStyle) {
			// Will update the activeStyle object
			syncControlFlow(
				{ activeStyle, prop, val: activeStyle[prop] },
				{
					getSingleProperty,
					getBorder,
					getBorderBottom,
					getBorderRadius,
					removeNonRnProperties,
				},
			)
		}
		finalStyle[styleName] = { ...activeStyle }
	}

	return StyleSheet.create({ ...finalStyle })
}

export function vw(percent: number = 1) {
	const { width } = Dimensions.get('window')
	return Math.round((percent * width) / 100)
}

export function vh(percent: number = 1) {
	const height = Dimensions.get('window').height - StatusBar.currentHeight
	return Math.round((percent * height) / 100)
}

// TODO - inspect how its working
export function getTransform({ prop, activeStyle }) {
	if (prop === 'transform' && typeof val === 'string') {
		const transform = val.match(/(\w+)\(((-?\d+)(deg|px))\)/)
		if (transform[4] === 'px') {
			activeStyle.transform = [{ [transform[1]]: parseInt(transform[3]) }]
		} else {
			activeStyle.transform = [{ [transform[1]]: transform[2] }]
		}
	}
}

// TODO - wait for future if needed
// TODO - test
export function getBackground({ prop, activeStyle }) {
	const val = activeStyle[prop]
	if (prop === 'background') {
		if (val.search('gradient')) {
			const gradientParts = val.match(/((#[\d\w]+)|(rgba?\(\d+, ?\d+, ?\d+,? ?[\d.]*\))) (\d+)%/g)
			const gradientColors = []
			const gradientStops = []
			for (const part of gradientParts) {
				gradientColors.push(part.match(/(#[\w\d]+)|(rgba?\(\d+, ?\d+, ?\d+,? ?[\d.]*\))/)[0])
				gradientStops.push(parseInt(part.match(/(\d+)%/)[0]) / 100)
			}
			// additionalInfos.gradientColors = gradientColors
			// additionalInfos.gradientStops = gradientStops

			delete activeStyle[prop]
		}
	}
}

/**
 * @description accept an input of the following formats and transform it to RN styleSheet format
 * pixels values
 * 4px
 * 4px 8px
 * 4px 8px 7px
 * 4px 5px 6px 7px
 *
 * integers
 * 4
 * 4 5
 * 4 5 6
 * 4 5 6 7
 *
 * view width
 * 10vw
 *
 * @TODO - FIX
 * getBorderRadiusStyle is fault tolerant because of integer detection
 * 4pp 7ps 8mdsfmdfmg => 4px 7px 8px
 *
 * @param param0
 *
 */
export function getBorderRadius({ prop, activeStyle, _vw = vw }) {
	if (prop === 'borderRadius') {
		const val = activeStyle[prop]

		if (!Number.isInteger(val)) {
			if (val.match(/px/g)) {
				const vals = val.match(/(\d+)(px)?/g)
				if (vals.length === 1) {
					activeStyle.borderRadius = parseInt(vals[0])
					return
				}

				const topLeft = vals[0]?.replace('px', '')
				const topRight = vals[1]?.replace('px', '')
				const bottomRight = vals[2]?.replace('px', '')
				const bottomLeft = vals[3]?.replace('px', '')

				// Throw an error if we have wront format
				if (
					(topLeft && isNaN(parseInt(topLeft))) ||
					(topRight && isNaN(parseInt(topRight))) ||
					(bottomRight && isNaN(parseInt(bottomRight))) ||
					(bottomLeft && isNaN(parseInt(bottomLeft)))
				) {
					throw new Error(`borderRadius malformated "${val}"`)
				}

				activeStyle.borderTopLeftRadius = parseInt(topLeft)
				activeStyle.borderTopRightRadius = parseInt(topRight)
				activeStyle.borderBottomRightRadius = parseInt(bottomRight) || parseInt(topLeft)
				activeStyle.borderBottomLeftRadius = parseInt(bottomLeft) || parseInt(topRight)

				// test borderRadius prop is deleted from activeStyle
				delete activeStyle[prop]

				// test not match vw
			} else if (val.match(/vw/g)) {
				// Global means only one value is used as borderRadius
				const global = val.split(' ').length === 1

				if (global) {
					activeStyle.borderRadius = _vw(parseInt(val.replace('vw', '')))
				}
			} else if (Number.isInteger(parseInt(val))) {
				return { activeStyle, prop }
				return activeStyle
			} else if (isNaN(parseInt(val))) {
				throw new Error(`borderRadius malformated "${val}"`)
			} else {
				throw new Error(`borderRadius malformated "${val}"`)
			}
		}
	}
}

export function getBorder({ prop, activeStyle }) {
	if (prop === 'border') {
		const val = activeStyle[prop]
		const width = parseInt(val.match(/(\d+)px/)[1])

		// TODO - support all RN format
		// https://reactnative.dev/docs/colors
		const color = val.match(/(#[a-fA-F\d]{3,6})/)

		if (!color?.length || !color[1] || (color[1].length !== 4 && color[1].length !== 7)) {
			throw new Error(`border malformated "${val}"`)
		}

		activeStyle.borderWidth = width
		activeStyle.borderColor = color[1]
		activeStyle.borderStyle = 'solid'

		delete activeStyle[prop]
	}
}

// TODO - expand to all sides
// TODO - test
export function getBorderBottom({ prop, activeStyle }) {
	const val = activeStyle[prop]
	if (prop === 'borderBottom') {
		if (val) {
			const width = parseInt(val.match(/(\d+)px/)[1])
			const color = val.match(/(#\d{3,6})/)[1]

			activeStyle.borderBottomWidth = width
			activeStyle.borderBottomColor = color
		}

		delete activeStyle[prop]
	}
}

export function getSingleProperty({ prop, activeStyle }) {
	const singleProperties = [
		'width',
		'height',
		'top',
		'bottom',
		'left',
		'right',
		'padding', // TODO CSS notation -> 3px 2px 1px 5px
		'paddingLeft',
		'paddingRight',
		'paddingBottom',
		'paddingTop',
		'margin', // TODO CSS notation -> 3px 2px 1px 5px
		'marginLeft',
		'marginRight',
		'marginBottom',
		'marginTop',
		'fontSize'
	]

	const val = activeStyle[prop]

	if (singleProperties.includes(prop) && !Number.isInteger(val)) {
		const sign = val.match(/^-/) ? -1 : 1
		if (val?.match(/vw/)) {
			const percent = parseFloat(val.match(/([\d.]+)vw/)[1])
			activeStyle[prop] = vw(percent) * sign
		} else if (val?.match(/vh/)) {
			const percent = parseFloat(val.match(/([\d.]+)vh/)[1])
			activeStyle[prop] = vh(percent) * sign
		} else if (val?.match(/px/)) {
			activeStyle[prop] = parseInt(val.replace('px', '')) * sign
		}
	}
}

/**
 *
 * TODO - get fontSize in `em` unit on NATIVE
 * Find RN default fontSize - maybe inspect in simulator and compare with device pixelRatio
 * Also scale fontSize in web in device frame according to device pixelRatio
 * http://reactnative.dev/docs/pixelratio.html
 * https://github.com/aMarCruz/react-native-text-size
 * https://developer.mozilla.org/fr/docs/Web/CSS/font-size
 */

export function removeNonRnProperties({ prop, activeStyle }) {
	// https://www.w3schools.com/cssref/css3_pr_user-select.asp
	const nonRnProperties = ['userSelect']

	if (nonRnProperties.includes(prop)) {
		delete activeStyle[prop]
	}

	if (prop === 'position' && activeStyle[prop] === 'relative') {
		delete activeStyle[prop]
	}
}
