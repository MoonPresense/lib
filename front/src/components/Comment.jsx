import React from 'react'
import '../css/comment.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentsSection from './CommentSection';

const Comment = ({ comment, replies, userId ,updateComment, deleteComment, activeComment, setActiveComment, parentId = null, addComment }) => {
    const createdAt = new Date(comment.createdAt).toLocaleString();
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canReply = Boolean(userId);
    const canEdit = userId === comment.user_id && !timePassed;
    const canDelete = userId === comment.user_id && !timePassed;
    const isReplying =
        activeComment &&
        activeComment.type === 'replying' &&
        activeComment.id === comment.id;
    const isEditing =
        activeComment &&
        activeComment.type === 'editing' &&
        activeComment.id === comment.id;

    const replyId = parentId ? parentId : comment.id;

    return (
        <div className='comment'>
            <div className='comment-image-container'>
                <AccountCircleIcon />
            </div>
            <div className='comment-right-part'>
                <div className='comment-content'>
                    <div className='comment-author'>
                        jack
                    </div>
                    <div>{createdAt}</div>
                </div>
                {!isEditing &&
                    <div className='comment-text'>{comment.text}</div>
                }
                {isEditing && (
                    <CommentsSection
                        submitLabel='Редактировать'
                        hasCancelButton
                        initialText={comment.text}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                        />
                )}
                <div className='comment-actions'>
                    {canReply && (
                        <div className='comment-action'
                            onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}
                        >Ответить</div>
                    )}
                    {canEdit && (
                        <div className='comment-action'
                            onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}
                        >Редактировать</div>
                    )}
                    {canDelete && (
                        <div className='comment-action' onClick={() => deleteComment(comment.id)}>Удалить</div>
                    )}
                </div>
                {isReplying && (
                    <CommentsSection
                        submitLabel='Ответить'
                        handleSubmit={(text) => addComment(text, replyId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                replies={[]}
                                userId={userId}
                                deleteComment={deleteComment}
                                updateComment={updateComment}
                                parentId={comment.id}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                addComment={addComment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment;