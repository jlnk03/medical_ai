import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
// import uuidv4 from 'uuid/v4'
import ButtonSkew from './ButtonSkew'
import Transcript from './Transcript';


function App() {
  // const [todos, setTodos] = useState([{id: 1, name:'Todo 1', completed: true}])
  // const [todos, setTodos] = useState([])
  const [text, setText] = useState('startCharacter'); // State for the transcript
  const [report, setReport] = useState(''); // State for the report
  const [selectedFile, setSelectedFile] = useState(null); // State for the uploaded audio file
  const [listeningText, setlisteningText] = useState('System is not listening');
  const todoNameRef = useRef()

  const textStart = 'START'
  const textStop = 'STOP'
  const textWriting = 'WRITING...'

  // Mic-Recorder-To-MP3
  const recorder = useRef(null) //Recorder
  const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)
  const [isWriting, setIsWriting] = useState(null)

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true)
      setlisteningText('System is listening');
    })
  }

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        })
        const newBlobUrl = URL.createObjectURL(blob)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        setAudioFile(file)
        setIsWriting(true)
        setlisteningText('System is not listening');

        // Send the audio file to the Flask backend
        const formData = new FormData()
        formData.append('audio', file)
        fetch('api/transcribe', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
          const text_transcript = data['transcript']['text']
          const text_report = data['report']
          handleTranscript(text_report, text_transcript)
          setIsWriting(false)
        })
        .catch(error => console.error(error))
      })
      .catch((e) => console.log(e))
  }

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('audio', selectedFile);

    // Send the file to the backend
    fetch('api/transcribe', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      const text_transcript = data['transcript']['text']
      const text_report = data['report']
      handleTranscript(text_report, text_transcript)
    })
    .catch(error => console.error(error))
  };

  const handleTranscript = (report_text, transcript) => {
    setText(transcript);
    setReport(report_text);
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  return (
    <>
      <div className="flex flex-col gap-4 px-10 py-10 justify-center items-center max-w-3xl">
      <h1 className="text-xl font-bold">{listeningText}</h1>
      <div>
      <div className="flex flex-col items-center gap-4">
        <div class="flex items-center justify-center w-56">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-slate-700">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Upload audio</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={handleFileChange}/>
            </label>
        </div> 
        <ButtonSkew text='Upload' disable={false} click={handleUpload}/>
      </div>
    </div>
      <audio ref={audioPlayer} src={blobURL} controls='controls' className="hidden"/>
        <div className="gap-4 flex flex-row mb-10">
          {/* show button based on recording */}
          {/* <ButtonAI disable={isRecording} click={startRecording}/> */}
          {!isRecording && !isWriting && <ButtonSkew text={textStart} disable={isRecording} click={startRecording}/>}
          {isRecording && <ButtonSkew text={textStop} disable={!isRecording} click={stopRecording}/>}
          {!isRecording && isWriting && <ButtonSkew text={textWriting} disable={!isRecording} click={undefined}/>}
          
          {/* <ButtonSkew text={textSubmit}/> */}
        </div>
        {/* check if transcript is empty */}
        { text !== 'startCharacter' && <Transcript transcript={text} text={report}/> }
        </div>
    </>
  )
}

export default App
