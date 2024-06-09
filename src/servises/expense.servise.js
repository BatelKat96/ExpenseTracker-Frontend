import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const expenseService = {
    query
}

const STORAGE_KEY = 'expense_DB'

_createExpenses()

async function query() {
    let expenses = await storageService.query(STORAGE_KEY)
    return expenses
}

function _createExpenses() {
    let expenses = utilService.loadFromStorage(STORAGE_KEY)
    if (!expenses || !expenses.length) {
        expenses = [
            { _id: utilService.makeId(), amount: 100, category: 'Food', date: 1709970490, notes: '' },
            { _id: utilService.makeId(), amount: 50, category: 'Transport', date: 1709106490, notes: 'To my mother' },
            { _id: utilService.makeId(), amount: 32, category: 'Utilities', date: 1709128090, notes: '' },
            { _id: utilService.makeId(), amount: 252, category: 'Food', date: 1709049730, notes: 'For Ally birthday' }
        ]
        utilService.saveToStorage(STORAGE_KEY, expenses)
    }
}