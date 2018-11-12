# Jest Label

Jest labels allows you to label and categorize Jest tests. The utility can be coupled with jest-xunit to produce test results with traits.

## Installation

```
npm i -D jest-label
```

In your jest config add the following:

```js
{
  ...
  setupFiles: [ 'jest-label/setup' ],
  ...
}
```

The plugin includes default traits and types:

```js
const types = global.types || { INTEGRATION: 'Integration', UNIT: 'Unit' };
const traits = global.traits || { SLOW: 'Slow' };
```

If you would like to override these traits and types with your own traits and types simply add another setupFile and define these as globals.

## Using Jest Label

```js
describe(label({ name: 'my test name', type: types.UNIT, traits: traits.SLOW }), () => { ... });
```

You can use label in `describe` or `test/it`. Type is required. Traits are optional can either be a string or an array of traits. The above will produce the following label:

```
(Test Type: Integration, Test Traits: Slow) my test name
```
