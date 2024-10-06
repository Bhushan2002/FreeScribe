import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'

function HomePage(props) {

    const { setAudioStream, setFile } = props

    const [recordingStatus, setRecordingStatus] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)

    const mediaRecorder = useRef(null)
    const mimeType = 'audio/webm'

    async function startRecording(params) {
        let tempStream
        console.log('start recording')
        try {
            const streamData = navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        } catch (e) {
            console.log(e.message)
            return
        }
        setRecordingStatus('recording')
        // create new media recorder instance using the stream 
        const media = new MediaRecorder(tempStream, { type: mimeType })

        mediaRecorder.current = media

        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') { return }
            if (event.data.size === 0) { return }
            localAudioChunks.push(event.data)
        }
        setAudioChunks(localAudioChunks)
    }

    async function stopRecording(params) {
        setRecordingStatus('inactive')
        console.log('stop recording')
        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType })
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)


        }

    }

    useEffect(() => {
        if (recordingStatus === 'inactive') { return }

        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <main className="flex-1 p-4 flex-col gap-3  text-center sm:gap-4 md:gap-5
     justify-center pb-20">
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free<span className='text-blue-400 bold'>Scribe</span></h1>
            <h3 className='font-medium text-lg'>
                Record
                <span className='text-blue-400'>
                    &rarr;
                </span>
                Transcribe
                <span className='text-blue-400'>
                    &rarr;
                </span>
                Translate
            </h3>
            <button onClick={recordingStatus ==='recording'? stopRecording : startRecording} className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72
         max-w-full my-4'>
                <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record' : `stop recording`}</p>
                <div className='flex items-center gap-2'>
                    {duration !==0 && (
                        <p className='text-sm '>{duration}s</p>
                    )}
 <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus === 'recording' ? ' text-rose-300' : "")}></i>                </div>
            </button>
            <p>Or
                <label className='text-base cursor-pointer hover:text-blue-600 duration-200' > Upload
                    <input className='hidden' onChange={(e) => {
                        const tempFile = e.target.files[0]
                        setFile(tempFile)
                    }} type='file' accept='.mp3,.wave' />
                </label> a mp3 file</p>

            <p className='italic text-slate-400'>free now free forever!</p>
        </main>
    )
}

export default HomePage