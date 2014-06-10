var mongoose = require('mongoose')
	, schema = mongoose.Schema
	, ObjectId = schema.ObjectId;

var scheme = schema({
	voucher: {
		type: Number,
		default: 0
	},
	cash: {
		type: Number,
		default: 0
	},
	card: {
		type: Number,
		default: 0
	},
	pettyCash: {
		type: Number,
		default: 0
	},
	labour: {
		type: Number,
		default: 0
	},
	tips: {
		type: Number,
		default: 0
	},
	justEat: {
		type: Number,
		default: 0
	},
	justEatUnpaid: {
		type: Number,
		default: 0
	},
	justEatDelivery: {
		type: Number,
		default: 0
	},
	isJustEat: {
		type: Boolean,
		default: false
	},
	created: { type: Date, default: Date.now }
});

scheme.methods.update = function (data) {
	this.voucher = data.voucher;
	this.cash = data.cash;
	this.card = data.card;
	this.pettyCash = data.pettyCash;
	this.labour = data.labour;
	this.tips = data.tips;
	this.justEat = data.justEat;
	this.justEatUnpaid = data.justEatUnpaid;
	this.justEatDelivery = data.justEatDelivery;
	this.isJustEat = data.isJustEat;

	if (!this.voucher) this.voucher = 0;
	if (!this.cash) this.cash = 0;
	if (!this.card) this.card = 0;
	if (!this.pettyCash) this.pettyCash = 0;
	if (!this.labour) this.labour = 0;
	if (!this.tips) this.tips = 0;
	if (!this.justEat) this.justEat = 0;
	if (!this.justEatUnpaid) this.justEatUnpaid = 0;
	if (!this.justEatDelivery) this.justEatDelivery = 0;
	if (!this.isJustEat) this.isJustEat = false;
	
	if (data.created) {
		this.created = new Date(data.created * 1000);
	}
}

module.exports = mongoose.model("CashingUp", scheme);