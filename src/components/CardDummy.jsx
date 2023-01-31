const CardDummy = () => {
    const arrDummy = [18, 15, 18, 12, 18, 18, 10, 15, 8]
    
    return (
        <>
            {arrDummy.map((height, index) => (
                <div key={`note-dummy-${index}`} className={`bg-gray-400 animate-pulse rounded-2xl box-shadow relative`} style={{ height: height + "rem" }} />
            ))}
        </>
    )
}

export default CardDummy