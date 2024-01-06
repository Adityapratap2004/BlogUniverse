const host=process.env.REACT_APP_HOST;
export const getblogs=async()=>{
    
    const res=await fetch(`${host}/blogs`,{
        method:"GET",
        mode:"cors",
    })

    const blogs=await res.json();
    return blogs;
}

export const addBlogs=async(blog)=>{
    const form=new FormData();
    form.append('title',blog.title);
    form.append('content',blog.content);
    form.append('category',blog.category)
    form.append('file',blog.img);
    const res=await fetch(`${host}/blogs/create`,{
        method:"POST",
        mode:"cors",
        credentials:"include",
        body:form,
    })
    const b= res.json();
    return b;
}

export const getBlogById=async(id)=>{
    const res=await fetch(`${host}/blogs/${id}`,{
        method:"GET",
        mode:"cors",
    })
    const blogs=await res.json();
    return blogs;
    
}

export const delBlog=async(id)=>{
    const res=await fetch(`${host}/blogs/${id}`,{
        method:"DELETE",
        mode:"cors",
        credentials:"include",
    });
    const deletedBlogs=await res.json();
    return deletedBlogs;
}

export const editblog=async(id,details)=>{
    //from data lena padega
    const form =new FormData();
    form.append('title',details.title);
    form.append('content',details.content);
    form.append('file',details.img);

    const res=await fetch(`${host}/blogs/${id}`,{
        method:"PATCH",
        mode:"cors",
        credentials:"include",
        body:form
    });
    const updatedBlog=await res.json();
    return updatedBlog;
}


