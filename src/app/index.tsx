import React from 'react'
import { View } from 'react-native'
import { ContextualizedApp } from '@state'
import { Navigation } from '@navigation'

export function AppWithContext() {
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
