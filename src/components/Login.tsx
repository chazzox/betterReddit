import { getJSON } from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';
import { refreshAccessToken } from 'redux/AuthSlice';
import { AppDispatch } from 'redux/store';
import styled from 'styled-components';

import { generateAuthUrl } from 'utils/generateAuthURL';
import { Button } from './Button';
import WelcomeBox from './WelcomeBox';

const LoginButton = styled(Button)`
	display: inline-block;
	text-align: center;
	text-decoration: none;
	font-weight: 500;
	&:hover {
		background-color: ${(props) => props.theme.colors.primaryAccentBackground};
	}
`;

const SignIn = styled(LoginButton)`
	background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
`;

const Login = () => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<WelcomeBox topText="Hydrova" bottomText="High Performance Reddit Client">
			<SignIn
				onClick={() => {
					let loginModal = window.open(generateAuthUrl(), '_blank', 'resizable,scrollbars,status');
					let checkLoginModalClosed = setInterval(() => {
						if (loginModal?.closed) {
							dispatch(refreshAccessToken({ refresh_token: getJSON('refresh_token') }));
							clearInterval(checkLoginModalClosed);
						}
					}, 50);
				}}
			>
				Sign In
			</SignIn>
			<LoginButton as="a" href="https://www.reddit.com/register">
				Sign Up
			</LoginButton>
		</WelcomeBox>
	);
};

export default Login;
