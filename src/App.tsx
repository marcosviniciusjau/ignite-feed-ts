import {Header} from './components/Header';
import { Post,PostType } from "./components/Post";
import './global.css';

import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';

const posts: PostType[]=[
  {
    id: 1,
    author: {
      name: "Marcos Vinicius",
      profileUrl:"https://github.com/marcosviniciusjau.png",
      role:"Web Developer"
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare'}
    ],
    publishedAt: new Date('2024-05-03 09:02:00')
  },
  {
    id: 2,
    author: {
      name: "Mayk Brito",
      profileUrl:"https://github.com/maykbrito.png",
      role:"Educator"
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare'}
    ],
    publishedAt: new Date('2024-04-13 09:02:00')
  }
]

export function App() {
  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
        </div>
    </div>
  );
}