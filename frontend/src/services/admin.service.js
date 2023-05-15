import axios from 'axios';

const API_URL = "http://localhost:8080";
const header = () =>{
    let token = JSON.parse(localStorage.getItem("accesToken"));
    return {
        'Accept':'*/*', 
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer `+token}
    }


const getLaborantList = (isActivate) => {
    return axios.get(API_URL+"/api/v1/admin/getAllLaboratories/"+isActivate,{headers:header()})
}

const getLaborantDetail = (laborantId) =>{
    return axios.get(API_URL+"/api/v1/admin/laborantDetail?laborant_id="+laborantId,{headers:header()})
}

const deleteLaborant = (laborantId) => {
    return axios.post(API_URL+"/api/v1/admin/deleteLaborant?laborant_id="+laborantId,null,{headers:header()})
}

const roleUpgrade = (laborantId) =>{
    return axios.post(API_URL+"/api/v1/admin/changeRole?laborant_id="+laborantId,null,{headers:header()})
}

const laborantAccountActive = (isActivate,laborantId) => {
    return axios.put(API_URL+"/api/v1/admin/laborantAccountActivate?activated="+isActivate+"&laborant_id="+laborantId,null,{headers:header()})
}

const AdminService = {
    getLaborantList,
    getLaborantDetail,
    deleteLaborant,
    roleUpgrade,
    laborantAccountActive
  }

  export default AdminService