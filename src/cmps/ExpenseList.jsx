import { ExpensePreview } from './ExpensePreview'

export function ExpenseList({ expenses }) {

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