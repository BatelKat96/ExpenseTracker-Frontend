import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { expenseService } from '../servises/expense.servise'
import { ExpenseList } from '../cmps/ExpenseList'
import { ExpenseFilter } from '../cmps/ExpenseFilter'

export function ExpenseIndex() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const [expenses, setExpenses] = useState(null)
    const [filterBy, setFilterBy] = useState(expenseService.getDefaultFilter())


    useEffect(() => {
        loadExpenses()
    }, [filterBy])


    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    async function loadExpenses() {
        try {
            const expenses = await expenseService.query(filterBy)
            console.log('expenses:', expenses)

            setExpenses(expenses)
        } catch (err) {
            console.log('Error in loadExpenses', err)
        }
    }

    if (!expenses) return <div>Loading..</div>
    return (
        <section className='expense-index'>
            <div className='expense-index-greeting'>
                <h2>
                    Hello {user ? `${user.fullname}` : 'Guest'}
                </h2>
                <p>Welcome back! It's A time to enter your expenses!
                </p>
                <Link to={'/expense/edit'} className='btn btn-add-expense'>Add Expense</Link>
            </div>
            <div className='expense-index-container'>
                <ExpenseFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ExpenseList expenses={expenses} />
            </div>
        </section>
    )
}