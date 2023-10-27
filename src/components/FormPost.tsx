'use client'

import { FormInputPost } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'; 
import { Tag } from '@prisma/client'
import { PlusCircle } from 'lucide-react'


interface FormPostProps {
    submit: SubmitHandler<FormInputPost>
    isEdit: boolean
    initValue?: FormInputPost
}

const FormPost: FC<FormPostProps> = ({ submit, isEdit, initValue }) => {

    const { register, handleSubmit} = useForm<FormInputPost>({
        defaultValues: initValue
    }) 

    const categories = [
        'Fiction', 'Non-fiction', 'Mystery', 'Romance', 'Biography', 'Fantasy'
    ]

    const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
        queryKey: ['tags'],
        queryFn: async () => {
            const response = await axios.get('/api/tags')
            return response.data
        }
    })
    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center justify-center gap-5 mt-10'>
            <input type="text"  {...register("title", { required: true })} placeholder="Book title.." className="input input-bordered w-full max-w-lg" />
            <textarea  {...register("content", { required: true })} className="textarea textarea-bordered w-full max-w-lg" placeholder="Description.."></textarea>
            {isLoadingTags ? 
                <span className="loading loading-dots loading-md"></span> 
            :          
                <div className="flex items-center w-full max-w-lg">
                <select className="select select-bordered w-full max-w-lg" defaultValue={''} {...register("tagId", { required: true })}>
                    <option disabled value=''>Select Categories</option>
                    {dataTags?.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <a href="/category" className='ml-4'><PlusCircle /></a>
                </div>
                
            }

            <button type='submit' className='btn btn-primary w-full max-w-lg'>{isEdit ? 'Update' : 'Create'}</button>
        </form>
    )
}

export default FormPost
