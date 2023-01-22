import React from 'react'

const NoteDummy = () => {
    const arrDummy = []
    for(let i = 0; i <= 3; i++){
        arrDummy.push("")
    }
    
    return (
        <>
        {arrDummy.map((dummy ,index) => (
            <div key={`note-dummy-${index}`} className="bg-gray-400 h-80 sm-notes p-3 rounded-2xl box-shadow relative" />
        ))}
        </>
    )
}

export default NoteDummy