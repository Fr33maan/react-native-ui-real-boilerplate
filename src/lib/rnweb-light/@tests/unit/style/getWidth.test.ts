import { Dimensions } from 'react-native'
import { getWidth } from '@rnweb/style'
jest.mock('react-native')

// TODO - throws in !IS_NATIVE when width is integer without px
beforeEach(() => {
	// getDimensionsMock.mockReset()
})

describe('getWidth untouched', () => {
	test('returns unmodified activeStyle', () => {
		const activeStyle = { prop: 123 }
		getWidth({ prop: 'notWidth', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})

	test('returns unmodified activeStyle when val is an integer', () => {
		const activeStyle = { width: 123 }
		getWidth({ prop: 'width', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})
})

describe('width in px', () => {
	test('returns correct width from `px` unit', () => {
		const activeStyle = { width: '123px' }
		getWidth({ prop: 'width', activeStyle })
		expect(activeStyle).toMatchObject({
			width: 123,
		})
	})
})

describe('width in vw', () => {
	test('returns correct width from `vw` unit', () => {
		// TODO - remove ts-ignore
		// @ts-ignore
		Dimensions.get.mockReturnValue({ width: 1000 })

		const activeStyle = { width: '10vw' }
		getWidth({ prop: 'width', activeStyle })
		expect(activeStyle).toMatchObject({
			width: 100,
		})

		expect(Dimensions.get).toHaveBeenCalled()
	})
})

describe('width in vh', () => {
	test('returns correct width from `vh` unit', () => {
		// TODO - remove ts-ignore
		// @ts-ignore
		Dimensions.get.mockReturnValue({ height: 1000 })

		const activeStyle = { width: '10vh' }
		getWidth({ prop: 'width', activeStyle })
		expect(activeStyle).toMatchObject({
			width: 100,
		})

		expect(Dimensions.get).toHaveBeenCalled()
	})
})
