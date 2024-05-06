import styles from './Comment.module.css'
import { Trash, ThumbsUp } from 'phosphor-react'
import { ProfileImg } from './ProfileImg'
import { useState } from 'react'

interface CommentProps{
    content: string
    onDeleteComment: (comment: string) => void
}

export function Comment({content, onDeleteComment}: CommentProps){
    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment(){
        onDeleteComment(content)
    }

    function handleLikeComment(){
        setLikeCount((state) => {
            return state + 1
        })
    }

    return(
            <div className={styles.comment}>
                <ProfileImg 
                 hasBorder={false}
                 src="https://github.com/marcosviniciusjau.png" 
                 alt=""
                 title=""
                 />
                <div className={styles.commentBox}>
                    <div className={styles.commentContent}>
                        <header>
                            <div className={styles.authorAndTime}>
                                <strong>Marcos Vinicius</strong>
                                <time title="02 de Maio às 12:01h" dateTime="2024-05-02 12:01:30">Cerca de 1h atrás</time>
                            </div>

                            <button onClick={handleDeleteComment} title="Deletar comentário">
                                <Trash size={24}/>
                            </button>
                        </header>
                        <p>{content}</p>
            </div>
            <footer>
                <button onClick={handleLikeComment}>
                    <ThumbsUp/>
                    Aplaudir <span>{likeCount}</span>
                </button>
            </footer>
        </div>
        </div>
    )
}