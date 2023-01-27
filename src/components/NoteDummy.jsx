import React from 'react'

const NoteDummy = () => {
    const arrDummy = []
    for(let i = 0; i <= 5; i++){
        arrDummy.push("")
    }
    
    return (
        <>
        {arrDummy.map((dummy ,index) => (
            <div key={`note-dummy-${index}`} className="bg-gray-400 animate-pulse h-80 lg:h-72 w-[calc(50%-(1.25rem/2))] lg:w-[calc(33.3333%-(1.75rem/2))] p-3 rounded-2xl box-shadow relative" />
        ))}
        </>
    )
}

export default NoteDummy