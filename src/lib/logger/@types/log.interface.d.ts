import { ELogLevel } from './log.enum'

declare global {
	interface FinalLog {
		levelName: string
		message: string
		data: any
		stackLines: string[]
		level: number
	}
}
