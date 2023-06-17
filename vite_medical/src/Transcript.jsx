import React from 'react';

function Transcript(props) {
  return (
    <div>
      <div className='font-bold my-4'>Transcript:</div>
      {/* {console.log(props['text'])} */}
      {props['transcript']}
      <div className='font-bold my-4'>Report:</div>
      {props['text']}
    </div>
  );
}

export default Transcript;