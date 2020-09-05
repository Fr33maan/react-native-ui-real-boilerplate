import * as React from 'react' //TODO replace * as React by React
import { View, Text } from 'react-native'
import { getAppContext } from '@state'
import * as Screens from '@screens'
import { Button } from '@components'
import { getNativeStyle } from '@rnweb/style'

export function Navigation() {
	const {
		state: { currentRoute, routeParams, menuVisible },
		call,
	}: AppReducerI = getAppContext()

	const Screen = Screens[currentRoute]

	const icons = {
		Screen1: 'star',
		Screen2: 'people',
		Screen3: 'people',
	}

	return (
		<View testID="navigation-holder">
			{menuVisible && (
				<View testID="navigation-menu">
					{Object.entries(Screens).map((menuEntries, index) => (
						<View key={index}>
							<Button
								key={index}
								style={getNativeStyle({ width: '20vh', height: '20vh' })}
								onPress={() => call({ setRoute: menuEntries[0] })}
								testID={menuEntries[0]}
							>
								{menuEntries[0]}
							</Button>
							<Text>{icons[menuEntries[0]]}</Text>
						</View>
					))}
				</View>
			)}

			<View testID="navigation-screen">
				<View>{Screen && <Screen routeParams={routeParams} testID={currentRoute} />}</View>
			</View>
		</View>
	)
}
