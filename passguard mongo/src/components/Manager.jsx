import React from "react";
import { useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({site:"", username:"", password:""})
  const [passwordArray, setPasswordArray] = useState([])
  
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setPasswordArray(passwords)
  }
  
  useEffect(() => {
    getPasswords()
  }, [])

  const copyText= (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
  });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    if(ref.current.src.includes("icons/eyecross.png")){
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    }
    else{
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "text"
    }
  }
  
  const savePassword = async () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
      
      //If any such id exists in the db, delete it for editing
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
  
      setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
      setform({site:"", username:"", password:""})
      toast('Password guarded!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    }
    else{
      toast('Error: Password not saved!',{
        autoClose: 2000,
        theme: "dark"
      });
    }
  }
  
  const deletePassword = async (id) => {
    console.log("Deleting password with id", id)
    toast('Password Deleted!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
  });
    let c = confirm("Do you really wish to delete your password")
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
  }
  
  const editPassword = (id) => {
    setform({...passwordArray.filter(i=>i.id===id)[0], id: id})
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
  }

  const handleChange = (e) => {
    setform({...form, [e.target.name] : e.target.value})
  }
  

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="md:mycontainer p-3 min-h-[83.9vh]">
        <h1 className="text-5xl font-bold text-center">
        <span className='text-green-500'>&lt;</span>
              Pass
              <span className='text-green-500'>Guard/&gt;</span>
        </h1>
        <br/>
        <p className="text-green-900 text-xl text-center">Your Own Password Manager</p>
        <div className="flex flex-col p-4 text-black gap-5 items-center">
            <input value={form.site} onChange={handleChange} placeholder="Enter website URL" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="site" id="site" />
            <div className="flex flex-col md:flex-row w-full justify-between gap-5">
              <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="username" id="username" />
              <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-500 w-full p-4 py-1" type="password" name="password" id="password" />
              <span className="absolute right-[8px] top-[8px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} width={18} src="icons/eye.png" alt="eye" />
              </span>
              </div>
            </div>
          <button onClick={savePassword} className="flex justify-center items-center gap-2 bg-green-400 rounded-full px-4 border-green-900 border py-2 w-fit hover:bg-green-300">
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" ></lord-icon>
              Guard your Password
            </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 px-5">Your Passwords</h2>
          {passwordArray.length === 0 && <div className="px-5"> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto my-3 w-full rounded-md overflow-hidden mb-10">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item, index)=>{
                return <tr key={index}>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "6px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      <span>{item.username}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "6px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      <span>{"*".repeat(item.password.length)}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "6px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='justify-center py-2 border border-white text-center'>
                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Manager;
