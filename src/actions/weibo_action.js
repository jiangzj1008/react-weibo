import * as types from '../constants/ActionTypes'

export const addWeibo = payload => ({ type: types.ADD_WEIBO, payload })
export const allWeibo = payload => ({ type: types.ALL_WEIBO, payload })
export const deleteWeibo = payload => ({ type: types.DELETE_WEIBO, payload })
