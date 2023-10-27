import React from 'react'
import Link from 'next/link'
import { LayoutGrid } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
        <div className="container">
            <div className="flex-1">
                <Link href='/'><LayoutGrid /></Link>
            </div>
            <div className="flex-none">
                <Link href='/create' className='btn btn-ghost'>Add Book</Link>
            </div>
            <div className="flex-none">
                <Link href='/category' className='btn btn-ghost'>Add Category</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
