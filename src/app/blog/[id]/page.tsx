import BackButton from '@/components/BackButton'
import ButtonAction from '@/components/ButtonAction'
import { db } from '@/lib/db'
import { FC } from 'react'

interface BlogDetailPageProps {
  params: {
    id: string
  }
}

async function getPosts(id: string) {
  const response = await db.post.findFirst({
    where: {
      id: id
    },
    select: {
      id: true,
      title: true,
      content: true,
      tag: true
    }
  })
  return response
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  console.log(params.id)
  const post = await getPosts(params.id);


  return (
    <div>
        <BackButton />
        <div className='mb-8'>
            <h2 className='text-2xl font-bold my-4'>{post?.title} <span className="badge badge-neutral">{post?.tag.name}</span></h2>
            <p className='text-slate-500'>{post?.content}</p>

        </div>
        <ButtonAction id={params.id}/>

    </div>
  )
}

export default BlogDetailPage
