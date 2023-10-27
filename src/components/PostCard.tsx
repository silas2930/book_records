import { Tag } from '@prisma/client'
import { FC } from 'react'
import Link from 'next/link'
import React from 'react'

interface PostCardProps{
  post: {
    id: string
    title: string
    content: string
    tag: Tag
  }
}
const PostCard: FC<PostCardProps> = ({ post }) => {
  const { id, title, content, tag } = post
  return (
    <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body bg-gray-900">
            <h2 className="card-title">{title}</h2>
            <span className="badge badge-neutral">{tag.name}</span>
            <p className="max-h-40 overflow-hidden whitespace-nowrap overflow-ellipsis italic">{content}</p>
            <div className="card-actions justify-end">
              
              <Link href={`/blog/${id}`} className='hover:underline link link-primary'>Read more...</Link>
            </div>
        </div>
    </div>
  )
}

export default PostCard
