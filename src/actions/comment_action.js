import * as types from '../constants/comments_action_types'

export const allComment = payload => ({ type: types.ALL_COMMENT, payload })
export const addComment = payload => ({ type: types.ADD_COMMENT, payload })
export const deleteComment = payload => ({ type: types.DELETE_COMMENT, payload })

/*
weiboContainer（微博容器组件
    weiboInput
    weiboList
        weiboItem_1
            commentContainer（评论容器组件
                commentInput
                commentList
                    commentItem
        weiboItem_2
            commentContainer（评论容器组件
                commentInput
                commentList
                    commentItem
*/