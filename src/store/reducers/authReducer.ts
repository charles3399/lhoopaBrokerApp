import AUTH from '_const/authConst';
import { create } from 'zustand'

type AuthStore = {
    loggedIn: boolean;
    user: any;
    isInit: boolean;
    counter: number;
    syncing: boolean;
    lastSync: any;
    loginMethod: any;
    initTutorial: boolean;
    tutorialStatus: boolean;
    incomplete_user_info: any;
    showAnnouncement: boolean;
    doNotShowAnnouncementAgain: boolean;
    announcementContent: any[];
    updateUser: (newUser: any, newLoginMethod: boolean | string) => void;
    logout: () => void;
}

const initialState = {
    loggedIn: false,
    user: null,
    isInit: false,
    counter: 0,
    syncing: false,
    lastSync: null,
    loginMethod: null,
    initTutorial: true,
    tutorialStatus: true, // this should be in the submitted property reducer but the get request is resets the whole store, making this state reset as well
    incomplete_user_info: null,
    showAnnouncement: true,
    doNotShowAnnouncementAgain: false,
    announcementContent: [],
}

const useAuthStore = create<AuthStore>((set) => ({
    loggedIn: false,
	user: null,
	isInit: false,
	counter: 0,
	syncing: false,
	lastSync: null,
	loginMethod: null,
	initTutorial: true,
	tutorialStatus: true,
	incomplete_user_info: null,
	showAnnouncement: true,
	doNotShowAnnouncementAgain: false,
	announcementContent: [],
    updateUser: (newUser, newLoginMethod = false) => set((state) => ({
        user: newUser,
        loginMethod: newLoginMethod ? newLoginMethod : state.loginMethod,
    })),
    logout: () => set(({ ...initialState }))
}))

export default useAuthStore;