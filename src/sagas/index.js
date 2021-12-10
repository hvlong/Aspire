// Imports: Dependencies
import {all, fork} from 'redux-saga/effects';
import {ticketsViews} from './userDetails/cardInfoSaga'
import{userExpenseHistory,userExpenseCategoryInfo,userWeekLyLimitValue} from './userDetails/weeklyLimitSaga'


export function* rootSaga() {
  yield all([
    fork(ticketsViews),
    fork(userExpenseHistory),
    fork(userExpenseCategoryInfo),
    fork(userWeekLyLimitValue)
  ]
  );
}
