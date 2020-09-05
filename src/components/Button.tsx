import * as React from 'react'
import { Pressable, Text, GestureResponderEvent } from 'react-native'
import { getNativeStyle as getStyle } from '@rnweb/style'

const s = {
	buttonHolder: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	buttonText: {
		textAlign: 'center',
	},
}

export enum ETheme {
	DARK = 'dark',
	LIGHT = 'light',
}

export function Button({
	onPress,
	children,
	style,
	theme = ETheme.DARK,
	testID,
}: {
	onPress: (event: GestureResponderEvent) => void
	children: string | React.Component
	style?: StyleSheet
	theme?: ETheme
	testID?: string
}) {
	const color = theme === 'dark' ? 'white' : 'black'
	const backgroundColor = theme === 'dark' ? 'black' : 'white'
	return (
		<Pressable onPress={onPress} style={getStyle({ ...style, backgroundColor, ...s.buttonHolder })} testID={testID}>
			{typeof children === 'string' ? <Text style={getStyle({ color, ...s.buttonText })}>{children}</Text> : children}
		</Pressable>
	)
}
