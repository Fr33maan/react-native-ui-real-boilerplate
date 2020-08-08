import { Dimensions } from 'react-native'
import { getFontSize } from '@rnweb/style'
jest.mock('react-native')

// TODO - throws in !IS_NATIVE when fontSize is integer without px
beforeEach(() => {
	// TODO - remove ts-ignore
	//@ts-ignore
	Dimensions.get.mockReset()
})

describe('getFontSize untouched', () => {
	test('returns unmodified activeStyle', () => {
		const activeStyle = { prop: 123 }
		getFontSize({ prop: 'notFontSize', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})

	test('returns unmodified activeStyle when val is an integer', () => {
		const activeStyle = { fontSize: 123 }
		getFontSize({ prop: 'fontSize', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})
})

describe('fontSize in px', () => {
	test('returns correct fontSize from `px` unit', () => {
		const activeStyle = { fontSize: '123px' }
		getFontSize({ prop: 'fontSize', activeStyle })
		expect(activeStyle).toMatchObject({
			fontSize: 123,
		})
	})
})

describe('fontSize in vw', () => {
	test('returns correct fontSize from `vw` unit', () => {
		// TODO - remove ts-ignore
		// @ts-ignore
		Dimensions.get.mockReturnValue({ width: 1000 })

		const activeStyle = { fontSize: '10vw' }
		getFontSize({ prop: 'fontSize', activeStyle })
		expect(activeStyle).toMatchObject({
			fontSize: 100,
		})

		expect(Dimensions.get).toHaveBeenCalled()
	})
})

describe('fontSize in vh', () => {
	test('returns correct fontSize from `vh` unit', () => {
		// TODO - remove ts-ignore
		// @ts-ignore
		Dimensions.get.mockReturnValue({ height: 1000 })

		const activeStyle = { fontSize: '10vh' }
		getFontSize({ prop: 'fontSize', activeStyle })
		expect(activeStyle).toMatchObject({
			fontSize: 100,
		})

		expect(Dimensions.get).toHaveBeenCalled()
	})
})
