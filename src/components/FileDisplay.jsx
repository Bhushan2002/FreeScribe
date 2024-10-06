import React from 'react'

function FileDisplay(props) {
    const { handleAudioReset, file, audioStream } = props
    return (
        <main className="flex-1 
                p-4
                flex-col
                gap-3
                text-center 
                sm:gap-4
                md:gap-5
                justify-center pb-20 w-fit max-w-full mx-auto ">
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Free<span className='text-blue-400 bold'>Scribe</span></h1>

            <div className='mx-auto flex flex-col text-left  my-4 '>

                <h3 className='font-semibold '>Name</h3>
                <p>{file.name}</p>
            </div>
            <div className='flex items-center justify-between gap-4'>
                <button onClick={handleAudioReset} className='text-slate-400 hover:text-blue-600 duration-200'>Reset</button>
                <button className='specialBtn 
                rounded-lg
                flex 
                items-center
                gap-2
                font-medium
                p-2
                px-4'>
                    <p className=''>Transcribe</p>
                </button>
            </div>
        </main>
    )
}

export default FileDisplay