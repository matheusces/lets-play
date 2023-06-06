import React from 'react'
import { useState } from 'react';

function LeagueStat() {
  const [pontuation, setPontuation] = useState(0);

  function handleDecreasePontuation() {
    setPontuation(pontuation - 1);
  }

  function handleIncreasePontuation() {
    setPontuation(pontuation + 1);
  }


  return (
    <span className='flex items-center gap-2 self-start'>
      <button className='flex items-center h-3 bg-none text-center px-0.5 text-white rounded-sm' onClick={handleDecreasePontuation}>-</button>
      {pontuation}
      <button className='flex items-center h-3 bg-none text-center px-0.5 text-white rounded-sm' onClick={handleIncreasePontuation}>+</button>
    </span>
  )
}

export default LeagueStat