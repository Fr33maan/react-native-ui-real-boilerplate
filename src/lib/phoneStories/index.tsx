import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { deviceMatrix } from './deviceMatrix'
import { AppWithContext } from '@app'

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
				{mountNode && createPortal(React.Children.only(children), mountNode)}
			</iframe>
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
