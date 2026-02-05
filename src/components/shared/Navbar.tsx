
import { Button } from '../ui/button'
import { Copy, Download } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <nav className='fixed w-full flex items-center justify-between shadow-xl p-5'>
      <h1 className='text-xl font-bold'>EasyReadme</h1>
      <div className='flex gap-5'>
        <ThemeToggle/>
        <Button variant='outline' className='cursor-pointer'><Copy />Copy</Button>
        <Button className='cursor-pointer'><Download />Download</Button>
      </div>
    </nav>
  )
}

export default Navbar
