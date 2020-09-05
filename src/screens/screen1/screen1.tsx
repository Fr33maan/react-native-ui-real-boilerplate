import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '@components'
import { getNativeStyle } from '@rnweb/style'

export function Screen1() {
	return (
		<View
			style={{
				height: '100%',
				width: '100%',
				backgroundColor: 'orange',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Button
				style={getNativeStyle({
					width: '50vw',
					height: '50vw',
				})}
			>
				screen 1
			</Button>
		</View>
	)
}
