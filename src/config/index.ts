/**
 * @description all the config should be exported as constants from this file.
 * Some are mandatory for boilerplate components
 */

import { StyleSheet } from 'react-native'

// Make config file for each env with default, test, dev, prod

// Version number should be set automatically by the CI
// export const VERSION_NUMBER = '1.0.0'

// The debug level you want to use for the app
// export const DEBUG_LEVEL = 6

// TODO - find a way to set this variable
export const IS_STORYBOOK = true
export const IS_NATIVE = !!StyleSheet.absoluteFill