import { memo } from "react";

interface ButtonProps{
    content:string;
    className:string;
    onClick?:()=>void;
}


export const Button:React.FC<ButtonProps>=memo(({content,className,onClick})=>{
    return(
        <div>
            <button className={className} onClick={onClick}>
               {content}
            </button>
        </div>
       
    )
})