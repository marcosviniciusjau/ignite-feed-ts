import { ImgHTMLAttributes } from 'react'
import styles from './ProfileImg.module.css'

interface ProfileImgProps extends ImgHTMLAttributes<HTMLImageElement>{
    hasBorder?: boolean
}

export function ProfileImg({hasBorder = true, ...props}: ProfileImgProps){
    return(
        <img 
         className={hasBorder ? styles.profileImgWithBorder : styles.profileImg}
         {...props}
         />
    );
}