interface Executable {
	/**
	 * the function or promise to be awaited
	 */
	fn: Function | Promise<object>
	fname: string
	state: object
}

export async function executeFunction({ fn, fname, state }: Executable) {
	let result
	if (fn instanceof Promise) {
		result = await fn
	} else {
		result = await fn(state)
	}
	state[fname] = result
	// if( !result ) throw new Error(`function ${fname} should return a value instead of "${result}"`)
	// state = {...state, [fname]: result}
	// return state
}

export async function executeSyncFunction({ fn, fname, state }: Executable) {
	let result
	if (fn instanceof Promise) {
		result = fn
	} else {
		result = fn(state)
	}
	state[fname] = fn(state)
}

export async function controlFlow(state = {}, actions) {
	let fn, fname
	for ([fname, fn] of Object.entries(actions)) {
		if (typeof fn === 'function') {
			await executeFunction({ fn, fname, state })
		} else {
			await Promise.all(
				Object.entries(fn).map(async ([fname, fn]: [string, Function | Promise<object>]) => {
					await executeFunction({ fn, fname, state })
				}),
			)
		}
	}
	return state
}

export function syncControlFlow(state = {}, actions): object {
	let fn, fname
	for ([fname, fn] of Object.entries(actions)) {
		if (typeof fn === 'function') {
			state[fname] = fn(state)
		} else {
			for (const [subFname, subFn] of Object.entries(fn)) {
				state[subFname] = subFn(state)
			}
		}
	}
	return state
}

export default {
	controlFlow,
}
