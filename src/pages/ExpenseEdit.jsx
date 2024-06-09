
import { useEffect, useState } from 'react'
import { expenseService } from '../servises/expense.servise.js'
import { useNavigate } from 'react-router'
import { utilService } from '../servises/util.service.js'


export function ExpenseEdit() {

    const [expenseToEdit, setExpenseToEdit] = useState(expenseService.getEmptyExpense())
    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    function onSaveExpense(ev) {
        ev.preventDefault()
        expenseService.save(expenseToEdit)
            .then(expense => {
                // console.log('expense:', expense)
                navigate('/')
            })
            .catch(err => {
                console.log('Had issues saving expense', err)
            })

    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'date':
                value = new Date(value).getTime()
                break

            default:
                break
        }

        setExpenseToEdit(prevExpenseToEdit => ({ ...prevExpenseToEdit, [field]: value }))
    }


    const { amount, date, notes, category } = expenseToEdit
    return (
        <section className="expense-edit">
            <form onSubmit={onSaveExpense} >

                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Enter amount"
                    name="amount"
                    min="0"
                    onChange={handleChange}
                    value={amount}
                    required
                />
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={handleChange}
                    value={utilService.formatDate(date)}
                />

                <p>Category</p>
                <div>

                    <label>
                        <input
                            type='radio'
                            id="food"
                            name="category"
                            value="Food"
                            checked={category === 'Food'}
                            onChange={handleChange}
                            required
                        />
                        Food
                    </label>

                    <label>
                        <input
                            type='radio'
                            id="transport"
                            name="category"
                            value="Transport"
                            checked={category === 'Transport'}
                            onChange={handleChange}
                        />
                        Transport
                    </label>

                    <label>
                        <input
                            type='radio'
                            id="utilities"
                            name="category"
                            value="Utilities"
                            checked={category === 'Utilities'}
                            onChange={handleChange}
                        />
                        Utilities
                    </label>
                </div>

                <label htmlFor="notes">Notes</label>
                <input
                    type="text"
                    id="notes"
                    placeholder="Enter notes"
                    name="notes"
                    onChange={handleChange}
                    value={notes}
                />

                <button>Save</button>
            </form>
        </section>

    )
}