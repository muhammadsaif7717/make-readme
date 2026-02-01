import React from 'react'
import { Button } from '../ui/button'
import { Copy, Download } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between shadow-xl p-5'>
      <h1 className='text-xl font-bold'>EasyReadme</h1>
      <div className='flex gap-5'>
        <Button variant='outline' className='cursor-pointer'><Copy/>Copy</Button>
        <Button className='cursor-pointer'><Download/>Download</Button>
      </div>
    </div>
  )
}

export default Navbar
