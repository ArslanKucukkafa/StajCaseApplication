import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import "./Laborant.css";
import laborantService from '../../../services/laborant.service.js'
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';


function Laborant() {


  const navigate = useNavigate();
  const [reports, setReports] = useState([]);


useEffect(()=>{
  const fetchPosts = async () =>{
  const res = await laborantService.listReport().catch((error)=>{console.log(error); if(error==="Error: 403"){console.log("-*098767890876545678765")}});
  console.log("Respofcdses",res);
  setReports(res.data);

  }
  fetchPosts()
},[])

const changeReportId =(value)=>{
  // Route will be change when moved to proctected _--WARNING
  console.log(value);
  navigate("/laborant/detail",{state:{reportId:value}})
}



  const [pageNumber, setPageNumber] = useState(0);

  const reportsPerPage = 5;
  const pagesVisited = pageNumber * reportsPerPage;

  const displayUsers = reports.slice(pagesVisited, pagesVisited + reportsPerPage)
  .map((report) => {
    return (
      <tr>
      <th>{report.patient_identity_no}</th>
      <th>{report.patient_firstname}</th>
      <th>{report.patient_lastname}</th>
      <th>{report.create_date}</th>
      <button className="button-32" onClick={()=>changeReportId(report.reportId)}>incele</button>    </tr>
    );
  });

  const pageCount = Math.ceil(reports.length / reportsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };




  return (
    <div className='App'>
        <Table className='tableStyle' striped="columns">
      <thead>
        <tr className='trstyle'>
          <th>Identfy no</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Report C||U time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {displayUsers}
      </tbody>
      <ReactPaginate 
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}/>
    </Table>
  </div>
  )
}

export default Laborant