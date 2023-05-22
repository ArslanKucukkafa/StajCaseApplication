import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import "./Laborant.css";
import laborantService from '../../../services/laborant.service.js'
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';

function Laborant() {


  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [searchFilter,setSearchFilter]=useState({
    patient_firstname: "",
    patient_lastname: "",
    patient_identity_no: "",
    laborantAd: "",
    laborantSoyad: ""
  })

  // ORDER BY CREATE DATE
  const sortByCreateDate = (event) => {
    if(event.target.value==='OrderBy DESC'){
      const sortedDataDesc = [...reports].sort((a, b) => {
        return new Date(b.create_date) - new Date(a.create_date);
      });
      setReports(sortedDataDesc);
    }
    else if(event.target.value==='OrderBy ASC'){
      const sortedDataAsc = [...reports].sort((a, b) => {
        return new Date(a.create_date) - new Date(b.create_date);
      });
      setReports(sortedDataAsc)
    }
  };

  const onChange = (e) => {
    setSearchFilter({ ...searchFilter, [e.target.name]: e.target.value });
  };


useEffect(()=>{
  const fetchPosts = async () =>{
  const res = await laborantService.listReport(searchFilter);
  console.log("Respofcdses",res);
  setReports(res.data);}
  fetchPosts()
},[searchFilter])

const search = async () => {
  setReports([]);
  const res = await laborantService.listReport(searchFilter);
  setReports(res.data);
  console.log(res,"------------------",searchFilter)
}

const changeReportId =(value)=>{
  // Route will be change when moved to proctected _--WARNING
  console.log(value);
  navigate("/laborant/detail",{state:{reportId:value}})}


  const [pageNumber, setPageNumber] = useState(0);

  const reportsPerPage = 4;
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
    <div>
    <section class="search-sec">
    <div class="container">
        <form action="#" method="post" novalidate="novalidate">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                            <input type="text" name='patient_identity_no' class="form-control search-slt" placeholder="Enter Patinet İdentity no" onChange={onChange}/>
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                            <input type="text" name='patient_firstname' class="form-control search-slt" placeholder="Enter Patient name" onChange={onChange}/>
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                            <input type="text" name='patient_lastname' class="form-control search-slt" placeholder="Enter Patient surname" onChange={onChange}/>
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                            <input type="text" name='laborantAd' class="form-control search-slt" placeholder="Enter Laborant name" onChange={onChange}/>
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                            <input type="text" name='laborantSoyad' class="form-control search-slt" placeholder="Enter Laborant surname" onChange={onChange}/>
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                            <button type="button" class="btn btn-danger wrn-btn" onClick={search}>Search</button>
                        </div> 
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
      
    <Table className='tableStyle' striped="columns">
      <thead>
        <tr className='trstyle'>
          <th>Identfy no</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Report C||U time</th>
          <select name="language" id="language" onChange={sortByCreateDate}>
            <option value="OrderBy DESC" >OrderBy DECS</option>
            <option value="OrderBy ASC" >OrderBy ASC</option>
          </select>
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