import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ExpenseIndex } from './pages/ExpenseIndex'
import { ExpenseEdit } from './pages/ExpenseEdit'
import { ExpenseDetails } from './pages/ExpenseDetails'
import { Statistic } from './pages/Statistic'
import { LoginSignup } from './pages/LoginSignup'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'
import { store } from './store/store'

export function RootCmp() {

  return (
    <Provider store={store}>
      <Router>
        <section className='main-app'>
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<ExpenseIndex />} />
              <Route path="/expense/edit" element={<ExpenseEdit />} />
              <Route path="/expense/edit/:expenseId" element={<ExpenseEdit />} />
              <Route path="/expense/:expenseId" element={<ExpenseDetails />} />
              <Route path="/statistic" element={<Statistic />} />
              <Route path="/loginSignup" element={<LoginSignup />} />

            </Routes>
          </main>
          <AppFooter />
          <UserMsg />
        </section>
      </Router>
    </Provider>

  )
}


