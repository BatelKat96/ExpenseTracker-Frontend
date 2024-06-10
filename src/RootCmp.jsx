import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { ExpenseIndex } from './pages/ExpenseIndex'
import { ExpenseEdit } from './pages/ExpenseEdit'
import { ExpenseDetails } from './pages/ExpenseDetails'
import { Statistic } from './pages/Statistic'

export function RootCmp() {

  return (
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
            {/* <Route path="/loginSignup" element={<loginsSignup />} /> */}

          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router>
  )
}


