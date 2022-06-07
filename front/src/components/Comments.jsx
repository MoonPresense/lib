import React, { useEffect, useState } from 'react'
import UserService from '../services/UserService';
import '../css/comment.css'
import Comment from './Comment';
import CommentsSection from './CommentSection';
import { useParams } from 'react-router-dom';

const Comments = ({ idCard, userId }) => {
  const [backCom, setBackCom] = useState([]);
  const [activeComment, setActiveComment] = useState(null)
  const createdAt = new Date().toISOString();
  const { id_book } = useParams();
  
  const rootComments = backCom
    .filter(
      (backendComment) => backendComment.parentId === null
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const getReplies = (commentId) => {
    return backCom
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }


  useEffect(() => {
    const fetchData = async () => {
      const responce = await UserService.getComments();
      setBackCom(responce.data);
    }
    fetchData();
    
  }, [])
  const addComment = async (text, parentId) => {
    
    await UserService.addComment(
      idCard,
      text,
      parentId,
      userId,
      createdAt)
      .then(comment => {
        setBackCom([comment, ...backCom])
        window.location.reload();
      })
  };

  const updateComment = async (text, commentId) => {
    await UserService.updateComment(
      text,
      commentId,
      createdAt)
      .then(() => {
        const updatedBackendComments = backCom.map(backendComment => {
          if (backendComment.id === commentId) {
            return {...backendComment, text: text};
          }
          return backendComment
        });
        setBackCom(updatedBackendComments);
        setActiveComment('')
      });
  };

  const deleteComment = async (commentId) => {
    if (window.confirm('Вы уверены?')) {
      await UserService.deleteComment(commentId).then(() => {
        const updateBackendComments = backCom.filter(
          backendComment => backendComment.id !== commentId
        );
        setBackCom(updateBackendComments)
      })
    }
  }


  return (
    <div className='comments'>
      <h3 className='comments-title'>Комментарии</h3>
      <div className='comment-form-title'>Оставьте комментарий</div>
      <CommentsSection submitLabel='Отправить' handleSubmit={addComment} />
      <div className='comments-contaier'>
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            userId={userId}
            idCard={idCard}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  )
}

export default Comments