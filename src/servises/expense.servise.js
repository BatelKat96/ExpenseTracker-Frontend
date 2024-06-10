import { httpService } from './http.service'
const BASE_URL = 'expense/'

export const expenseService = {
    query,
    getById,
    save,
    remove,
    getCategoryExpenses,
    getDefaultFilter,
    getEmptyExpense
}

async function query(filterBy) {
    let expenses = await httpService.get(BASE_URL)

    const { date, categorys } = filterBy
    if (date) {
        expenses = expenses.filter(expense => expense.date > date)
    }
    if (categorys.length) {
        expenses = expenses.filter(expense => categorys.includes(expense.category))
    }
    return expenses
}

function getById(expenseId) {
    return httpService.get(BASE_URL + expenseId)
}

function remove(expenseId) {
    return httpService.delete(BASE_URL + expenseId)
}

function save(expense) {

    if (expense._id) {
        return httpService.put(BASE_URL, expense)
    } else {
        return httpService.post(BASE_URL, expense)
    }
}

async function getCategoryExpenses() {
    return await httpService.get(BASE_URL).then((expenses) => {
        const categoryExpenses = {}
        expenses.forEach((expense) => {
            if (categoryExpenses[expense.category]) {
                categoryExpenses[expense.category] += +expense.amount
            } else {
                categoryExpenses[expense.category] = +expense.amount
            }
        })

        const categoryCountArray = Object.entries(categoryExpenses).map(([category, expense]) => ({
            category,
            expense,
        }))
        return categoryCountArray
    })
}


function getEmptyExpense() {
    return {
        amount: '',
        category: '',
        date: Date.now(),
        notes: ''
    }
}
function getDefaultFilter() {
    return {
        categorys: [],
        date: '',
    }
}


// function _createExpenses() {
//     let expenses = utilService.loadFromStorage(STORAGE_KEY)
//     if (!expenses || !expenses.length) {
//         expenses = [
//             { _id: utilService.makeId(), amount: 100, category: 'Food', date: 1709970490000, notes: '' },
//             { _id: utilService.makeId(), amount: 50, category: 'Transport', date: 1709106490000, notes: 'To my mother' },
//             { _id: utilService.makeId(), amount: 32, category: 'Utilities', date: 1709128090000, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
//             { _id: utilService.makeId(), amount: 252, category: 'Food', date: 1709049730000, notes: 'For Ally birthday' }
//         ]
//         utilService.saveToStorage(STORAGE_KEY, expenses)
//     }
// }