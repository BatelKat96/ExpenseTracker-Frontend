import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const expenseService = {
    query,
    save,
    getEmptyExpense
}

const STORAGE_KEY = 'expense_DB'

_createExpenses()

async function query() {
    let expenses = await storageService.query(STORAGE_KEY)
    return expenses
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


function _createExpenses() {
    let expenses = utilService.loadFromStorage(STORAGE_KEY)
    if (!expenses || !expenses.length) {
        expenses = [
            { _id: utilService.makeId(), amount: 100, category: 'Food', date: 1709970490000, notes: '' },
            { _id: utilService.makeId(), amount: 50, category: 'Transport', date: 1709106490000, notes: 'To my mother' },
            { _id: utilService.makeId(), amount: 32, category: 'Utilities', date: 1709128090000, notes: '' },
            { _id: utilService.makeId(), amount: 252, category: 'Food', date: 1709049730000, notes: 'For Ally birthday' }
        ]
        utilService.saveToStorage(STORAGE_KEY, expenses)
    }
}