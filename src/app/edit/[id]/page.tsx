'use client'

import FormPost from '@/components/FormPost'
import BackButton from '@/components/BackButton'
import { FormInputPost } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { SubmitHandler } from 'react-hook-form'
import axios from 'axios'

interface EditPostPageProps {
  params: {
    id: string
  }
}
const EditPostPage: FC<EditPostPageProps> = ({ params }) => {
  const { id } = params
  const router = useRouter()

  const { data: dataPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/${id}`)
      return response.data
    }
  })

  const { mutate: updatePost, isLoading: isLoadingSubmit } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.patch(`/api/posts/${id}`, newPost)
    },
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      router.push('/')
      router.refresh()
    }
  })
  
  const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
      updatePost(data )
  }
  if(isLoadingPost){
    return ( 
      <div className='text-center'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    )
  }
  return (
    <div>
        <BackButton />
        <h1 className='text-2xl my-4 font-bold text-center'>Edit book</h1>
        <FormPost submit={handleEditPost} initValue={dataPost} isEdit/>
    </div>
  )
}

export default EditPostPage
