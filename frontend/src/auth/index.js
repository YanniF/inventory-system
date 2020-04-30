import React from 'react';
import { Tabs } from 'element-react';

import Login from './Login';
import Register from './Register';

import bgImage from '../assets/geometry.png';

function Auth() {
	return (
		<div className="mx-auto h-screen flex justify-center items-center" style={{ backgroundImage: `url(${bgImage})` }}>
			<div className="xl:w-4/12 lg:w-6/12 md:w-9/12 sm:w-11/12 rounded p-8 bg-white shadow-lg">
				<Tabs>
					<Tabs.Pane size="large" label="Sign In" name="login">
						<Login />
					</Tabs.Pane>
					<Tabs.Pane label="Sign Up" name="register">
						<Register />
					</Tabs.Pane>
				</Tabs>
			</div>
		</div>
	);
}

export default Auth;
