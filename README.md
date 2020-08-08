# React Native UI Boilerplate

Debug in the browser using cypress and storybook.  
Our custom react-native-web makes will give you similar looking on web and mobile.
Opinionated development environment

# Setup

- clone
- add modules in `tsconfig.json` and `babel.config.js`
- for each native dependency, create a file in `src/lib/` and a module mapper in tsconfig and babel config

# Why not react-native-web

- I were barely able to have consistent looking between desktop and native.
- add a mega extra dependency to your project.
- aims to recreate the whole react-native experience on the web, we offer a debug environment for React Native mobile developers.

### Pros

- `react-native-web-light` properly handle styling and is very lightweight.
- Develop on multiple screen sizes at the same time
  -> view https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
  -> view https://appleinsider.com/articles/19/04/24/us-survey-reveals-iphone-xr-most-popular-model-middling-services-takeup

- Styles from the web, easy to use like `borderRadius: 4px 4px 0 0` or `width: 32vw`, pretty nice to make rounded images on iOS and dynamic square images !
- Unify flex behaviour, default to column, need less attributes
- gradient integrated
- brings `vh` and `vw` to native
- brings calc to native -> easy placement on the center of the screen

```
{
	position: 'absolute',
	width: '50vw',
	height: '50vw',
	top: 'calc(50vh - 25vw)',
	left: '25vw'
}
```

### Cons

- not made for web production apps but rather for mobile apps development

# Tests

We have 3 kind of tests:

- full integration testing - **cypress** - to check the behaviour of the app's components
- component integration testing - **jest** - to test behaviour following mounting a component
- unit test - **jest** - to test functions, reducers, etc...

# Todo

- display a frame landscape or portrait
- return a StyleSheet for types correctness or mock it (even better)
- test rnweb-light stylization
- test rn-web vs native vs rn-web-light
- be able to set developer screen size
- check on retina what happen, do we need to use the devicePixelRatio ?
- add devices to device matrix
- unit test `getNativeStyles`
- make a npm module of rn-web-light
- manually test `vw`, `vh`, `calc` on native
- make a npm module on rn-web-light
- remove webStyles
- log for reducer and integration with redux devtools

# To Think

- font sizes
  -> clearly a pain in any situation

# Additional modules

- crash reporting (sentry for inspiration)
- logging (see logrocket for inspiration - http / console / redux)
- FPS drops
- user frustration - click rage
- session replay
- metrics
- A/B testing / feature flaging
- support tickets

# OSS Product - mix between burpsuite, stress testing and integration tests
