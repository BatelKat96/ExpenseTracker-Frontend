import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store/user.actions';
import { showErrorMsg, showSuccessMsg } from '../servises/event-bus.service';
import { useEffect } from 'react';

export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    useEffect(() => {
        console.log('user:', user)

    }, [user])

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    return (
        <section className='app-header full '>
            <header>
                <Link to={'/'} className='logo'>
                    Expense Tracker
                </Link>
                <nav>
                    <NavLink to="/">Expenses</NavLink>
                    <NavLink to="/statistic">Statistic</NavLink>
                    {user ?
                        <NavLink to="/loginSignup" onClick={onLogout}> Logout</NavLink>
                        :
                        <NavLink to="/loginSignup"> Login</NavLink>
                    }
                    {/* <NavLink to="/loginSignup"> {user ? 'logout' : 'Login'}</NavLink> */}
                </nav>
            </header>
        </section>
    )
}