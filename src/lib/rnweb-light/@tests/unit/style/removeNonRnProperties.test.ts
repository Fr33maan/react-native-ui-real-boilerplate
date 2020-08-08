import { removeNonRnProperties } from '@rnweb/style'

describe('removeNonRnProperties', () => {
	test('remove userSelect', () => {
		const activeStyle = {
			width: 100,
			userSelect: 'none',
		}
		removeNonRnProperties({ prop: 'userSelect', activeStyle })
		expect(activeStyle).toMatchObject({
			width: 100,
		})
	})
})
