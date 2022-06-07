import React, { useState } from 'react'
import "../css/comment.css"
import Comments from './Comments'

const CommentsSection = ({ handleSubmit, submitLabel, hasCancelButton = false, initialText = '', handleCancel }) => {
  const [text, setText] = useState(initialText);

  const isTextareaDisabled = text.length === 0;
  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(text);
    setText('');
  }

  return (

    <div className='comments'>
      <form
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '55ch' },
        }}
        onSubmit={onSubmit}
      >

        <textarea
          className='comment-form-textarea'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="comment-form-button" disabled={isTextareaDisabled}>
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button 
            className='comment-form-button comment-form-cancel-button'
            onClick={handleCancel}
          >Отмена</button>
        )}
      </form>
    </div>
  )
}

export default CommentsSection