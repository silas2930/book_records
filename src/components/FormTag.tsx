'use client'

import { FormInputTags } from '@/types'
import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

interface FormTagsProps {
    submit: SubmitHandler<FormInputTags>
    // isEdit: boolean
    // initValue?: FormInputPost
}

const FormTag: FC<FormTagsProps> = ({ submit }) => {

    const { register, handleSubmit} = useForm<FormInputTags>({    }) 

    const categories = [
        'Fiction', 'Non-fiction', 'Mystery', 'Romance', 'Biography', 'Fantasy'
    ]

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center justify-center gap-5 mt-10'>
            <input type="text"  {...register("name", { required: true })} placeholder="Book title.." className="input input-bordered w-full max-w-lg" />

            <button type='submit' className='btn btn-primary w-full max-w-lg'>Add</button>
        </form>
    )
}

export default FormTag
