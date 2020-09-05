import React from 'react'
import { View, Dimensions } from 'react-native'
import { ContextualizedApp } from '@state'
import { Navigation } from '@navigation'
import { IS_STORYBOOK } from '@config'

export function AppWithContext() {
	if (IS_STORYBOOK) {
		// TODO - find a way to dynamically choose the iframe
		const node = document.getElementById('iframe-0')
		// @ts-ignore
		Dimensions.width = Math.floor(Number(node.style.width.replace('px', '')))
		// @ts-ignore
		Dimensions.height = Math.floor(Number(node.style.height.replace('px', '')))
		console.log(Dimensions.get('window'))
	}

	return (
		<View
			style={{
				height: '100%',
				width: '100%',
				backgroundColor: 'green',
			}}
		>
			<Navigation />
		</View>
	)
}

export function App() {
	return (
		<ContextualizedApp>
			<AppWithContext />
		</ContextualizedApp>
	)
}
