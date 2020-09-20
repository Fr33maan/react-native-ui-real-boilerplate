import React from 'react'
import ContentLoader from 'react-content-loader'
import { Rect as SvgRect } from 'react-native-svg'

export default ContentLoader

export function Rect({ x, y, rx, ry, width, height }): SvgRect {
	// @ts-ignore - we want to trick the tsx component using the html placeholder
	return <rect x={x} y={y} rx={rx} ry={ry} width={width} height={height} />
}
