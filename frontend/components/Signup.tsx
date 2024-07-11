"use client"

import InputBox from "./InputBox";

export default function Signup() {


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
           <InputBox type="signup" title="Create An Account" label1="Email" label2="Password" label3="Name" label4="Role" warning="Have an Account!" warningopt="Signin"/>
        </div>
    );
}
