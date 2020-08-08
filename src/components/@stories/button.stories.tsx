import React, { useState } from 'react'
import { Button } from '@components'

export default { title: 'Button' }

export function withText() {
	const [count, setCount] = useState(0)
	return <Button onPress={() => setCount(count + 1)}>{String(count)}</Button>
}
