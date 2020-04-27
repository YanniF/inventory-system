import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Input, Button } from 'element-react';
import { auth } from '../store/actions';

function Login(props) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();

		props.login({ email, password });
	};

	return (
		<form onSubmit={handleLogin}>
			<div className="my-4">
				<label htmlFor="email" className="text-gray-700 font-bold text-sm">
					E-mail
					<Input
						id="email"
						type="email"
						value={email}
						size="large"
						placeholder="E-mail"
						onChange={(e) => setEmail(e)}
						required
					/>
				</label>
			</div>
			<div className="my-8">
				<label htmlFor="password" className="text-gray-700 font-bold text-sm">
					Password
					<Input
						id="password"
						type="password"
						value={password}
						size="large"
						placeholder="Password"
						onChange={(e) => setPassword(e)}
						required
					/>
				</label>
			</div>
			<div className="mt-8">
				<Button type="primary" nativeType="submit" size="large" loading={props.loading}>
					Sign In
				</Button>
			</div>
		</form>
	);
}

const mapStateToProps = ({ auth }) => ({
	loading: (auth && auth.loading) || false,
});

const mapDispatchToProps = {
	login: auth && auth.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
