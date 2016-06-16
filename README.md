# Stylelint BEM Namics 
[![Build Status](https://travis-ci.org/namics/stylelint-bem-namics.svg?branch=master)](https://travis-ci.org/namics/stylelint-bem-namics) [![npm version](https://badge.fury.io/js/%40namics%2Fstylelint-bem.svg)](https://badge.fury.io/js/%40namics%2Fstylelint-bem) [![Dependency Status](https://david-dm.org/namics/stylelint-bem-namics.svg)](https://david-dm.org/namics/stylelint-bem-namics)

Verifies that the given css follows the namics BEM rules.

![screenshot](https://raw.githubusercontent.com/namics/stylelint-bem-namics/master/example.png)

## Installation

```
npm install @namics/stylelint-bem --save-dev
```

## Configuration

### Simple configuration
```js
{
  "plugins": [
    "@namics/stylelint-bem"
  ],
  "rules": {
    "plugin/stylelint-bem-namics": true,
  }
}
```  

### Advanced configuration
```js
{
  "plugins": [
    "@namics/stylelint-bem"
  ],
  "rules": {
    "plugin/stylelint-bem-namics": {
      "namespace": "ux-"
    },
  }
}
```  

## Valid examples

```css
.a-[block-name] {}
.m-[block-name] {}
.o-[block-name] {}
.l-[block-name] {}
.g-[block-name] {}
.h-[block-name] {}

.a-[block-name]--[modifier-name] {}
.m-[block-name]--[modifier-name] {}
.o-[block-name]--[modifier-name] {}
.l-[block-name]--[modifier-name] {}
.g-[block-name]--[modifier-name] {}
.h-[block-name]--[modifier-name] {}

.a-[block-name]__[element-name] {}
.m-[block-name]__[element-name] {}
.o-[block-name]__[element-name] {}
.l-[block-name]__[element-name] {}
.g-[block-name]__[element-name] {}
.h-[block-name]__[element-name] {}

.js-a-[block-name]__[hook-name] {}
.js-m-[block-name]__[hook-name] {}
.js-o-[block-name]__[hook-name] {}
.js-l-[block-name]__[hook-name] {}
.js-g-[block-name]__[hook-name] {}
.js-h-[block-name]__[hook-name] {}

.state-a-[block-name]--[state-name] {}
.state-m-[block-name]--[state-name] {}
.state-o-[block-name]--[state-name] {}
.state-l-[block-name]--[state-name] {}
.state-g-[block-name]--[state-name] {}
.state-h-[block-name]--[state-name] {}
```


## Exception

Whenever you will apply rules you will run into edge cases like third-party code or wysiwyg content where those rules have to be bent a little bit.

In this case you can get around the rules above but you should leave a comment why and enable
the linting again:

```css
/* wysiwyg does not follow bem */
/* stylelint-disable plugin/stylelint-bem-namics */
    .wysiwyg .headline {
        font-size: 34px;
    }
/* stylelint-enable plugin/stylelint-bem-namics */
```

## Changelog

Please see the [CHANGELOG.md](https://github.com/namics/stylelint-bem-namics/blob/master/CHANGELOG.md)
