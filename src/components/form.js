import React, { useState } from "react";
import * as yup from 'yup';
import axios from "axios";

function Form() {
    
    /*  formSchema
    .validate(FormData) */

const emptyForm ={
    name : "s",
    email: "d",
    password:"s",
    approve:"a"
}
const initalMembers = [
    {
      fname: "Rumeysa",
      flname: "İleri",
      femail: "r@r.com",
      fpass: "123456",
      fterms: true,
    },
    {
      fname: "Berk",
      flname: "Akaz",
      femail: "b@b.com",
      fpass: "123466",
      fterms: true,
    },
  ];
const [formData, setFormData] =useState(emptyForm);
const [ formError , setFormError] = useState([]);
const [teamMembers, setteamMembers] = useState(initalMembers);
const formSchema = yup.object().shape({
    name: yup.string().required("isim alanini doldur"),
    email: yup.string().email("eeeee").required("gecerli bir email adresin giriniz"),
    password: yup.string().min(6,"en az 6 karakter").required("gecersiz sifre"),
    approve: yup.boolean().oneOf([true],"veri paylasimffdgdfg")
  })

  const checkErrors = (name, value) => {
    // console.log(checkErrors)
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormError({
          ...formError,
          [name]: null,
        });
      })
      .catch((err) => {
        // console.log("err", err.errors);
        setFormError({
          ...formError,
          [name]: err.errors[0],
        });
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    axios.post("https://reqres.in/api/users", formData).then((res) => {
      setteamMembers([...teamMembers, res.data]);
    });
  }
const formOnChange= (event)=>{
    console.log("event:",event.target.name, event.target.value)
        const uptadedFormData ={
            ...formData,
            [event.target.name]: 
            event.target.type === "checkbox" ? event.target.checked :
               event.target.value 
        }
        setFormData(uptadedFormData);
        checkError(
            event.target.name,
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value
          );
        };

const checkErrors =(name, value) =>{

}
    
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-row">
        <label htmlFor="name">isim</label>
        <input type="text" id="name" 
        onChange={(e)=>formOnChange(e)} 
        name="" value={formData.name}/>
        {formError.name && (
        <div className="error">Hata: {formError.name} </div>)} 
        </div>
        <div className="input-row">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" onChange={(e)=>formOnChange(e)} name="" value={formData.email} /><br/>
        
        <div className="error">Hata: </div>
        </div>
        <div className="input-row">
        <label htmlFor="password">password</label>
        <input type="password" id="password" onChange={(e)=>formOnChange(e)} name="" value={formData.password} /><br/>
        <div className="error">Hata: </div>
        </div>
        <div className="input-row">
        <label htmlFor="approve">Gizlik sozlemesini okudum</label>
        <input type="checkbox" id="approve" onChange={(e)=>formOnChange(e)} name="" value="approved" checked={formData.approve} />
        <div className="error">Hata: </div>
        </div>
        <button>Gonder</button>
      </form>
    );
  }
  

  export default Form;