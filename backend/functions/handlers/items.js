const { db } = require('../util/admin');

exports.addItem = (req, res) => {
	if (req.body.name.trim() === '') {
		return res.status(400).json({ message: 'Name is required' });
	}

	if (isNaN(req.body.amount)) {
		return res.status(400).json({ message: 'Amount must be a number' });
	}

	if (req.body.category.trim() === '') {
		return res.status(400).json({ message: 'Category is required' });
	}

	const newItem = {
		name: req.body.name,
		amount: req.body.amount,
		description: req.body.description,
		category: req.body.category,
		createdBy: req.user.user_id,
		createdAt: new Date().toISOString(),
	};

	db
		.collection('items')
		.add(newItem)
		.then((doc) => {
			const resItem = newItem;
			resItem.id = doc.id;

			return res.json(resItem);
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).json({ message: 'Something went wrong' });
		});
};

exports.getAllItems = (req, res) => {
	db
		.collection('items')
		.get()
		.then((data) => {
			let items = [];

			data.forEach((doc) => {
				items.push({
					id: doc.id,
					name: doc.data().name,
					amount: doc.data().amount,
					description: doc.data().description,
					category: doc.data().category,
					imageUrl: doc.data().imageUrl,
				});
			});

			return res.json(items);
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).json({ message: 'Something went wrong' });
		});
};

exports.getItem = (req, res) => {
	let item = {};

	db
		.doc(`/items/${req.params.itemId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				item = doc.data();
			}

			return res.json(item);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ message: err.code });
		});
};

exports.editItem = (req, res) => {
	if (req.body.name.trim() === '') {
		return res.status(400).json({ message: 'Name is required' });
	}

	const item = {
		name: req.body.name,
		amount: req.body.amount,
		description: req.body.description,
		category: req.body.category,
	};

	db
		.doc(`/items/${req.params.itemId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ message: 'Item not found' });
			}
			else {
				return db.doc(`/items/${req.params.itemId}`).update(item);
			}
		})
		.then(() => {
			return res.json({ message: 'Item was updated' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ message: err.code });
		});
};

exports.deleteItem = (req, res) => {
	const document = db.doc(`/items/${req.params.itemId}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ message: 'Item not found' });
			}

			return document.delete();
		})
		.then(() => {
			res.json({ message: 'Item deleted' });
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).json({ message: error.code });
		});
};
