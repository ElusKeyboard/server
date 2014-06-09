require('../app')
var models = require('../models')
var async = require('async')

var queries = [{
	delivery: false,
	takeaway: false
}, {
	delivery: true,
	takeaway: false
}, {
	delivery: false,
	takeaway: true
}];

async.eachSeries(queries, function(query, cb) {
	query.deleted = false;
	models.Table.find(query).select('name _id').exec(function(err, tables) {
		if (err) throw err;

		console.log(query);
		console.log(tables);

		var ids = [];
		for (var i = 0; i < tables.length; i++) {
			var table = tables[i];

			ids.push(table._id);
		}

		resetTables(ids, cb);
	})
}, function(err) {
	console.log("Done");
	process.exit(0);
})

function resetTables (tables, cb) {
	models.OrderGroup.find({
		cleared: false,
		orderNumber_locked: false,
		table: {
			$in: tables
		}
	}).sort('-created').select('orderNumber orderNumber_generated orderNumber_locked').exec(function(err, orders) {
		var orderNumber = 1;

		if (orders.length == 0) {
			console.log("nothing to do")
			return cb();
		}

		async.each(orders, function(order, callback) {
			order.orderNumber = orderNumber++;
			order.orderNumber_generated = Date.now();

			console.log("Saved ", order);

			order.save(callback);
		}, cb);
	});
}