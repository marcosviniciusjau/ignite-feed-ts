import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FormEvent, useState,ChangeEvent, InvalidEvent } from 'react'

import { Comment } from './Comment'
import { ProfileImg } from './ProfileImg'
import {MessageError} from './MessageError'

import styles from './Post.module.css'

interface Author{
    name: string;
    role: string;
    profileUrl: string;
}

interface Content{
    type: 'paragraph' | 'link';
    content: string
}

export interface PostType{
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps{
  post:PostType
}

export function Post({post}:PostProps){
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [error,setError] = useState(false)
    const [messageError,setMessageError] = useState('')

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", 
    {
        locale: ptBR
    })

    const publishedDateRelativeToNow= formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateComments(event:FormEvent<HTMLFormElement>){
        event.preventDefault();

        if (comments.includes(newComment as never)) {
            setError(true);
            setMessageError('Esse comentário já foi adicionado');
            setTimeout(() => {
                setError(false);
                setMessageError('');
            }, 1000);
        }
        else if (newComment.length < 2) {
            setError(true);
            setMessageError('O comentário precisa ter mais de 1 caractere')
            setTimeout(() => {
                setError(false);
                setMessageError('');
            }, 1000);
        }
        else {
            setComments([...comments, newComment as never]);
            setNewComment('');
        }
    }



    function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('');
        setNewComment(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    function deleteComment(commentToDelete:string){
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })

        setComments(commentsWithoutDeletedOne)
    }

    const isNewCommentEmpty = newComment.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <ProfileImg src={post.author.profileUrl}/>
                   <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
                </header>

                <div className={styles.content}>
                    {post.content.map(line => {
                        if(line.type === 'paragraph'){
                            return <p key={line.content}>{line.content}</p>
                        }else if(line.type === 'link'){
                            return <p key={line.content}><a href="#">{line.content}</a></p>
                        }
                    })}
                    </div>

                <form onSubmit={handleCreateComments} className={styles.commentForm} >
                    <strong>Deixe seu feedback</strong>
                    <textarea 
                        placeholder="Deixe um comentário"
                        name="comment"
                        value={newComment}
                        onChange={handleNewCommentChange}
                        onInvalid={handleNewCommentInvalid}
                        required
                        />
                    <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                    </footer>
                </form>
                {
                    error ? <MessageError message={messageError}/> : null
                }
                
                <div className={styles.commentList}>
                    {comments.map(comment => {
                        return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
                    })}
                </div>
                </article>
    )
}