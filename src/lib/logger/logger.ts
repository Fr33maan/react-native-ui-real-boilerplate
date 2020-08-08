import { ELogLevel } from './@types/log.enum'

// TODO - move to config
const DEBUG_LEVEL = 0
const IS_DEV = true

// Wrapper to use in code
export function silly(msgOrData: string | Error, data?: any) {
	const log = createLog(msgOrData, data, ELogLevel.SILLY)
	if (IS_DEV && DEBUG_LEVEL <= ELogLevel.SILLY) {
		console.log(log)
	}
}

// Wrapper to use in code
export function debug(msgOrData: string | Error, data?: any) {
	const log = createLog(msgOrData, data, ELogLevel.INFO)
	if (IS_DEV && DEBUG_LEVEL <= ELogLevel.INFO) {
		console.log(log)
	}
}

// Wrapper to use in code
export function info(msgOrData: string | Error, data?: any) {
	const log = createLog(msgOrData, data, ELogLevel.INFO)
	if (IS_DEV && DEBUG_LEVEL <= ELogLevel.INFO) {
		console.log(log)
	}
}

// Wrapper and its alias to use in code
export const warning = warn // Alias
export function warn(msgOrData: string | Error, data?: any) {
	const log = createLog(msgOrData, data, ELogLevel.WARNING)
	if (IS_DEV && DEBUG_LEVEL <= ELogLevel.WARNING) {
		console.log(log)
	}
}

// Wrapper and its alias to use in code
export const err = error // Alias
export function error(msgOrData: string | Error, data?: any) {
	const log = createLog(msgOrData, data, ELogLevel.ERROR)

	if (IS_DEV && DEBUG_LEVEL <= ELogLevel.ERROR) {
		console.log(log)
	}
}

// Wrapper to use in code
export function fatal(msgOrData: string | Error, data?: any) {
	const log = createLog(msgOrData, data, ELogLevel.FATAL)

	if (IS_DEV) {
		console.log(log)
	}
}

/**
 * @description
 * @param log
 */
function outputLog(log: FinalLog) {}

/**
 * @description the function which will transform a string input into a mappable stacktrace with rich meta
 * @param errorOrMessage
 * @param data
 * @param level
 */
function createLog(errorOrMessage: string | Error, data: any, level: number) {
	const message = (errorOrMessage as Error).message || (errorOrMessage as string)
	const IS_ERROR = errorOrMessage instanceof Error

	// As we create an Error if args[0] is a string, we have an additional line in the stack
	// We call this function from leveled helpers so we have 2 levels to skip in the stack
	const realStackStartLine = IS_ERROR ? 1 : 3

	const preStack = IS_ERROR
		? (errorOrMessage as Error).stack
		: new Error(errorOrMessage as string).stack

	// TODO - remove lines from node_modules ?
	// TODO - test behaviour with bundled code
	const stackLines = preStack
		.split('\n')
		// Strange TS hack to get the first parameter ignored for unused parameters
		// https://stackoverflow.com/questions/38835001/skip-type-check-on-unused-parameters
		.filter((_l, index) => {
			return index >= realStackStartLine
		})
		.map((s) => s.trim())
		.map((s) => s.replace('at ', ''))

	const log: FinalLog = {
		levelName: ELogLevel[level],
		message,
		data,
		stackLines,
		level: level,
	}

	// Finally send the log to the output plugin
	outputLog(log)

	return log
}
