import axios from "axios";

//----------------------------Spring------------------------------------//
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user && user.token){
        return { Authorization: 'Bearer ' + user.token }; 
    } else {
        return {};
    }
}

export const registerjs =async(userName,email,password)=>{
    try {
        const response = await axios.post("http://localhost:7777/auth/register",{
            userName:userName,
            userEmail: email,
            password: password
        })
        return {success: true, data:"User succes registred!!!"};
    } catch (error) {
        return {success: false, data: error.response.data.error};
    }
}

export const loginjs =async(userEmail,password)=>{
    try {
        const response = await axios.post("http://localhost:7777/auth/login",{
            userEmail: userEmail,
            password: password
        })
        localStorage.setItem("user",JSON.stringify(response.data));
        return {success: true, data:"User logged"};
    } catch (error) {
        return {success: false, data: error.response.data};
    }
}

export const Users =async()=>{
        const response = await axios.get("http://localhost:7777/admin/user",{
            headers: authHeader()
        })
        return response.data;
}
export const getProduct = async()=>{
    try{
        const response = await axios.get("http://localhost:7777/shop/product",{
        headers: authHeader()
    });
    return response.data;
    }catch(error){
        return error;
    }
}
export const Delete = async(prodId)=>{
    try {
        const response = await axios.post(
            `http://localhost:7777/admin/product/${prodId}`,
            {},
            {
                headers: authHeader()
            }
        );
        return response.data;
   } catch (error) {
    console.error('Error:', error);
    throw error;
   }
}

export const deleteCategory = async(id)=>{
    try {
        const response = await axios.post(
            `http://localhost:7777/admin/category/${id}`,
            {},
            {
                headers: authHeader()
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
 }

export const DeleteUser = async (userId) => {
    try {
        const response = await axios.post(
            `http://localhost:7777/admin/user/${userId}`,
            {},
            {
                headers: authHeader()
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error during user deletion:', error);
        throw error;
    }
};

export const getCategory = async()=>{
    const response = await axios.get("http://localhost:7777/shop/category",{
        headers: authHeader()
    });
    return response.data;
}
export const Admin = async()=>{
    const response = await axios.get("http://localhost:7777/shop/get-admin",{
        headers: authHeader()
    });
    return response.data;
}
export const saveProduct = async(formData)=>{
    const response = await axios.post("http://localhost:7777/admin/addproduct",formData,{
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
          }
    });
    return response.data;
    
}
export const saveCategory = async(category)=>{
     const response = await axios.post("http://localhost:7777/admin/addcategory",category,{
        headers: authHeader()
           }
     );
     return response.data;
    
 }
 export const getOneProd = async(id)=>{
    try{
        const response = await axios.get('http://localhost:7777/shop/product/'+id,{
            headers: authHeader()}
            
         );return response.data; 
    }
    catch(error){
        console.log(error);
    }}

export const Update = async(prod)=>{
    const response = await axios.put("http://localhost:7777/admin/product/update/"+prod.id, prod,{
        headers: authHeader()
    });
    return response.data;
}

export const getAdmin = async(userId)=>{
    const response = await axios.get(`http://localhost:7777/admin/get-admin/${userId}`,{
        headers: authHeader()
    });
    return response.data;
}




//----------------------------------------------------------------------------------
// export const getProduct = async()=>{
//     const response = await axios.get("http://localhost:7777/shop/product");
//     return response.data;
// }
// export const saveProduct = async(formData)=>{
//    try{
//     const response = await axios.post("http://localhost:7777/shop/addproduct",formData,{
//         headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//     });
//     return response.data;
//    }
//    catch(e){
//         console.log(e);
//    }
// }
// export const getCategory = async()=>{
//     const response = await axios.get("http://localhost:7777/shop/category");
//     return response.data;
// }
// export const getOneProd = async(prodId)=>{
//     const response = await axios.get("http://localhost:7777/shop/product/"+prodId);
//     return response.data;
// }
// export const getOneProduct = async(prodId)=>{
//     const [product,category] = await axios.all([
//         axios.get('http://localhost:7777/shop/product/${prodId}'),
//         axios.get("http://localhost:7777/shop/category")
//     ]);
//     return [product.data,category.data];
// }

// export const Update = async(prod)=>{
//     const response = await axios.put("http://localhost:7777/shop/product"+prod.id, prod);
//     return response.data;
// }