import {
    takeLatest,
    put,
    call,
  } from 'redux-saga/effects';
  import {
    getUserCardDetails,
  } from '../../api/userinfo-api';



function* getCardInfo() {
    
    try {
        yield put({ type: 'CARD_INFO_REQUEST' });
        const cardInfo = yield call(getUserCardDetails);
        yield put({ type: 'FETCH_USER_DETAILS_SUCCESS', userinfo: cardInfo,loading:false });
    } catch (error) {
        yield put({ type: 'FETCH_USER_DETAILS_FAILED', error: true });
    }
}



export function* ticketsViews() {
  yield takeLatest('FETCH_USER_CARD_INFO', getCardInfo);
}
  
