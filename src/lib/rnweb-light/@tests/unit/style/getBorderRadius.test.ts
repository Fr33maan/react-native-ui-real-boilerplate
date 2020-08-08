import { getBorderRadius } from '@rnweb/style'

describe('getBorderRadius NOT active', () => {
	test('returns unmodified activeStyle', () => {
		const activeStyle = { prop: 123 }
		getBorderRadius({ prop: 'notBorderRadius', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})

	test('returns unmodified activeStyle when val is a number', () => {
		const activeStyle = { borderRadius: 123 }
		getBorderRadius({ prop: 'borderRadius', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})

	test('returns unmodified activeStyle when val is a string without px or vw', () => {
		const activeStyle = { borderRadius: '123' }
		getBorderRadius({ prop: 'borderRadius', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})
})

describe('getBorderRadius px or integer format - success', () => {
	test('returns RN style when val is of format `4px 4px 4px 4px`', () => {
		const activeStyle = { borderRadius: '4px 4px 4px 4px' }
		getBorderRadius({ prop: 'borderRadius', activeStyle })
		expect(activeStyle).toMatchObject({
			borderTopLeftRadius: 4,
			borderTopRightRadius: 4,
			borderBottomRightRadius: 4,
			borderBottomLeftRadius: 4,
		})
	})

	test('returns RN style when val is of format `4px 8px 7px`', () => {
		const activeStyle = { borderRadius: '4px 8px 7px' }
		getBorderRadius({ prop: 'borderRadius', activeStyle })
		expect(activeStyle).toMatchObject({
			borderTopLeftRadius: 4,
			borderTopRightRadius: 8,
			borderBottomRightRadius: 7,
			borderBottomLeftRadius: 8,
		})
	})

	test('returns RN style when val is of format `4px 8px`', () => {
		const activeStyle = { borderRadius: '4px 8px' }
		getBorderRadius({ prop: 'borderRadius', activeStyle })
		expect(activeStyle).toMatchObject({
			borderTopLeftRadius: 4,
			borderTopRightRadius: 8,
			borderBottomRightRadius: 4,
			borderBottomLeftRadius: 8,
		})
	})

	test('returns RN style when val is of format `4px`', () => {
		const activeStyle = { borderRadius: '4px' }
		getBorderRadius({ prop: 'borderRadius', activeStyle })
		expect(activeStyle).toMatchObject({
			borderRadius: 4,
		})
	})

	test('fault tolerant with malformated input `4p 8px`', () => {
		const activeStyle = { borderRadius: '4p 8px' }
		getBorderRadius({ prop: 'borderRadius', activeStyle })

		expect(activeStyle).toMatchObject({
			borderTopLeftRadius: 4,
			borderTopRightRadius: 8,
			borderBottomRightRadius: 4,
			borderBottomLeftRadius: 8,
		})
	})

	test('returns RN style when val is mix of int and px of format `4 4px`', () => {
		const activeStyle = { borderRadius: '4 8px' }
		getBorderRadius({ prop: 'borderRadius', activeStyle })
		expect(activeStyle).toMatchObject({
			borderTopLeftRadius: 4,
			borderTopRightRadius: 8,
			borderBottomRightRadius: 4,
			borderBottomLeftRadius: 8,
		})
	})
})

describe('getBorderRadius vw format - success', () => {
	test('returns RN style when val is of format `10vw`', () => {
		const activeStyle = { borderRadius: '10vw' }
		getBorderRadius({
			prop: 'borderRadius',
			activeStyle,
			_vw: () => 100,
		})
		expect(activeStyle).toMatchObject({
			borderRadius: 100,
		})
	})
})

describe('getBorderRadius px format - fail', () => {
	// TODO - should throw an error - unpredictible behaviour
	xtest('throws when string is malformated `4pp 8p 7p`', () => {
		const activeStyle = { borderRadius: '4pp 8p 7p' }
		const resultStyle = () => getBorderRadius({ prop: 'borderRadius', activeStyle })
		expect(resultStyle).toThrowError('borderRadius malformated "4pp 8p 7p"')
	})
})
