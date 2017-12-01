import { combineReducers } from 'redux'
import { listUsers, setUser, editUser } from './admin';
import { listNews } from './news';
import { listDocs } from './documents';
import { orgData, orgStatus } from './org';
import { usersData } from './user';
import { loginIsPending, loginHasErrored, userIsAdmin, sessionChange } from './session';
import { isBusy, hasErrored  } from './utils';
import { qboAuth } from './qbo';
import { accountsData } from './acct';

// This is what controls the state object shape - no duplicate keys allowed
export default combineReducers({
    // General 
    isBusy: isBusy
    , hasErrored: hasErrored
    // Session
    , session: sessionChange 
    , loginHasErrored: loginHasErrored
    , loginIsPending: loginIsPending
    , userIsAdmin: userIsAdmin
    // User
    , users: usersData
    //user: [setUser,editUser]
    , user: setUser
    , editUser: editUser
    // Orgs
    , orgs: orgData
    , orgStatus: orgStatus
    // Other
    , news: listNews
    , docs: listDocs
    // QuickBooksOnline
    , qboAuth: qboAuth
    , accounts: accountsData
});