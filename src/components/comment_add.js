import React, { Component } from 'react'

class CommentAdd extends Component {
    state = {
        weibo_id: this.props.weibo_id,
        comment: ''
    }

    handleSubmit = () => {
        const text = this.state.comment.trim()
        if (text.length > 0) {
            this.props.addComment(this.state)
            console.log(this.state)
        }
        let newState = {
            text: ''
        }
        this.setState(newState)
    }

    handleChange = e => {
        let val = e.target.value
        let newState = {
            comment: val
        }
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <input
                    placeholder="输入你的评论"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>评论</button>
            </div>
        )
    }
}

export default CommentAdd;

