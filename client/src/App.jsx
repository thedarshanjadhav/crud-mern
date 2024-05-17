import { useEffect, useState } from 'react'
import axios  from 'axios';

import './App.css'

function App() {
  const [formData, setFormData] = useState({
    fname:'',
    sname:''
  })
  const [tableData, setTableData] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }


// -------------------WITH BACKEND-------------------------
// create & update
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log({editId});
  if(isEditing){
    try {
      await axios.put(`http://localhost:3000/data-update/${editId}`, formData)
      .then((res)=>console.log('updated successfully', res));
      setFormData({fname:'', sname:''});
      fetchData();
      setIsEditing(false);
    } catch (err) {
      console.log(err)
    }
  }else{
    try {
      await axios.post('http://localhost:3000/data-create', formData)
      .then((res)=>console.log(res));
      setFormData({fname:'', sname:''})
      fetchData();
    } catch (error) {
        console.log(error);
    }
  }    
}
    
// fetching data / read
const fetchData = async ()=>{
  try{
    const response = await axios.get('http://localhost:3000/data-read');
    setTableData(response.data);
  }catch(err){
    console.log('error');
  }
}
useEffect(()=>{
  fetchData();
},[]);

// remove data
const handleRomove = async (id) =>{
  try{
    await axios.delete(`http://localhost:3000/data-delete/${id}`)
    .then((res)=>console.log('successfully deleted', res));
    fetchData();
  }catch(err){
    console.log(err);
  }
}

// handling edit button
const handleEdit = (index)=>{
  const {_id, fname, sname} = tableData[index];
  setFormData({fname, sname});
  setEditId(_id);
  setIsEditing(true);
}

// -------------------End WITH BACKEND-------------------------

  //-------------------WITH-OUT BACKEND--------------------
  // const handleSubmit=(e)=>{
  //   e.preventDefault();

  //   if(isEditing){
  //     setTableData((prev)=>{
  //       const updatedTableData = [...prev];
  //       updatedTableData[editId] = formData;
  //       return updatedTableData 
  //     })
  //     setFormData({fname:'', sname:''})
  //   }else{
  //     setTableData((prev)=> [...prev, formData]);
  //     setFormData({fname:'', sname:''})
  //   }
  // }

  // const handleEdit = (index)=>{
  //   const {fname, sname} = tableData[index];
  //   setFormData({fname, sname});
  //   setEditId(index);
  //   setIsEditing(true)
  // }   

  // const handleRomove=(index)=>{
  //   setTableData((prev)=>{
  //     const updatedTableData = [...prev]
  //     updatedTableData.splice(index, 1);
  //     return updatedTableData;
  //   })
  // }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="">First Name</label>
      <input type="text" name='fname' value={formData.fname} required onChange={handleChange}/>
      <label htmlFor="">Second Name</label>
      <input type="text" name='sname' value={formData.sname} required onChange={handleChange} />
      <button type='submit'>{isEditing ? 'Update':'Submit' }</button>
    </form>

     <table>
      <tr>
        <th>S.no</th>
        <th>FName</th>
        <th>SName</th>
        <th colSpan={2}>Action</th> 
      </tr>

      {tableData && tableData.map((data, index)=>(
      <tr key={index}>
        <td>{index+1}</td>
        <td>{data.fname}</td>
        <td>{data.sname}</td>
        <td><button onClick={()=>handleEdit(index)}>edit</button></td>

        {/*----------------------with backend---------------------- */}
        <td><button onClick={()=>handleRomove(data._id)}>remove</button></td> 
        {/*----------------------End with backend---------------------- */}

        {/*-------------------without backend------------- */}
        {/* <td><button onClick={()=>handleRomove(index)}>remove</button></td>  */}
        {/*-------------------End without backend------------- */}
      </tr>
      ))}
     </table>
    </>
  )
}

export default App
