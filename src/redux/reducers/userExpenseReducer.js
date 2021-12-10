let defaultState = {
    loading: false,
    expenseDetails: [],
    userName: '',
    userId: '',
    error: false
}

let userExpenseReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_EXPENSE_DETAILS': {
            let newState = { ...state }
            // console.warn("REMOVE TO CART")
            newState.loading = true
            return newState
        }
        case 'FETCH_EXPENSE_SUCCESS': {
            let newState = { ...state }
            // console.warn("REMOVE TO CART")
            newState.expenseDetails = [...action.payload]
            newState.loading = false
            return newState
        }

        case 'FETCH_EXPENSE_FAILED': {
            let newState = { ...state }
            // console.warn("REMOVE TO CART")
            newState.error = true
            return newState
        }

        default:
            return state
    }
}

export default userExpenseReducer