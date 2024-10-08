import React from 'react'

function HeaderPage() {
    return (
        <header className="flex items-center p-4 justify-between gap-4">
            <a href="/">
                <h1 className='font-medium'>Free<span className="text-blue-400 bold">Scribe</span></h1>
            </a>
            
            <a href='/' className="fa-solid fa-center  gap-2 specialBtn px-4 py-2 rounded-lg">
                <p>New</p>
                <i className="fa-solid fa-plus"></i>
            </a>
        </header>
    )
}


export default HeaderPage