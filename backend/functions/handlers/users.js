const { db } = require('../util/admin');

const config = require('../keys/firebaseConfig');
const firebase = require('firebase');
firebase.initializeApp(config);

exports.register = (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	};

	if (newUser.password !== newUser.confirmPassword) {
		return res.status(400).json({ error: 'Passwords must be the same' });
	}
	console.log(newUser);
	let token, userId;

	firebase
		.auth()
		.createUserWithEmailAndPassword(newUser.email, newUser.password)
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((userToken) => {
			token = userToken;

			const userCredentials = {
				id: userId,
				email: newUser.email,
				createdAt: new Date().toISOString(),
			};

			db.doc(`/users/${userId}`).set(userCredentials);
		})
		.then(() => {
			return res.status(201).json({ token });
		})
		.catch((error) => {
			console.error(error);

			if (error.code === 'auth/email-already-in-use') {
				return res.status(400).json({ email: 'E-mail already in use' });
			}
			else {
				return res.status(500).json({ general: 'Something went wrong, please try again' });
			}
		});
};

exports.login = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
	};

	if (user.email.trim() === '') {
		return res.status(400).json({ email: 'E-mail is required' });
	}
	if (user.password.trim() === '') {
		return res.status(400).json({ password: 'Password is required' });
	}

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			return res.json({ token });
		})
		.catch((error) => {
			console.error(error);

			return res.status(403).json({ general: 'Wrong credentials, please try again' });
		});
};
