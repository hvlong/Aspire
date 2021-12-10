import { TabRouter } from "@react-navigation/native"

let defaultState = {
    loading: true,
    expenseDetails: [],
    categoryInfo:[],
    userName: '',
    userId: '',
    error: false
}

let userExpenseReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_EXPENSE_SUCCESS': {
            return {
                ...state,
                expenseDetails:action.expenseInfo,
                loading: false
            }
        }

        case 'FETCH_CATEGORYINFO_SUCCESS': {
            return {
                ...state,
                categoryInfo:action.categoryInfo,
                loading: false
            }
        }

        case 'FETCH_EXPENSE_FAILED': {
            return {
                ...state,
                loading: false,
                error: true
            }
        }

        default:
            return state
    }
}

export default userExpenseReducer