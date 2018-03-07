import * as types from '../constants/comments_action_types'

export const addComment = payload => ({ type: types.ADD_COMMENT, payload })
export const deleteComment = payload => ({ type: types.DELETE_COMMENT, payload })
