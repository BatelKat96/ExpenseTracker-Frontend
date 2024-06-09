import { useEffect, useState } from 'react'
import { expenseService } from '../servises/expense.servise'
import { useNavigate, useParams } from 'react-router'
import { utilService } from '../servises/util.service'
import { Link } from 'react-router-dom'
import editIcon from '/edit-icon.svg'
import trashIcon from '/trash-icon.svg'

export function ExpenseDetails() {
    const [expense, setExpense] = useState(null)
    const { expenseId } = useParams()

    useEffect(() => {
        if (expenseId) loadExpense()
    }, [])


    async function loadExpense() {
        await expenseService.getById(expenseId)
            .then(expense => {
                setExpense(expense)
            })
            .catch(err => {
                console.log('Had issues getting expense', err)
            })
    }

    function onRemoveExpense(expenseId) {
        console.log('expenseId:', expenseId)

    }

    if (!expense) return <div>Loading..</div>
    const { amount, date, notes, category, _id } = expense

    return (
        <section className="expense-details">
            <Link to={'/'} className='btn-go-back'>Go Back</Link>
            <div className="expense-details-container">
                <h3>{category}</h3>
                <h4>Amount:   </h4>
                <p>{amount}$ </p>
                <h4>Date:</h4>
                <p> {utilService.timeConverter(date)}  </p>
                <h4>Notes: </h4>
                <p>{notes}</p>
            </div>

            <div className='expense-details-actions'>
                <Link to={`/expense/edit/${_id}`}>
                    <img src={editIcon} alt="Edit expense" title='Edit expense' />
                </Link>
                <img src={trashIcon} alt="Delete expense" onClick={() => onRemoveExpense(_id)} title='Delete expense' />
            </div>

        </section>

    )
}