import { useEffect, useState } from 'react'

export function ExpenseFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        let filter = { ...filterByToEdit }
        switch (target.type) {
            case 'number':
                value = +value || ''
                break
            case 'date':
                value = new Date(value).getTime()
                break
            case 'checkbox':
                if (filter.categorys.includes(value)) {
                    value = filter.categorys.filter(c => c !== value)
                } else {
                    filter.categorys.push(value)
                    value = filter.categorys
                }
                break
            default:
                break
        }

        setFilterByToEdit(prevExpenseToEdit => ({ ...prevExpenseToEdit, [field]: value }))
    }


    const { categorys } = filterByToEdit
    return (
        <section className="expense-filter">
            <div className="expense-filter-date">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={handleChange}
                />
            </div>

            <div>
                <h3>Categorys</h3>
                <div className="expense-filter-categorys">
                    <label>
                        <input
                            type="checkbox"
                            id="food"
                            name="categorys"
                            checked={categorys.includes('Food')}
                            onChange={handleChange}
                            value="Food"
                        />
                        Food
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            id="transport"
                            name="categorys"
                            checked={categorys.includes('Transport')}
                            onChange={handleChange}
                            value="Transport"
                        />
                        Transport
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            id="utilities"
                            name="categorys"
                            checked={categorys.includes('Utilities')}
                            onChange={handleChange}
                            value="Utilities"
                        />
                        Utilities
                    </label>
                </div>
            </div>
        </section>
    )
}