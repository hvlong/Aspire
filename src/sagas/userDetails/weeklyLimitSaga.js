import {
    takeLatest,
    put,
    call,
  } from 'redux-saga/effects';
  import {
    getExpenseCategoryFromAPI,
    getExpenseHistoryFromAPI
  } from '../../api/userinfo-api';



function* getExpenseInfo() {
    
    try {
        // yield put({ type: 'CARD_INFO_REQUEST' });
        const expenseInfo = yield call(getExpenseHistoryFromAPI);
        yield put({ type: 'FETCH_EXPENSE_SUCCESS', expenseInfo: expenseInfo,loading:false });
    } catch (error) {
        yield put({ type: 'FETCH_EXPENSE_FAILED', error: true });
    }
}


function* getCategoryInfo() {
    
    try {
        // yield put({ type: 'CARD_INFO_REQUEST' });
        const categoryInfo = yield call(getExpenseCategoryFromAPI);
        yield put({ type: 'FETCH_CATEGORYINFO_SUCCESS', categoryInfo: categoryInfo,loading:false });
    } catch (error) {
        yield put({ type: 'FETCH_EXPENSE_FAILED', error: true });
    }
}




export function* userExpenseHistory() {
  yield takeLatest('FETCH_USER_EXPENSE_HISTORY_INFO', getExpenseInfo);
}

export function* userExpenseCategoryInfo() {
    yield takeLatest('FETCH_USER_EXPENSE_CATEGORY_INFO', getCategoryInfo);
  }
  
