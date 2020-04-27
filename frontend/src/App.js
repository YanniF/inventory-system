import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { auth } from './store/actions';
import Auth from './auth';
import Inventory from './inventory';

// axios.defaults.baseURL = 'https://europe-west1-yanni-inventory-system.cloudfunctions.net/api';
axios.defaults.baseURL = 'http://localhost:5000/yanni-inventory-system/europe-west1/api';

function App(props) {
	const token = localStorage.token;

	if (token) {
		const decodedToken = jwtDecode(token);

		if (decodedToken.exp * 1000 < Date.now()) {
			props.logout();
			window.location.href = '/auth';
		}
		else {
			props.setToken(token);
			axios.defaults.headers.common['Authorization'] = token;
		}
	}

	return !props.token ? (
		<Switch>
			<Route path="/auth" exact component={Auth} />
			<Redirect to="/auth" />
		</Switch>
	) : (
		<Switch>
			<Route path="/" exact component={Inventory} />
			<Redirect to="/" />
		</Switch>
	);
}

const mapStateToProps = ({ auth }) => ({
	token: auth && auth.token,
});

const mapDispatchToProps = {
	setToken: auth && auth.setToken,
	logout: auth && auth.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
