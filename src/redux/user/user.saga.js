import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed, signOutSuccess, signOutFailed } from "./user.action";
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signUserInWithEmailAngPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(authUser, details = {}) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, authUser, details);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailed(error));
  }

}

export function* signInWithGoogle() {
  try {
    console.log('got here')
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
    yield put(signInSuccess(user, displayName))
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signInAfterSignUp({ payload: user, additionalDetails }) {
  try {
    yield call(getSnapshotFromUserAuth, user, additionalDetails)
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser)
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailed(error))
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signUserInWithEmailAngPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuth() {
  try {
    const authUser = yield call(getCurrentUser);
    if (!authUser) return;
    yield call(getSnapshotFromUserAuth, authUser);
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* onGoogleSingInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailAndPasswordSingInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSeccion() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuth)
}

export function* onSignUpstart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
  yield all([
    call(onCheckUserSeccion),
    call(onGoogleSingInStart),
    call(onEmailAndPasswordSingInStart),
    call(onSignUpstart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ])
}