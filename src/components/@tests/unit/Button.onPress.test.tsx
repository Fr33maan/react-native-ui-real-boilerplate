import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { Button } from '@components'

describe('<Button />', () => {
	test('call the onPress method given as a prop when we click on the button', async () => {
		const onPressMock = jest.fn()
		const { getByText } = render(<Button onPress={onPressMock}>Click Me</Button>)
		const node = getByText('Click Me')
		fireEvent.mouseUp(node)

		expect(onPressMock).toHaveBeenCalled()
	})

	afterEach(cleanup)
})
