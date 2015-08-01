var σ = require('highland');
var extend = require('deep-extend');

var MetaStream = σ.use({
	getInitialMeta() {
		return {};
	},

	meta(obj = {}) {
		return extend(this._meta || (this._meta = this.getInitialMeta()), obj);
	},

	create() {
		var s = σ().create.apply(this, arguments);
		extend(s.meta(), this.meta());
		return s;
	}
});

module.exports = MetaStream;
