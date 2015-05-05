var fs = require('fs');
var path = require('path');
var Request = require('..');

var fixtures = {};
var dirname = path.join(__dirname, 'fixtures');
fs.readdirSync(dirname).forEach(function(filename) {
    if (path.extname(filename) === '.json') {
        var file = path.basename(filename, path.extname(filename));
        fixtures[file] =
            JSON.parse(fs.readFileSync(path.join(dirname, filename), 'utf8'));
    }
});

describe('Request', function() {
    it('should parse pathname as array', function() {
        var req = new Request(fixtures.deal);
        req.pathname.should.be.type('object');
        req.pathname.length.should.be.type('number');
    });

    it('should remove extension in pathname', function() {
        var req = new Request(fixtures.deal);
        req.pathname.length.should.equal(2);
    });

    it('should add index if resource not provided', function() {
        var index = new Request(fixtures.index);
        index.pathname[index.pathname.length - 1].should.equal('index');
    });

    it('should parse query in path', function() {
        var req = new Request(fixtures.deal);
        req.query.should.be.type('object');
    });

    it('should directly passing uri', function() {
        var req = new Request('/deals');
        req.pathname.should.be.type('object');
        req.pathname.length.should.be.type('number');
    });

    it('should parse params from querystring', function() {
        var req = new Request(fixtures.params);
        (req.params.b === undefined).should.be.true;
        req.params['a.1.b'].should.equal('hello');
    });

    it('should handle path contain dot', function() {
        var req = new Request(fixtures.dot);
        req.pathname.should.eql(['rest', 'calendar-services', '1.0', 'tips']);
    });
});
