import {
    ALL_WEIBO,
    ADD_WEIBO,
    DELETE_WEIBO,
} from '../constants/ActionTypes'

import {
    ALL_COMMENT,
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

const get = (state, wid) => {
    const w = state.filter((item) => {
        return item.id === wid
    })
    return w[0]
}

const allComment = (state, action) => {
    const commentList = action.payload
    const newState = state.map((m) => {
        const {user, weibo} = m
        if (m.weibo.id === commentList[0].comment.weiboId) {
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

const pushComment = (weibo, comment) => {
    let id = 0
    let cs = weibo.comments
    if (cs.length > 0) {
        id = cs[cs.length-1]["id"] + 1
    }
    weibo.comments = [
        ...cs,
        {
            id: id,
            text: comment,
        }
    ]
    return weibo
}

const addComment = (state, action) => {
    const {weibo_id, comment} = action.payload
    let w = get(state, weibo_id)
    w = pushComment(w, comment)
    const newState = state.map((weibo) => {
        if (weibo.id === weibo_id) {
            return w
        }
        return weibo
    })
    return newState
}

const removeComment = (weibo, comment_id) => {
    const cs = weibo.comments
    const temp = cs.filter((c) => {
        return c.id !== comment_id
    })
    weibo.comments = temp
    console.log(weibo)
    return weibo
}

const deleteComment = (state, action) => {
    const {weibo_id, comment_id} = action.payload
    let w = get(state, weibo_id)
    w = removeComment(w, comment_id)
    const newState = state.map((weibo) => {
        if (weibo.id === weibo_id) {
            return w
        }
        return weibo
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
        [ALL_COMMENT]: allComment,
        [ADD_COMMENT]: addComment,
        [DELETE_COMMENT]: deleteComment,
    }
    const type = action.type
    const op = actionMapper[type] || noop
    const newState = op(state, action)
    return newState
}

export default reducer
