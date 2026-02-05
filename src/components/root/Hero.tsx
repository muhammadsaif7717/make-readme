import Link from "next/link";
import { Button } from "../ui/button";


export default function Hero() {
    return (
        <div className='h-screen flex flex-col text-center justify-center items-center'>
            <div className="space-y-7">
                <h1 className='text-5xl font-semibold'>The Easiest Way To Create A</h1>
                <h1 className='text-5xl font-semibold text-green-500 uppercase'>Readme</h1>
               <Link href={'/make-readme'}> <Button className="bg-green-500 px-8 py-6 rounded-full w-56 mx-auto  hover:bg-green-600 text-2xl">Get Started</Button></Link>
            </div>

        </div>
    )
}
