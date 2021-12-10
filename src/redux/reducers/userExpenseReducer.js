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
            let newState = { ...state }
            // console.warn("REMOVE TO CART")
            newState.expenseDetails = action.payload.expenseInfo
            newState.loading = false
            return newState
        }

        case 'FETCH_CATEGORYINFO_SUCCESS': {
            let newState = { ...state }
            newState.categoryInfo = action.payload.categoryInfo
            newState.loading = false
            return newState
        }

        case 'FETCH_EXPENSE_FAILED': {
            let newState = { ...state }
            // console.warn("REMOVE TO CART")
            newStateloading =false
            newState.error = true
            return newState
        }

        default:
            return state
    }
}

export default userExpenseReducer