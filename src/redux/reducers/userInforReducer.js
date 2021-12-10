let defaultState = {
    loading: true,
    userDetails: [],
    error: false
}

let userInforReducer = (state = defaultState, action) => {
    switch (action.type) {
        
        case 'FETCH_USER_DETAILS_SUCCESS': {
            return {
                ...state,
                userDetails:action.userinfo,
                loading:  action.loading,
              };
        }

        case 'FETCH_USER_DETAILS_FAILED': {
            return {
                ...state,
                error:  true,
              };
        }

        default:
            return state
    }
}

export default userInforReducer