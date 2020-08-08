import { Dimensions } from 'react-native'
import { getHeight } from '@rnweb/style'
jest.mock('react-native')

// TODO - throws in !IS_NATIVE when width is integer without px
describe('getHeight untouched', () => {
	test('returns unmodified activeStyle', () => {
		const activeStyle = { prop: 123 }
		getHeight({ prop: 'notHeight', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})

	test('returns unmodified activeStyle when val is an integer', () => {
		const activeStyle = { height: 123 }
		getHeight({ prop: 'height', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})
})

describe('height in px', () => {
	test('returns correct height from `px` unit', () => {
		const activeStyle = { height: '123px' }
		getHeight({ prop: 'height', activeStyle })
		expect(activeStyle).toMatchObject({
			height: 123,
		})
	})
})

describe('height in vw', () => {
	test('returns correct height from `vw` unit', () => {
		// TODO - remove ts-ignore
		// @ts-ignore
		Dimensions.get.mockReturnValue({ width: 1000 })

		const activeStyle = { height: '10vw' }
		getHeight({ prop: 'height', activeStyle })
		expect(activeStyle).toMatchObject({
			height: 100,
		})

		expect(Dimensions.get).toHaveBeenCalled()
	})
})

describe('height in vh', () => {
	test('returns correct height from `vh` unit', () => {
		// TODO - remove ts-ignore
		// @ts-ignore
		Dimensions.get.mockReturnValue({ height: 1000 })

		const activeStyle = { height: '10vh' }
		getHeight({ prop: 'height', activeStyle })
		expect(activeStyle).toMatchObject({
			height: 100,
		})

		expect(Dimensions.get).toHaveBeenCalled()
	})
})
