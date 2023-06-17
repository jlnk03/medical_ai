
function ButtonSkew({text, disable, click}) {


  if (text === 'STOP') {

  return (
    <>
    <div className="relative">
      <button type="button" className="rainbow-container text-[40vmin] mt-14" disabled={disable} onClick={click}>
        <div className="green">
        </div>
        <div className="pink">
          </div>
          <div className="blue">
          </div>
      </button>
      <span className="not-animated text-4xl font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-60">STOP</span>
    </div>
    </>
  )
  }


  if (text === 'START') {

  return (
    <>
    <div className="relative">
      <button type="button" className="rainbow-container text-[40vmin] mt-14 not-animated" disabled={disable} onClick={click}>
        <div className="green not-animated">
        </div>
        <div className="pink not-animated">
          </div>
          <div className="blue not-animated">
          </div>
        
      </button>
      <span className="text-4xl font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-60">START</span>
      </div>
    </>
  )
  }

  if (text === 'WRITING...') {

    return (
      <>
      <div className="relative">
        <div className="rainbow-container rainbow-container-fast text-[40vmin] mt-14">
          <div className="green">
          </div>
          <div className="pink">
            </div>
            <div className="blue">
            </div>
          
        </div>
        <span className="text-4xl font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-60">{text}</span>
        </div>
      </>
    )
    }

  return (
    
    <>
          <button type="button" className="h-fit w-fit inline-block rounded-[12px] bg-gradient-to-b from-[#04D2A9] to-[#0AA48A] leading-none p-px shadow-sm" disabled={disable} onClick={click}>
            <span className="inline-block rounded-[11px] bg-gradient-to-b from-[#4DDFC2] to-[#04D2A9] p-px">
              <span className="inline-flex rounded-[10px] items-center gap-x-1.5 bg-[#04D2A9] px-2 py-1 text-sm text-white">
                {text}
                {/* <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#03BE99] text-xs ml-0.5">N</span> */}
              </span>
            </span>
          </button>
      </>
  )
}

export default ButtonSkew
