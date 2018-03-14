# Stylelint BEM Namics
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Build Status][appveyor-image]][appveyor-url] [![Dependency Status][daviddm-image]][daviddm-url]

Verifies that the given css/less/scss follows the following BEM code conventions.

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
    "plugin/stylelint-bem-namics": true
  }
}
```  

### Advanced configuration

You can define an optional namespace which has to be prepended before every class name:

```js
{
  "plugins": [
    "@namics/stylelint-bem"
  ],
  "rules": {
    "plugin/stylelint-bem-namics": {
      "namespace": "ux-"
    }
  }
}
```  

and in case of emergency you can overwrite the default prefixes

```js
{
  "plugins": [
    "@namics/stylelint-bem"
  ],
  "rules": {
    "plugin/stylelint-bem-namics": {
      "patternPrefixes": [ "a", "m", "o", "t", "p" ],
      "helperPrefixes": [ "is", "has" ]
    }
  }
}
``` 
 
... or you can pass empty prefixes to disable prefixes completely

```js
{
  "plugins": [
    "@namics/stylelint-bem"
  ],
  "rules": {
    "plugin/stylelint-bem-namics": {
      "patternPrefixes": [],
      "helperPrefixes": []
    }
  }
}
```  

## Valid examples

### Default Pattern Prefixes 

* `a` Atom
* `m` Molecule
* `o` Organism
* `l` Layout
* `g` Grid
* `h` Helper

### Default Helper Prefixes

* `state` State

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

.a-[block-name]__[element-name]__[element-name] {}
.m-[block-name]__[element-name]__[element-name] {}
.o-[block-name]__[element-name]__[element-name] {}
.l-[block-name]__[element-name]__[element-name] {}
.g-[block-name]__[element-name]__[element-name] {}
.h-[block-name]__[element-name]__[element-name] {}

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

## License

[MIT license](http://opensource.org/licenses/MIT)


[npm-image]: https://badge.fury.io/js/%40namics%2Fstylelint-bem.svg
[npm-url]: https://npmjs.org/package/@namics/stylelint-bem
[travis-image]: https://travis-ci.org/namics/stylelint-bem-namics.svg?branch=master
[travis-url]: https://travis-ci.org/namics/stylelint-bem-namics
[appveyor-image]: https://ci.appveyor.com/api/projects/status/1fh5v6xitjpto341/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/namics/stylelint-bem-namics/branch/master
[daviddm-image]: https://david-dm.org/namics/stylelint-bem-namics.svg
[daviddm-url]: https://david-dm.org/namics/stylelint-bem-namics
