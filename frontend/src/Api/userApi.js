const host = process.env.REACT_APP_HOST;

export const getuser = async () => {
    const res = await fetch(`${host}/user`, {
        method: "GET",
        mode: "cors",
        credentials:'include'
    })
    const user = await res.json();
    return user;
}


export const addFavourite=async(id)=>{
    const res=await fetch(`${host}/user/${id}`,{
        method:"POST",
        mode:"cors",
        credentials:'include'
    })
    const user=await res.json();
    return user;
}

export const getFavBlogs=async()=>{
    const res=await fetch(`${host}/user/favourite_blogs`,{
        method:"GET",
        mode:"cors",
        credentials:'include'
    })
    const favblogs=await res.json();
    return favblogs;
}

export const editUserDetails=async(details)=>{
    const form =new FormData();
    form.append('username',details.username);
    form.append('email',details.email);
    form.append('file',details.img);
    const res=await fetch(`${host}/user`,{
        method:"PATCH",
        mode:"cors",
        credentials:'include',
        body:form,
    })

    const updatedUser=await res.json();
    return updatedUser;

}