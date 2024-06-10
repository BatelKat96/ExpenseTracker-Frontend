import { Link, NavLink } from 'react-router-dom';

export function AppHeader() {

    return (
        <section className='app-header full '>
            <header>
                <Link to={'/'} className='logo'>
                    Expense Tracker
                </Link>
                <nav>
                    <NavLink to="/">Expenses</NavLink>
                    <NavLink to="/statistic">Statistic</NavLink>
                    <NavLink to="/loginSignup">Login</NavLink>
                </nav>
            </header>
        </section>
    )
}