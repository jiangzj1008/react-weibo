import {
    ALL_WEIBO,
    ADD_WEIBO,
    DELETE_WEIBO,
} from '../constants/ActionTypes'

import {
    ALL_COMMENT,
    HIDE_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
} from '../constants/comments_action_types'

const initialState = [
  {
      user: {
          username: 'gee',
          id: 'gee_id',
      },
      weibo: {
          id: 0,
          content: 'Use Redux',
      }
  }
]

const allWeibo = (state, action) => {
    return action.payload
}

const addWeibo = (state, action) => {
    return [...state, action.payload]
}

const deleteWeibo = (state, action) => {
    let newState = state.filter((item) => {
        return item.weibo.id !== action.payload.wid
    })
    return newState
}

const showComment = (state, action) => {
    const {weiboId, commentList} = action.payload
    const newState = state.map((m) => {
        const {user, weibo} = m
        if (m.weibo.id === weiboId) {
            return {
                user,
                weibo,
                commentList
            }
        } else {
            return m
        }
    })
    return newState
}

const hideComment = (state, action) => {
    const {weiboId} = action.payload
    const newState = state.map((m) => {
        const {user, weibo} = m
        if (m.weibo.id === weiboId) {
            return {
                user,
                weibo
            }
        } else {
            return m
        }
    })
    return newState
}

const addComment = (state, action) => {
    const {comment} = action.payload
    const wid = comment.weiboId
    const newState = state.map((m) => {
        const {user, weibo, commentList} = m
        if (weibo.id === wid) {
            return {
                user,
                weibo,
                commentList: [
                    ...commentList,
                    action.payload
                ]
            }
        }
        return m
    })
    return newState
}

const deleteComment = (state, action) => {
    const {comment} = action.payload
    const wid = comment.weiboId
    const newState = state.map((m) => {
        const {user, weibo, commentList} = m
        if (weibo.id === wid) {
            const newList = commentList.filter((c) => {
                return c.comment.id !== comment.id
            })
            return {
                user,
                weibo,
                commentList: newList,
            }
        }
        return m
    })
    return newState
}

const noop = (state, action)  => {
    return state
}

const reducer = function(state = initialState, action) {
    const actionMapper = {
        [ADD_WEIBO]: addWeibo,
        [ALL_WEIBO]: allWeibo,
        [DELETE_WEIBO]: deleteWeibo,
        [ALL_COMMENT]: showComment,
        [HIDE_COMMENT]: hideComment,
        [ADD_COMMENT]: addComment,
        [DELETE_COMMENT]: deleteComment,
    }
    const type = action.type
    const op = actionMapper[type] || noop
    const newState = op(state, action)
    return newState
}

export default reducer
