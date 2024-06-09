import { useEffect } from 'react'
import { expenseService } from '../servises/expense.servise'
import { useState } from 'react'
import { ExpenseList } from '../cmps/ExpenseList'

export function ExpenseIndex() {
    const [expenses, setExpenses] = useState(null)


    useEffect(() => {
        loadExpenses()
    }, [])


    async function loadExpenses() {
        try {
            const expenses = await expenseService.query()
            setExpenses(expenses)
        } catch (err) {
            console.log('Error in loadExpenses', err)
        }
    }

    if (!expenses) return <div>Loading..</div>
    return (
        <section className='expense-index'>
            <ExpenseList expenses={expenses} />
        </section>
    )
}