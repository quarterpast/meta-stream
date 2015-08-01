var {expect} = require('chai').use(require('dirty-chai'));

var MetaStream = require('./');

exports['MetaStream'] = {
	'should stream' (done) {
		var s = MetaStream(['hello']);
		s.apply(x => {
			expect(x).to.equal('hello');
			done();
		});
	},

	'should set meta' () {
		var s = MetaStream();
		s.meta({foo: 'bar'});
		expect(s.meta().foo).to.equal('bar');
	},

	'should pass on meta' () {
		var s = MetaStream([1]);
		s.meta({foo: 'bar'});
		var r = s.map(x => x);
		expect(r.meta().foo).to.equal('bar');
	},

	'should get initial meta from getInitialMeta' () {
		var S = MetaStream.use({
			getInitialMeta() {
				return {foo: 'bar'};
			}
		});

		expect(S().meta().foo).to.equal('bar');
	},

	'should merge meta deeply' () {
		var s = MetaStream();
		s.meta({foo: {bar: 'baz'}});
		s.meta({foo: {quux: 'frob'}});
		expect(s.meta()).to.deep.equal({
			foo: {
				bar: 'baz',
				quux: 'frob'
			}
		});
	}
};
