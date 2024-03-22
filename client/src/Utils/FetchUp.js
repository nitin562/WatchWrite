import { createToast } from "./ToastErrors"

export const fetchup=async(url,method,setpopErrors=null,headers={},body=null)=>{
    try {
        const originHeaders={
            ...headers,
            
        }
        let options={
            "method":method,
            "credentials":"include",
            headers:originHeaders
        }
        if(body){
            options={...options,body}
        }
        const response=await fetch(url,options)
        return await response.json()
    } catch (error) {
        console.log(error)
        createToast("Some connection Error occured..",setpopErrors)

        throw new Error(error.message)
    }
}
