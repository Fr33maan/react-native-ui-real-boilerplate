import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Dimensions } from 'react-native'
import { deviceMatrix } from './deviceMatrix'
import { AppWithContext } from '@app'
import '@lib/styles/global.scss'

function getScaledDevice({ width, height, size }) {
	// TODO - create input for screen size
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

	// TODO - landscape orientation
	//@ts-ignore in todo
	const iframeWidth = orientation === 'landscape' ? scaledHeight : scaledWidth
	//@ts-ignore in todo
	const iframeHeight = orientation === 'landscape' ? scaledWidth : scaledHeight

	return {
		height: iframeHeight,
		width: iframeWidth,
		ratio: Math.round((deviceScreenPpinch / screenPpinch) * 100) / 100,
	}
}

export function Device({ device = deviceMatrix[0], index = 0, children }) {
	const [ref, setRef] = useState(null)
	const mountNode = ref?.contentWindow?.document.body

	// Remove the iframe body margin
	// add stylesheet to iframe
	if (mountNode) {
		mountNode.style.margin = '0px'

		// Get the custom stylesheet lib/styles/global.scss from the storybook iframe
		const customStyleSheet = Array.prototype.slice.call(document.getElementsByTagName('style'))
			.find(stylesheet => stylesheet.innerHTML.includes('/* TO IMPORT IN IFRAME */'))

		// clone the style node in the device iframe so we get all the fontFamilies
		mountNode.previousSibling.appendChild(customStyleSheet.cloneNode(true))
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
			<div style={{ marginBottom: '5px', color: 'white', fontFamily: 'Roboto' }}>{device.name}</div>
			<iframe
				id={`iframe-${index}`}
				className="phoneContainer"
				style={{
					width: `${getScaledDevice(device).width}px`,
					height: `${getScaledDevice(device).height}px`,
					border: 0,
				}}
				ref={setRef}
				name={`${device.name} - ${getScaledDevice(device).ratio}`}
			>
				{mountNode && createPortal(React.Children.only(children), mountNode)}
			</iframe>
		</div>
	)
}

export function DeviceWithApp({ device = deviceMatrix[5], index = 0, children }) {
	// @ts-ignore - react-native-layer adds width and height properties
	Dimensions.width = getScaledDevice(device).width
	// @ts-ignore - react-native-layer adds width and height properties
	Dimensions.height = getScaledDevice(device).height

	return (
		<div style={{ display: 'flex', paddingLeft: 20 }}>
			<Device device={device} index={index}>
				{children}
			</Device>
		</div>
	)
}

export function Devices() {
	return (
		<>
			{deviceMatrix.map((device, index) => (
				<Device device={device} index={index} key={index}>
					<AppWithContext />
				</Device>
			))}
		</>
	)
}
