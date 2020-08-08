import React, { useReducer, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@components'
import { ContextualizedApp, getAppContext } from 'state'

export default { title: 'Button' }

export const withText = () => <Button>Hello Bughjghjsdfsdfsdfdsftton</Button>

export const withEmoji = () => (
	<Button>
		<span role="img" aria-label="so cool">
			😀 😎 👍 dsf
		</span>
	</Button>
)
