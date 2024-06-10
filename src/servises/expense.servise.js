import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const expenseService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyExpense
}

const STORAGE_KEY = 'expense_DB'

_createExpenses()

async function query(filterBy) {
    let expenses = await storageService.query(STORAGE_KEY)
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
    return storageService.get(STORAGE_KEY, expenseId)
}

function remove(expenseId) {
    return storageService.remove(STORAGE_KEY, expenseId)
}

function save(expense) {

    if (expense._id) {
        return storageService.put(STORAGE_KEY, expense)
    } else {
        return storageService.post(STORAGE_KEY, expense)
    }
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


function _createExpenses() {
    let expenses = utilService.loadFromStorage(STORAGE_KEY)
    if (!expenses || !expenses.length) {
        expenses = [
            { _id: utilService.makeId(), amount: 100, category: 'Food', date: 1709970490000, notes: '' },
            { _id: utilService.makeId(), amount: 50, category: 'Transport', date: 1709106490000, notes: 'To my mother' },
            { _id: utilService.makeId(), amount: 32, category: 'Utilities', date: 1709128090000, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
            { _id: utilService.makeId(), amount: 252, category: 'Food', date: 1709049730000, notes: 'For Ally birthday' }
        ]
        utilService.saveToStorage(STORAGE_KEY, expenses)
    }
}