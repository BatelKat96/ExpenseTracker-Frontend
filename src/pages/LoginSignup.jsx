import { useState } from 'react'
import { useNavigate } from 'react-router'

import { showErrorMsg, showSuccessMsg } from '../servises/event-bus.service.js'
import { LoginForm } from '../cmps/LoginForm.jsx'
import { login, signup } from '../store/user.actions.js'


export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)
    const navigate = useNavigate()

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(() => {
                showSuccessMsg('Logged in successfully')
                navigate('/')
            })
            .catch(() => {
                console.log('kl:',)

                showErrorMsg('Oops try again')
            })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(() => {
                showSuccessMsg('Signed in successfully')
                navigate('/')
            })
            .catch(() => { showErrorMsg('Oops try again') })
    }

    return (
        <div className="login-signup-section">
            <LoginForm onLogin={onLogin} isSignup={isSignup} />
            <div>
                <span onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </span >
            </div>
        </div >
    )
}
