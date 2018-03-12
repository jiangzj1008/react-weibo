import * as types from '../constants/comments_action_types'

export const allComment = payload => ({ type: types.ALL_COMMENT, payload })
export const hideComment = payload => ({ type: types.HIDE_COMMENT, payload })
export const addComment = payload => ({ type: types.ADD_COMMENT, payload })
export const deleteComment = payload => ({ type: types.DELETE_COMMENT, payload })
