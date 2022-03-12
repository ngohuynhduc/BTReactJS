import React, { useEffect, useRef, useState,useMemo } from 'react';
import { Members } from './Members';

export const TransferMember = () => {
    const [reactMembers, setReactMembers] = useState(()=>{
      return [{
          name: "Đinh Tuấn Anh",
          age: 20,
        },
        {
            name: "Ngụy Minh Thắng",
            age: 19,
        },
        {
          name: "Nguyễn Anh Thư",
          age: 21,
        },
       ]
    });
    const [javaMembers, setJavaMembers] = useState(()=>{
      return [{
        name: "Bế Trọng Hiếu",
        age: 20,
      },
      {
          name: "Ngô Huỳnh Đức",
          age: 19,
      },
      {
        name: "Nguyễn Mạnh Dũng",
        age: 21,
      },
     ]
    });
    useEffect(()=>{
      if(javaMembers.length===0){
        alert("Java Class is Empty");
      } else if (reactMembers.length===0){
        alert("React Class is Empty");
      }
    },[reactMembers.length,javaMembers.length])

    const transferReactToJavaMember =(index)=>{
      const el = reactMembers[index];
      reactMembers.splice(index,1);
      javaMembers.push(el);
      setReactMembers([...reactMembers]);
      setJavaMembers([...javaMembers]);
    }
    const transferJavaToReactMember =(index)=>{
      const el = javaMembers[index];
      javaMembers.splice(index,1);
      reactMembers.push(el);
      setReactMembers([...reactMembers]);
      setJavaMembers([...javaMembers]);
    }

    const [formData, setFormData] = useState({
      name:"",
      age:"",
      classType:""
    })

    const handleInput=(e)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value,
      })
    }

    const handleSubmit = ()=>{
      if(formData.isEdit){
        const {originClassType, index} = formData;
        if(originClassType !== formData.classType){
          if(formData.classType === 'react'){
            reactMembers.splice(index,1);
            setReactMembers([...reactMembers]);
            javaMembers.push(formData);
            setJavaMembers([...javaMembers])
          } else {
            javaMembers.splice(index,1);
            setJavaMembers([...javaMembers]);
            reactMembers.push(formData);
            setReactMembers([...reactMembers])
          }
        } else {
          if(formData.classType === 'react'){
            javaMembers[index] = formData;
            setJavaMembers([...javaMembers]);
          } else {
            reactMembers[index] = formData;
            setReactMembers([...reactMembers]);
          }
        }
      } else {
        if(formData.classType === "java"){
          javaMembers.push(formData);
          setJavaMembers([...javaMembers]);
        } else{
          reactMembers.push(formData);
          setReactMembers([...reactMembers]);
        }
        setFormData({
          name:"",
          age:"",
          classType:""
        })
      }
      
    }
    
    const handleEditReact=(index)=>{
      setFormData({
        ...reactMembers[index],
        isEdit: true,
        index: index,
        originClassType: reactMembers[index].classType,
      })
      inputNameRef.current.focus();

    }
    const handleEditJava=(index)=>{
       setFormData({
        ...javaMembers[index],
        isEdit: true,
        index: index,
        originClassType: javaMembers[index].classType,
      })
      inputNameRef.current.focus();
    }
    
    const handleDeleteJava=(index)=>{
      javaMembers.splice(index,1);
      setJavaMembers([...javaMembers])
    }
    const handleDeleteReact=(index)=>{
      reactMembers.splice(index,1);
      setReactMembers([...reactMembers])
    }
    const handleSort=()=>{
      const sortJavaMember=[...javaMembers].sort((a,b)=>{
        return a.age-b.age;
      });
      const sortReactMember=[...reactMembers].sort((a,b)=>{
        return a.age-b.age;
      });
      setJavaMembers([...sortJavaMember]);
      setReactMembers([...sortReactMember]);
    }
    const inputNameRef = useRef();

    const [searchValue, setSearchValue] = useState("")
    const getUsers = (list)=>{
      let res = [...list];
      if (searchValue){
        res = res.filter((el)=>el.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
      }
      return res;
    }
    const reactMembersToRender = useMemo(() => getUsers(reactMembers), [reactMembers]);
    const javaMembersToRender = useMemo(() => getUsers(javaMembers), [javaMembers]);
      return (
      <div>
        <h2>Search by name:</h2>
        <input
          type="text"
          name='search'
          value={searchValue}
          onChange={(e)=>{setSearchValue(e.target.value);}}
        />
        
        <h1>List member of React Class</h1>
        {
          reactMembers.length>0? getUsers(reactMembers).map((user, index)=>{
            return <Members name={user.name} age={user.age} key={index} handleTransfer={()=>transferReactToJavaMember(index)} handleEdit={()=>handleEditReact(index)} handleDelete={()=>handleDeleteReact(index)}/>
          }):"Empty"
        }
        <h1>List member of Java Class</h1>
        {
          javaMembers.length>0? getUsers(javaMembers).map((user, index)=>{
            return <Members name={user.name} age={user.age} key={index} handleTransfer={()=>transferJavaToReactMember(index)} handleEdit={()=>handleEditJava(index)} handleDelete={()=>handleDeleteJava(index)}/>
          }):"Empty"
        }
        <button onClick={()=>handleSort()}>Sort</button>
        <form onSubmit={(e)=>{
          e.preventDefault();
        }}>
          <h1>Form {formData.isEdit? "Edit" : "Add"} Members</h1>
          <label>Name: </label>
          <input ref={inputNameRef} name="name" value={formData.name} onChange={(e)=>handleInput(e)}></input>
          {"-----"}
          <label>Age: </label>
          <input name="age" value={formData.age} onChange={(e)=>handleInput(e)}></input>
          <select name="classType" value={formData.classType} onChange={(e)=>handleInput(e)}>
            <option value="react">React</option>
            <option value="java">Java</option>
          </select>
          <button onClick={()=>handleSubmit()}>Submit</button>
        </form>
        
      </div>
  )
}
