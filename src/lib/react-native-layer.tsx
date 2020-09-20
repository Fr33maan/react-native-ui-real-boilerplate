import * as React from 'react'
const { useEffect, useRef } = React

const globalHolder = {}

export const Platform = {
	select: () => { },
}

export const StyleSheet = {
	create: (styleSheet) => {
		return styleSheet
	},
}

export class StatusBar extends React.Component {
	static currentHeight = 0
	render() {
		return (
			<div
				style={{
					position: 'fixed',
					backgroundColor: this.props.backgroundColor || 'white',
					width: '100%',
					color: this.props.backgroundColor ? 'white' : 'black',
				}}
			>
				Status bar 100%
			</div>
		)
	}
}

export const Dimensions = {
	width: null,
	height: null,
	get: () => ({
		width: Dimensions.width || window.innerWidth,
		height: Dimensions.height || window.innerHeight,
		outHeight: window.outerHeight,
		outWidth: window.outerWidth,
	}),
}

function detectFlex(props) {
	const newProps = { ...props, style: { ...props.style } }
	if (props.style && (props.style.flexDirection || props.style.flex || props.style.alignItems || props.style.justifyContent)) {
		newProps.style.display = 'flex'
		newProps.style.flexDirection = props.style.flexDirection || 'column'
	}

	newProps.style.boxSizing = 'border-box'
	return newProps
}

export function Image({ source, style }) {
	return <img src={source} style={style} />
}

export function View({ refName, style, children, id, testID, call = null }) {
	const ref = useRef()
	useEffect(() => {
		if (refName) {
			globalHolder[refName] = ref
			if (call) globalHolder.call = call
		}
	}, [])

	const flexStyle = detectFlex({ style })

	return (
		<div {...{ id }} style={flexStyle.style} ref={ref} id={testID}>
			{children}
		</div>
	)
}

export function Text(props) {
	const { style, children } = detectFlex(props)

	const { style: styleProp, children: childrenProp, testID, ...otherProps } = props

	if (!style.margin) {
		style.margin = 0
	}

	style.textOverflow = 'ellipsis'

	// if we have an array of elements we concatenate all
	if (children instanceof Array) {
		const childs = children
			.filter((child) => !!child)
			.map((elem) => {
				if (elem instanceof Array) {
					return elem.join('')
				} else {
					return elem
				}
			})
			.join('')

		return <p id={testID} style={style} dangerouslySetInnerHTML={{ __html: childs }} />
	}

	return <p id={testID} style={style} {...otherProps} dangerouslySetInnerHTML={{ __html: children }} />
}

export function TouchableWithoutFeedback(props) {
	const { style, children, onPress } = detectFlex(props)
	const USE_TOUCH = false
	// const USE_TOUCH = IS_MOBILE_BROWSER || IS_PWA
	return (
		<div
			style={{ ...style, cursor: 'pointer' }}
			// onTouchStart={onPressIn}
			onTouchEnd={() => {
				if (USE_TOUCH) {
					// onPressOut()
					onPress()
				}
			}}
			// onMouseDown={onPressIn}
			onMouseUp={() => {
				if (!USE_TOUCH) {
					// onPressOut()
					onPress()
				}
			}}
		>
			{children}
		</div>
	)
}

export function Pressable(props) {
	const { style, children, onPress, testID } = detectFlex(props)
	const USE_TOUCH = false
	// const USE_TOUCH = IS_MOBILE_BROWSER || IS_PWA
	return (
		<div
			style={{ ...style, cursor: 'pointer' }}
			id={testID}
			// onTouchStart={onPressIn}
			onTouchEnd={(e) => {
				if (USE_TOUCH) {
					// onPressOut()
					onPress(e)
				}
			}}
			// onMouseDown={onPressIn}
			onMouseUp={(e) => {
				if (!USE_TOUCH) {
					// onPressOut()
					onPress(e)
				}
			}}
		>
			{children}
		</div>
	)
}

export function TextInput(props) {
	const { style, onPress, children, onChangeText, value } = detectFlex(props)
	return (
		<input
			type="text"
			onChange={onChangeText}
			value={value}
			style={{ outline: 'none', borderWidth: 0, ...style }}
		/>
	)
}

export class WebView extends React.Component {
	constructor(props) {
		super(props)
		this.gameRef = React.createRef()
		globalHolder.gameRef = this.gameRef
	}

	componentDidMount() {
		this.props.onLayout()
	}

	render() {
		const { style, source } = detectFlex(this.props)
		style.border = 0
		return <iframe style={style} src={source.uri} ref={this.gameRef} />
	}
}

export const AsyncStorage = {
	getItem: async (itemName: string) => window.localStorage.getItem(itemName),
	setItem: async (itemName: string, item: string) => window.localStorage.setItem(itemName, item),
}
