import React, { useReducer, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@storybook/react/demo'
import { deviceMatrix } from 'config/deviceMatrix'
import { AppWithContext } from '../index'
import { ContextualizedApp, getAppContext } from '@state'

export default { title: 'App' }

function getScaledDevice({ width, height, size }) {
	const screenInches = 24
	const diagonalInPixels = Math.sqrt(Math.pow(screen.width, 2) + Math.pow(screen.height, 2))
	const screenPpinch = diagonalInPixels / screenInches
	const orientation = 'portrait'

	const deviceScreenWidth = width
	const deviceScreenHeight = height
	const deviceScreenSize = size
	const deviceDiagonalInPixels = Math.sqrt(Math.pow(deviceScreenWidth, 2) + Math.pow(deviceScreenHeight, 2))
	const deviceScreenPpinch = deviceDiagonalInPixels / deviceScreenSize

	const scaledWidth = (deviceScreenWidth * screenPpinch) / deviceScreenPpinch
	const scaledHeight = (deviceScreenHeight * screenPpinch) / deviceScreenPpinch

	const iframeWidth = orientation === 'landscape' ? scaledHeight : scaledWidth
	const iframeHeight = orientation === 'landscape' ? scaledWidth : scaledHeight

	return {
		height: iframeHeight,
		width: iframeWidth,
		ratio: Math.round((deviceScreenPpinch / screenPpinch) * 100) / 100,
	}
}

function Device({ device, index, app }) {
	const [ref, setRef] = useState(null)
	const mountNode = ref?.contentWindow?.document.body

	// Remove the iframe body margin
	if (mountNode) {
		mountNode.style.margin = '0px'
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginBottom: '20px',
			}}
			id={`iframeHolder-${index}`}
		>
			<div style={{ marginBottom: '5px' }}>{device.name}</div>
			<iframe
				id={`iframe-${index}`}
				style={{
					width: `${getScaledDevice(device).width}px`,
					height: `${getScaledDevice(device).height}px`,
					border: 0,
				}}
				ref={setRef}
				name={`${device.name} - ${getScaledDevice(device).ratio}`}
			>
				{mountNode && createPortal(React.Children.only(app), mountNode)}
			</iframe>
		</div>
	)
}

function Devices() {
	const app = AppWithContext()
	return (
		<>
			{deviceMatrix.map((device, index) => (
				<Device device={device} index={index} key={index} app={app} />
			))}
		</>
	)
}

export function app() {
	return (
		<ContextualizedApp>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr) )' }}>
				<Devices />
			</div>
		</ContextualizedApp>
	)
}
