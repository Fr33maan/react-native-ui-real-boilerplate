import { getNativeStyle } from '@rnweb/style'

describe('getNativeStyle', () => {
	test('Should transform valid CSS-React style into a valid React Native style', () => {
		const baseStyleSheet = {
			borderRadius: '4px 8px',
			userSelect: 'none',
			fontSize: '10px',
			border: '15px #123456',
			width: '100px',
			height: '200px',
			padding: '15px',
		}

		const expectedStyleSheet = {
			borderTopLeftRadius: 4,
			borderTopRightRadius: 8,
			borderBottomRightRadius: 4,
			borderBottomLeftRadius: 8,
			fontSize: 10,
			borderColor: '#123456',
			borderWidth: 15,
			width: 100,
			height: 200,
			padding: 15,
		}

		expect(getNativeStyle(baseStyleSheet, true)).toMatchObject(expectedStyleSheet)
	})

	test('Returns UNtouched stylesheet', () => {
		const baseStyleSheet = {
			borderRadius: '4px 8px',
			userSelect: 'none',
			fontSize: '10px',
			border: '15px #123456',
			width: '100px',
			height: '200px',
			padding: '15px',
		}

		expect(getNativeStyle(baseStyleSheet, false)).toMatchObject(baseStyleSheet)
	})
})
