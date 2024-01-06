const host=process.env.REACT_APP_HOST;

export const getcategory=async()=>{
    console.log(host)
    const res=await fetch(`${host}/category`,{
        method:"GET",
        mode:"cors",
    })

    const category=await res.json();
    console.log(category);
    return category;
}

export const setcategory=async(category)=>{
    const form=new FormData();
    form.append('category',category.category);
    form.append('title',category.title);
    form.append('file',category.img);
    const res=await fetch(`${host}/category`,{
        method:"POST",
        mode:"cors",
        credentials:"include",
        body:form,
    })
    const c= res.json();
    return c;
}



// cridentials
// headers
// body