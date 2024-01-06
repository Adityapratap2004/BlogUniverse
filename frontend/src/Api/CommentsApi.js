const host=process.env.REACT_APP_HOST;

export const getComments=async(id)=>{
    const req=await fetch(`${host}/comments/${id}`,{
        method:"GET",
        mode:"cors",
        credentials:'include',
        headers:{
            "content-type":"application/json",
        },
    })
    const comments=await req.json();
    console.log("Comments",comments);
    return comments;
}

export const postComments=async(id,comment)=>{
    const req=await fetch(`${host}/comments/${id}`,{
        method:"POST",
        mode:"cors",
        credentials:"include",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({comment})
    })

    const request=req.json();
    return request;
}