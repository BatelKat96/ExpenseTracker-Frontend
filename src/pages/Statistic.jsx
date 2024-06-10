import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { expenseService } from '../servises/expense.servise';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Statistic() {

    const [categoryExpenses, setCategoryExpenses] = useState([])

    useEffect(() => {
        loadCategorysExpenses()
    }, [])

    async function loadCategorysExpenses() {
        await expenseService.getCategoryCounts().then((categoryExpenses) => setCategoryExpenses(categoryExpenses))
    }

    const data = {
        labels: categoryExpenses.map((categoryExpense) => categoryExpense.category),
        datasets: [
            {
                label: 'expenses of',
                data: categoryExpenses.map((categoryExpense) => categoryExpense.expense),
                backgroundColor: [
                    '#ffffff',
                    'rgb(147, 210, 253)',
                    'rgb(17, 153, 250)',

                ],
                borderColor: [
                    '#ffffff',
                    'rgb(147, 210, 253)',
                    'rgb(17, 153, 250)',
                ],
                borderWidth: 1,
            },
        ],

    }
    const options = {
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff',
                },
            }
        },

    }
    return (
        <section className='statistic' >
            <Pie data={data} options={options} />
        </section>
    )

}
