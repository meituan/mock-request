# mock-request [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

> Request parser

## Installation

    npm install mock-request2

## Usage

    var Request = require('mock-request2');
    var request = new Request({
        uri: 'http://localhost:8080/path/to/some/resource',
        method: 'POST',
    });
    // request.pathname => ['path', 'to', 'some', 'resource']
    // request.method => 'POST'
    // request.query => {}
    // ...

## License

MIT

[npm-image]: https://img.shields.io/npm/v/mock-request2.svg?style=flat
[npm-url]: https://npmjs.org/package/mock-request2
[travis-image]: https://img.shields.io/travis/meituan/mock-request.svg?style=flat
[travis-url]: https://travis-ci.org/meituan/mock-request
[coveralls-image]: https://img.shields.io/coveralls/meituan/mock-request.svg?style=flat
[coveralls-url]: https://coveralls.io/r/meituan/mock-request?branch=master
