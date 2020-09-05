import React from 'react'
import { AppWithContext } from '@app'
import { ContextualizedApp } from '@state'
import { Device, Devices } from '@lib/phoneStories'
import { deviceMatrix } from '@lib/phoneStories/deviceMatrix'
// import { Button } from '@storybook/react/demo'
// import 'lib/styles/global.scss'

export default { title: 'App' }

export function app() {
	return (
		<div style={{ display: 'flex', paddingLeft: 20 }}>
			<Device device={deviceMatrix[0]} index={0}>
				<ContextualizedApp>
					<AppWithContext />
				</ContextualizedApp>
			</Device>
		</div>
	)
}

export function apps() {
	return (
		<ContextualizedApp>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr) )' }}>
				<Devices />
			</div>
		</ContextualizedApp>
	)
}

function IndependantDevices() {
	return (
		<>
			{deviceMatrix.map((device, index) => (
				<ContextualizedApp key={index}>
					<Device device={device} index={index}>
						<AppWithContext />
					</Device>
				</ContextualizedApp>
			))}
		</>
	)
}

export function independantApps() {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr) )' }}>
			<IndependantDevices />
		</div>
	)
}
