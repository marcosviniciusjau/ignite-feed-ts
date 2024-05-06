import styles from './MessageError.module.css'
export function MessageError({message}){
    return(
        <div className={styles.messageError}>
            <p>{message}</p>
        </div>
    )
}