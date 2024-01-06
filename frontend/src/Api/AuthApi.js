const host=process.env.REACT_APP_HOST;

export const login=async(cridentials)=>{
    console.log(cridentials)
    const res=await fetch(`${host}/auth/login`,{
        method:"POST",
        mode:"cors",
        credentials:'include',
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({email:cridentials.email,password:cridentials.password})
    })

    const details=await res.json();
    console.log(details);
    return details;
}

export const signup=async(cridentials)=>{
    console.log(cridentials)
    const res=await fetch(`${host}/auth/signup`,{
        method:"POST",
        mode:"cors",
        credentials:'include',
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({username:cridentials.username,email:cridentials.email,password:cridentials.password})
    })
    const details=await res.json();
    console.log(details);
    return details;
}
export const logout=async()=>{
    await fetch(`${host}/auth/logout`,{
        method:"GET",
        mode:"cors",
        cridentials:'include',
        headers:{
            "content-type":"application/json",
        }
    })
}