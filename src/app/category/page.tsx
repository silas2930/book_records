'use client'

import BackButton from '@/components/BackButton'
import FormTag from '@/components/FormTag'
import { FormInputTags } from '@/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'

const CreatePage = () => {
  const router = useRouter()
  const handleCreateTag: SubmitHandler<FormInputTags> = (data) => {
    createTag(data )
  }

  const { mutate: createTag, isLoading } = useMutation({
    mutationFn: (newTag: FormInputTags) => {
      return axios.post('/api/tags/create', newTag)
    },
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      router.push('/')
      router.refresh()
    }
  })
  return (
    <div>
        <BackButton />
        <h1 className='text-2xl my-4 font-bold text-center'>Add new category</h1>
        <FormTag submit={handleCreateTag} />
    </div>
  )
}

export default CreatePage
