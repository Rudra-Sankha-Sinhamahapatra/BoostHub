interface ButtonProps{
    content:string;
    className:string;
    onClick?:()=>void
}


export const Button=({content,className,onClick}:ButtonProps)=>{
    return(
        <>
        <div>
            <button className={className} onClick={onClick}>
               {content}
            </button>
        </div>
        </>
    )
}