import { useNavigate } from 'react-router-dom';
import { utilService } from '../servises/util.service';


export function ExpensePreview({ expense }) {
    const navigate = useNavigate()

    function goToDetails() {
        navigate(`/expense/${expense._id}`)
    }

    return <article className="expense-preview" onClick={goToDetails}>
        <p className='expense-preview-date'>{utilService.timeConverter(expense.date)}</p>
        <div className='expense-preview-descreption'>
            <p className='expense-preview-category'>{expense.category}</p>
            <p className='expense-preview-notes'>{expense.notes}</p>

        </div>
        <p className='expense-preview-amount'>{expense.amount}$</p>
    </article>
}