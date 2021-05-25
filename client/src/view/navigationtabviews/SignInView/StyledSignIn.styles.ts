import styled from 'styled-components';

export const SignInViewWrapper = styled.div`
	justify-content: center;
	align-items: center;
	margin:auto;
	max-width: 960px;
	padding-right: 10px;
	padding-left: 10px;
	padding-top: 60px;
	height: 100vh;
`;

export const SignInViewInput = styled.section`
	width: 300px;
	padding: 20px;
	margin: auto;
	display: grid;
	grid-gap: 20px;
	grid-template-columns: auto auto;
	grid-template-areas:
		'inputUser inputUser'
		'inputPassword inputPassword'
		'button button';
	input {
		/* border: none; */
		padding:10px;
  		border:0;
  		box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
		padding: 12px 15px;
		margin: 8px 0;
	}
	.input-user {
		grid-area: inputUser;
	}
	.input-password {
		grid-area: inputPassword;
	}
	button {
		grid-area: button;
		cursor: pointer;
		border: 1px solid #640EB0;
		background-color: #640EB0;
		color: #ffffff;
		font-size: 12px;
		font-weight: 500;
		padding: 12px 45px;
		letter-spacing: 1px;
		text-transform: uppercase;
		transition: transform 80ms ease-in;
	}

	button:active {
		transform: scale(0.95);
	}

	button:focus {
		outline: none;
	}

	button.ghost {
		background-color: transparent;
		border-color: #ffffff;
	}
`;

export const RegisterForgotPasswordWrapper = styled.div`
	display: grid;
	grid-template-columns: 130px 130px;
	width: 260px;
	margin-right: auto;
	margin-left: auto;
	margin-top: 1.5em;
	cursor: pointer;
`
export const Register = styled.span`
	text-align: left;
`

export const ForgotPassword = styled.span`
	text-align: right;
`