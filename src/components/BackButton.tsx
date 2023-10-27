'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    return (
        <div className='mt-10'>
            <button className='btn' onClick={() => router.back()}> <ChevronLeft />Back</button>
        </div>
    )
}

export default BackButton
