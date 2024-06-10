import { ExpensePreview } from './ExpensePreview'

export function ExpenseList({ expenses }) {
    if (!expenses.length) return <section className='expense-list'>Not expenses for now </section>

    return (
        <section className='expense-list'>
            {
                expenses.map(expense =>
                    <div key={expense._id}>
                        <ExpensePreview expense={expense} />
                    </div>
                )
            }
        </section>
    )
}