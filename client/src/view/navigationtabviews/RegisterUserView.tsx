import { useState } from 'react';
/* import { useHistory } from 'react-router-dom'; */
/* import RoutingPath from '../../routes/RoutingPath'; */
import UserAPIService from '../../shared/api/service/UserAPIService';
import { RegisterUserProps } from '../../shared/types/RegisterUserProps'
import styled from 'styled-components';

const RegisterWrapper = styled.div`
	max-width: 1124px;
	margin: auto;
	height: 100vh;
`

const RegisterForm = styled.form`
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

const PasswordValidationWrapper = styled.div`
    max-width: 40vw;
    margin:auto;
    padding: 0.5em;
`

const PasswordValidationMessage = styled.span`

`

export const RegisterUserView = () => {
    /* const history = useHistory(); */
    const initialState = { firstname: '', lastname: '', schoolclass: '', email: '', username: '', password: '' }
    const [newUser, setNewUser] = useState<RegisterUserProps>(initialState)
    const [confirmCreateUser, setConfirmCreateUser] = useState<string>('')

    const registerUser = async () => {
        try {
            const { data } = await UserAPIService.createUser(newUser)
            if (data) {
                setNewUser(initialState)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, target: keyof RegisterUserProps) => {
        setNewUser({
            ...newUser,
            [target]: event.target.value
        });
    }

    const messageUsername: string = "Must be at least 5 or more characters."
    const messagePassword: string = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."

    return (
        <RegisterWrapper>
            <RegisterForm onSubmit={() => registerUser()} >
                <input type='text' required placeholder="first name" onChange={event => handleChange(event, 'firstname')} />
                <input type='text' required placeholder="last name" onChange={event => handleChange(event, 'lastname')} />
                <input type='text' required placeholder="school class" onChange={event => handleChange(event, 'schoolclass')} />
                <input type='text' required placeholder="e-mail" onChange={event => handleChange(event, 'email')} />
                <input type='text' required placeholder="username" autoComplete="username" onChange={event => handleChange(event, 'username')}
                    onFocus={() => {
                        setConfirmCreateUser(messageUsername)
                    }}
                    onBlur={() => {
                        setConfirmCreateUser("")
                    }} />
                <input type="password" required placeholder="password" autoComplete="new-password" onChange={event => handleChange(event, 'password')}
                    onFocus={() => {
                        setConfirmCreateUser(messagePassword)
                    }}
                    onBlur={() => {
                        setConfirmCreateUser("")
                    }}

                />
                <input type='submit' value="Register" />
            </RegisterForm>
            <PasswordValidationWrapper>
                <PasswordValidationMessage>
                    {confirmCreateUser}
                </PasswordValidationMessage>
            </PasswordValidationWrapper>
        </RegisterWrapper>
    )
}
