import React,{useEffect,useState} from 'react'
import ReactPaginate from "react-paginate";
import adminService from "./../../../services/admin.service"
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


function Admin() {

  const navigate = useNavigate();
  const [laborants, setLaborants] = useState([]);


  useEffect(()=>{
    const fetchPosts = async () =>{
    const res = await adminService.getLaborantList(true);
    console.log("Respofcdses",res);
    setLaborants(res.data);
    }
    fetchPosts()
  },[])

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [pageNumber, setPageNumber] = useState(0);

  const laborantsPerPage = 5;
  const pagesVisited = pageNumber * laborantsPerPage;



  const displayUsers = laborants.slice(pagesVisited, pagesVisited + laborantsPerPage)
  .map((laborant) => {
    return (
      <tr>
      <th>{laborant.ad}</th>
      <th>{laborant.soyad}</th>
      <th>{laborant.laborantId}</th>
      <button className="button-32" onClick={()=>changeLaborantId(laborant.laborantId)}>incele</button></tr>
    );
  });

  const pageCount = Math.ceil(laborants.length / laborantsPerPage);

  const changeLaborantId =(value)=>{
    navigate("/admin/profile",{state:{laborantId:value}})
  }

  return (
    <div className='App'>
    <Table className='tableStyle' striped="columns">
  <thead>
    <tr className='trstyle'>
      <th>ad</th>
      <th>soyad</th>
      <th>laborantId</th>
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

export default Admin