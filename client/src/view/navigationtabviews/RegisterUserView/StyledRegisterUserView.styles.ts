import styled from 'styled-components';

export const RegisterWrapper = styled.div`
	max-width: 1124px;
	margin: auto;
	height: 100vh;
`

export const RegisterForm = styled.form`
        margin: auto;
        display: grid;
        grid-template-columns: auto;
        grid-gap: 0.5em;
        max-width: 40vw;

    input {
        padding:10px;
  		border:0;
  		box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
		padding: 12px 15px;
		margin: 8px 0;
    }

    input[type=submit] {
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
`

export const PasswordValidationWrapper = styled.div`
    max-width: 40vw;
    margin:auto;
    padding: 0.5em;
`

export const PasswordValidationMessage = styled.span`

`