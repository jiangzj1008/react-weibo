import {
    ADD_WEIBO,
    DELETE_WEIBO,
} from '../constants/ActionTypes'

import {
    ADD_COMMENT,
    DELETE_COMMENT,
} from '../constants/comments_action_types'

const initialState = [
  {
      id: 0,
      text: 'Use Redux',
      comments: [
          {
              id: 0,
              text: '评论1',
          },
          {
              id: 1,
              text: '评论21',
          },
      ],
  }
]

const addWeibo = (state, action) => {
    let id = 0
    if (state.length > 0) {
        id = state[state.length-1]["id"] + 1
    }
    return [
        ...state,
        {
            id: id,
            text: action.text,
            comments: [],
        }
    ]
}

const deleteWeibo = (state, action) => {
    let newState = state.filter((weibo) => {
        return weibo.id !== action.id
    })
    return newState
}

const get = (state, wid) => {
    const w = state.filter((item) => {
        return item.id === wid
    })
    return w[0]
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
        [DELETE_WEIBO]: deleteWeibo,
        [ADD_COMMENT]: addComment,
        [DELETE_COMMENT]: deleteComment,
    }
    const type = action.type
    const op = actionMapper[type] || noop
    const newState = op(state, action)
    return newState
}

export default reducer
