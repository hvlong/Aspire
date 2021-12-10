
let defaultState = {
    weeklyLimit:'5000',
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

        case 'SET_WEEKLY_LIMIT_SUCCESS': {
            // console.warn('SET_WEEKLY_LIMIT_SUCCESS', action.WeeklyLimitValue)
            return {
                ...state,
                weeklyLimit: action.WeeklyLimitValue,
            }
        }

        default:
            return state
    }
}

export default userExpenseReducer