'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { PenSquare, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState} from 'react'

interface ButtonActionProps {
  id: string
}
const ButtonAction: FC<ButtonActionProps> = ({ id }) => {

  const router = useRouter();
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async () => {
       return axios.delete(`/api/posts/${id}`)
    },
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      router.push('/')
      router.refresh()
    }
  })
  const [isConfirmationOpen, setConfirmationOpen] = useState(false)
  
  const handleDelete = () => {
    setConfirmationOpen(true)
  }
  const confirmDelete = () => {
    setConfirmationOpen(false)
    deletePost()
  }
  const cancelDelete = () => {
    setConfirmationOpen(false)
  }

  return (
    <div>
        <Link href={`/edit/${id}`} className='btn mr-2 btn-primary' >
        <PenSquare />Edit
        </Link>
        <button onClick={handleDelete} className='btn btn-warning'>
          {isLoading && <span className='loading loading-spinner'></span>}
        <Trash2 />Delete
        </button>
        {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-1/4">
            <p>Are you sure you want to delete this post?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmDelete}
                className="mr-4 text-red-500 hover:text-red-700 cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>

      )}
    </div>
  )
}

export default ButtonAction
