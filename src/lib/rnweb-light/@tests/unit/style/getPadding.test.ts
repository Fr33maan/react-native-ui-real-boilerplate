import { Dimensions } from 'react-native'
import { getPadding } from '@rnweb/style'
jest.mock('react-native')

// TODO - throws in !IS_NATIVE when padding is integer without px
beforeEach(() => {
	// getDimensionsMock.mockReset()
})

describe('getPadding untouched', () => {
	test('returns unmodified activeStyle', () => {
		const activeStyle = { prop: 123 }
		getPadding({ prop: 'notPadding', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})

	test('returns unmodified activeStyle when val is an integer', () => {
		const activeStyle = { padding: 123 }
		getPadding({ prop: 'padding', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})
})

describe('padding in px', () => {
	test('returns correct padding from `px` unit', () => {
		const activeStyle = { padding: '123px' }
		getPadding({ prop: 'padding', activeStyle })
		expect(activeStyle).toMatchObject({
			padding: 123,
		})
	})
})

describe('padding in vw', () => {
	test('returns correct padding from `vw` unit', () => {
		// TODO - remove ts-ignore
		// @ts-ignore
		Dimensions.get.mockReturnValue({ width: 1000 })

		const activeStyle = { padding: '10vw' }
		getPadding({ prop: 'padding', activeStyle })
		expect(activeStyle).toMatchObject({
			padding: 100,
		})

		expect(Dimensions.get).toHaveBeenCalled()
	})
})

describe('padding in vh', () => {
	test('returns correct padding from `vh` unit', () => {
		// TODO - remove ts-ignore
		// @ts-ignore
		Dimensions.get.mockReturnValue({ height: 1000 })

		const activeStyle = { padding: '10vh' }
		getPadding({ prop: 'padding', activeStyle })
		expect(activeStyle).toMatchObject({
			padding: 100,
		})

		expect(Dimensions.get).toHaveBeenCalled()
	})
})
