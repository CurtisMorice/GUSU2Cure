import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import resourceSaga from './resourceSaga';
import articleSaga from './articleSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    resourceSaga(),
    articleSaga()
    // watchIncrementAsync()
  ]);
}
