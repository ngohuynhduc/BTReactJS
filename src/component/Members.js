import React from 'react'

export const Members = (props) => {
    const {name,age,handleTransfer,handleEdit, handleDelete}=props;
  return (
    <div>
        <span>name: {name}</span>-<span>age: {age}</span>{"---"}
        <button onClick={()=>handleTransfer()}>Transfer</button>{"---"}
        <button onClick={()=>handleEdit()}>Edit</button>{"---"}
        <button onClick={()=>handleDelete()}>Delete</button>
    </div>
  )
}
