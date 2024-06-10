import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { expenseService } from '../servises/expense.servise'
import { ExpenseList } from '../cmps/ExpenseList'
import { ExpenseFilter } from '../cmps/ExpenseFilter'

export function ExpenseIndex() {
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
            <Link to={'/expense/edit'} className='btn'>Add Expense</Link>
            <ExpenseFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <ExpenseList expenses={expenses} />
        </section>
    )
}