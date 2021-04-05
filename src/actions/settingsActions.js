import { ALLOW_REGISTRATIONS, DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT } from "./types"

export const setDisabledBalanceOnAdd = () => {
    const settings = JSON.parse(localStorage.getItem('settings'))
    settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;
    localStorage.setItem('settings',JSON.stringify(settings))
    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd
    }
}

export const setDisabledBalanceOnEdit = () => {
    const settings = JSON.parse(localStorage.getItem('settings'))
    settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;
    localStorage.setItem('settings',JSON.stringify(settings))

    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
    }
}

export const setAllowRegistration = () => {
    const settings = JSON.parse(localStorage.getItem('settings'))
    settings.allowRegistration = !settings.allowRegistration;
    localStorage.setItem('settings',JSON.stringify(settings))

    return {
        type: ALLOW_REGISTRATIONS,
        payload: settings.allowRegistration
    }
}