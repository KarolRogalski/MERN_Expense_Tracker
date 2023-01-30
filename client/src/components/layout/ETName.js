import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'

export const ETName = () => {
  const { expens_tracker_names, onChangeAlbum, currentAlbum } =
    useContext(GlobalContext)

  const etNames = expens_tracker_names

  useEffect(() => {
    const selectCurrent = document.querySelectorAll('option')
    selectCurrent.forEach((name) => {
      if (name.value === currentAlbum) name.setAttribute('selected', '')
    })
    if (currentAlbum === '...newAlbum...') {
      selectCurrent[0].setAttribute('selected', '')
      selectCurrent[0].removeAttribute('disabled', '')
      selectCurrent[selectCurrent.length - 1].removeAttribute('selected', '')
      selectCurrent[selectCurrent.length - 1].setAttribute('disabled', '')
      console.log(selectCurrent)
    }
    if (currentAlbum === 'selectAlbum' || currentAlbum === '') {
      onChangeAlbum(etNames[etNames.length - 1])
      selectCurrent[selectCurrent.length - 2].setAttribute('selected', '')
    }
  }, [])

  const onSelect = () => {
    let newETName = document.querySelector('#etalbumselect').value
    onChangeAlbum(newETName)
  }

  return (
    <>
      <select id='etalbumselect' onChange={onSelect}>
        <option value='selectAlbum' disabled selected>
          ...SELECT ALBUM...
        </option>

        {etNames.map((name, index) => (
          <option className='option' key={index}>
            {name}
          </option>
        ))}
        <option value='...newAlbum...'>...add new album...</option>
      </select>
    </>
  )
}
