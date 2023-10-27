import PostCard from '@/components/PostCard'
import { useState } from 'react';
import { db } from '@/lib/db';
import { BookOpenText } from 'lucide-react'


async function getPosts() {
  const response = await db.post.findMany({
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

  const posts = await getPosts()
  const tags = await db.tag.findMany()

  return (
    <div>
      {/* <div className="mb-4 mt-10">
        <label className="mr-4">Display by tag:</label>
        <select className="select select-bordered w-full max-w-sm">
            <option value="all">All</option>
              {tags?.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
              ))}
        </select>
      </div> */}
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
