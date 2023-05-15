import React,{useEffect,useState} from 'react'
import ReactPaginate from "react-paginate";
import "./admin.css";
import adminService from "../../../services/admin.service"
import Table from 'react-bootstrap/Table';

function Unconfirmed() {
    const [laborants, setLaborants] = useState([]);
    useEffect(()=>{
        const fetchPosts = async () =>{
        const res = await adminService.getLaborantList(false);
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
          <td>{laborant.ad}</td>
          <td>{laborant.soyad}</td>
          <td>{laborant.laborantId}</td>
          <div className='LineButton'>
          <button className="button-32" onClick={()=>deletLaborant(laborant.laborantId)}>delete</button>
          <button className="button-32" onClick={()=>activateLaborant(laborant.laborantId)}>activate</button>
          </div>
          </tr>
        );
      });

      const pageCount = Math.ceil(laborants.length / laborantsPerPage);

      const deletLaborant =(value)=>{
        adminService.deleteLaborant(value).then((response) => {console.log(response)})
        window.location.reload();
      }

      const activateLaborant = (value) => {
        adminService.laborantAccountActive(true,value).then((response) => {console.log(response)})
        window.location.reload();
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

export default Unconfirmed