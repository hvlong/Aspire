let defaultState = {
    loading: true,
    userDetails: [],
    error: false
}

let userInforReducer = (state = defaultState, action) => {
    switch (action.type) {
        
        case 'FETCH_USER_DETAILS_SUCCESS': {
            let newState = { ...state }
            // console.warn("REMOVE TO CART")
            newState.userDetails = action.payload.userinfo
            newState.loading = false
            return newState
        }

        case 'FETCH_USER_DETAILS_FAILED': {
            let newState = { ...state }
            // console.warn("REMOVE TO CART")
            newState.error = true
            return newState
        }

        default:
            return state
    }
}

export default userInforReducer