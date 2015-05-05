## Request
`Request` constructor accept an object with the format

    {
        [string: uri]
        [string: method]
    }

Both of them are optional, the default value for these fields are

    {
        uri: "/"
        method: "GET"
    }

The object was normalized into

    {
        [Array: pathname]
        [Object: query]
        [Object: params]
        [string: method]
    }
    
`pathname` is array of uri path names, `query` is querystring in `uri`, `params` is querystring start with `mk_`, it can be used by `mock-response`.

For example,

```js
var Request = require('mock-request2');
var request = new Request({
   uri: 'http://localhost:8080/path/to/some/resource?a=1&b=2&mk_c=3',
   method: 'POST',
});
// request.pathname => ['path', 'to', 'some', 'resource']
// request.method => 'POST'
// request.query => {a: 1, b: 2, mk_c: 3}
// request.params => {c: 3}
```

### FAQ

* Extension in `uri` is ignored
* Collection such as `/deals` will have the pathname `['deals', 'index']` while item such as '/deal/123' have the pathname `['deal', '123']`
