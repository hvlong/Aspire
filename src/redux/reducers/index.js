import {combineReducers} from 'redux'
import userInforReducer from './userInforReducer'
import userExpenseReducer from './userExpenseReducer'

let reducers = combineReducers({
    userInforReducer:userInforReducer,
    userExpenseReducer:userExpenseReducer
})

const rootReducer =(state,action)=>{
    return reducers(state,action)
}

export default rootReducer;