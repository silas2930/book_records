import PostCard from '@/components/PostCard'
import { db } from '@/lib/db';
import { BookOpenText } from 'lucide-react'


function getPosts() {
  const response =  db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return response
}


export default async function Home() {

  // const posts = await db.post.findMany({
  //   select: {
  //     id: true,
  //     title: true,
  //     content: true,
  //     tag: true,
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // })
  const posts = await db.post.findMany()
  console.log(posts)
  return (
    <div>
        <div className="mt-5 bg-blue-900 py-4 flex text-white items-center justify-center text-4xl font-bold">
          <BookOpenText className='mr-2' />
            Book Records
        </div>      
        <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        
          {posts.map(post => (
            <PostCard key={post.id} post={post}/>
          ))}
      </main>
    </div>
  )
}
