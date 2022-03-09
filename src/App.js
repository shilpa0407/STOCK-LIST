import React,{useState,useEffect} from 'react'
import "./App.css"
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import {  Modal } from 'react-bootstrap';



const App = () => {
  const [APIdata,setAPIData] = useState([]);
  const [stockInfo , setStockInfo] = useState([]);
  const [showModal,setShowModal]  = useState("false");
  const [show, setShow] =  useState(false);

  const handleClose = () =>setShow(false) 
  const handleShow = () =>setShow(true)
  
 const getAPIdata = async () =>{
    try{
     const data = await axios.get("http://localhost:5000/Stocks");
     setAPIData(data.data)
    }catch(e){
      console.log(e)
    }
 }
 

useEffect(()=>{
  getAPIdata();
},[]);

const columns = [ 
 { dataField: "STOCK",  text: "STOCKS",
  headerStyle: { backgroundColor: 'skyblue' }, headerAlign: 'center',style: { textAlign: 'center' }},
 { dataField: "DATE", text: "DATE", 
  headerStyle: { backgroundColor: 'skyblue'},headerAlign: 'center', style: { textAlign: 'center' }},
 { dataField: "LAST", text: "LAST",
  headerStyle: { backgroundColor: 'skyblue'},headerAlign: 'center',style: { textAlign: 'center' }}
]
 
const rowEvents = {
  onClick:(e, row) => {
     console.log(row);
     setStockInfo(row)
     toggleTrueFalse()
   }
 };

 const toggleTrueFalse = () =>{
  setShowModal(handleShow);
 };

 const ModalContent = () =>{
   return(
     <Modal show = {show} onHide= {handleClose}>
     <Modal.Header  closeButton>
       <Modal.Title>STOCK : {stockInfo.STOCK}</Modal.Title>
       </Modal.Header>
        <Modal.Body>
          <tr>
            <ol>HIGH: {stockInfo.HIGH}</ol>
            <ol>LOW:  {stockInfo.LOW}</ol>
            <ol>LAST: {stockInfo.DATE}</ol>
            <ol>DATE: {stockInfo.LAST}</ol>
          </tr>
        </Modal.Body>
     </Modal>
   )

 }

  return (
    <>
    <h3 className='h3'>STOCK LIST</h3>
  <div className='table'>
    <BootstrapTable
      keyField='STOCK' data={APIdata} columns={columns}
      rowEvents = {rowEvents} 
    />
    {show ? <ModalContent/> : null}
  </div>
  </>
  )
}

export default App;