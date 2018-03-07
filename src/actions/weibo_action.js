import * as types from '../constants/ActionTypes'

export const addWeibo = text => ({ type: types.ADD_WEIBO, text })
export const deleteWeibo = id => ({ type: types.DELETE_WEIBO, id })
