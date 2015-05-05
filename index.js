var url = require('url');
var _ = require('lodash');

/**
 * @constructor
 * @param {Object} request
 */
function Request(request) {
    if (typeof request === 'string') {
        request = {uri: request};
    }

    // path and query
    var uri = url.parse(request.uri || this.defaults.url, true);
    this.pathname = this.normalize(uri.pathname);
    this.query = uri.query;

    // method
    this.method = (request.method || this.defaults.method).toUpperCase();

    // extract magic keys
    this.params = {};
    _.forOwn(this.query, function(value, key) {
        // start with `mk_`
        if (key.indexOf('mk_') === 0) {
            this.params[key.slice(3)] = JSON.parse(value);
        }
    }, this);
}

// Default field values
Request.prototype.defaults = {
    uri: '/',
    method: 'GET',
};

/**
 * @property {Array.<string>} pathname
 */
Request.prototype.pathname;

/**
 * @property {Object} query
 */
Request.prototype.query;

/**
 * @property {string} method
 */
Request.prototype.method;

/**
 * Parameters extract from querystring prefix with `mk_`
 * @property {Object} params
 */
Request.prototype.params;

/**
 * @private
 * @param {string} pathname
 * @return {Array} Normalized pathname
 */
Request.prototype.normalize = function(pathname) {
    var segment;
    // default to use `index` as filename if not specified
    if (pathname[pathname.length - 1] === '/') {
        pathname += 'index';
    }
    // remove extension
    // extension is expressed with HTTP accept header
    segment = pathname.split('/').slice(-1)[0];
    if (segment && segment.lastIndexOf('.') !== -1) {
        pathname = pathname.slice(0, pathname.lastIndexOf('.'));
    }
    // split by '/'
    if (pathname[0] === '/') {
        pathname = pathname.slice(1);
    }
    return pathname.split('/');
};

module.exports = Request;
