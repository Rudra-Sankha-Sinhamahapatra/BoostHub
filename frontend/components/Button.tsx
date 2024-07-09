interface ButtonProps{
    content:string,
    className:string
}


export const Button=({content,className}:ButtonProps)=>{
    return(
        <>
        <div>
            <button className={className}>
               {content}
            </button>
        </div>
        </>
    )
}