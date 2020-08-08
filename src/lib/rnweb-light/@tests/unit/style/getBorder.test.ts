import { getBorder } from '@rnweb/style'

describe('getBorder untouched', () => {
	test('returns unmodified activeStyle', () => {
		const activeStyle = { prop: 123 }
		getBorder({ prop: 'notBorder', activeStyle })
		expect(activeStyle).toEqual(activeStyle)
	})
})

describe('getBorder valid format', () => {
	test('parse html format to RN style format - #fff', () => {
		const activeStyle = { border: '4px #fff' }
		getBorder({ prop: 'border', activeStyle })
		expect(activeStyle).toMatchObject({
			borderWidth: 4,
			borderColor: '#fff',
		})
	})

	test('parse html format to RN style format - #FFF', () => {
		const activeStyle = { border: '4px #FFF' }
		getBorder({ prop: 'border', activeStyle })
		expect(activeStyle).toMatchObject({
			borderWidth: 4,
			borderColor: '#FFF',
		})
	})

	test('parse html format to RN style format - #123', () => {
		const activeStyle = { border: '4px #123' }
		getBorder({ prop: 'border', activeStyle })
		expect(activeStyle).toMatchObject({
			borderWidth: 4,
			borderColor: '#123',
		})
	})

	test('parse html format to RN style format - #123fff', () => {
		const activeStyle = { border: '4px #123fff' }
		getBorder({ prop: 'border', activeStyle })
		expect(activeStyle).toMatchObject({
			borderWidth: 4,
			borderColor: '#123fff',
		})
	})
})

describe('getBorder NON valid format', () => {
	test('throws when string is malformated - #ggg', () => {
		const activeStyle = { border: '4px #ggg' }

		const resultStyle = () => getBorder({ prop: 'border', activeStyle })
		expect(resultStyle).toThrowError('borderRadius malformated "4px #ggg"')
	})

	test('throws when string is malformated - #123ffg', () => {
		const activeStyle = { border: '4px #123ffg' }

		const resultStyle = () => getBorder({ prop: 'border', activeStyle })
		expect(resultStyle).toThrowError('borderRadius malformated "4px #123ffg"')
	})
})
