import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Input, Button, Alert } from 'element-react';
import { auth } from '../store/actions';

function Register(props) {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	const { loading, error, clearErrors } = props;

	const handleRegister = (e) => {
		e.preventDefault();

		if (password === confirmPassword) {
			props.register({ name, email, password, confirmPassword });
		}
		else {
			// TODO: display error message
		}
	};

	return (
		<form onSubmit={handleRegister}>
			{error && <Alert title={error.message} type="error" showIcon={true} className="mb-4" onClose={clearErrors} />}
			<div className="my-4">
				<label htmlFor="name" className="text-gray-700 font-bold text-sm">
					Name
					<Input id="name" value={name} size="large" placeholder="Name" onChange={(e) => setName(e)} required />
				</label>
			</div>
			<div className="my-8">
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
						name="password"
						type="password"
						value={password}
						size="large"
						placeholder="Password"
						onChange={(e) => setPassword(e)}
						required
					/>
				</label>
			</div>
			<div className="my-8">
				<label htmlFor="confirmPassword" className="text-gray-700 font-bold text-sm">
					Confirm Password
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						value={confirmPassword}
						size="large"
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e)}
						required
					/>
				</label>
			</div>
			<div className="mt-8">
				<Button type="primary" nativeType="submit" size="large" loading={loading}>
					Sign Up
				</Button>
			</div>
		</form>
	);
}

const mapStateToProps = ({ auth }) => ({
	loading: (auth && auth.loading) || false,
	error: (auth && auth.error) || false,
});

const mapDispatchToProps = {
	register: auth && auth.register,
	clearErrors: auth && auth.clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
