import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import React,{useEffect,useState,} from 'react'
import AdminService from "./../../../services/admin.service"
import { useLocation,useNavigate } from 'react-router-dom';
function Profile() {

    const location = useLocation();
    const navigate = useNavigate();

    const [user,setUser] = useState({
        ad:"",
        soyad:"",
        laborantId:"",
        rolename:"",
        reportCount:0
    });

    useEffect(() => {
        const fetchPosts = async () =>{
            const laborant_id= location?.state.laborantId
            const res = await AdminService.getLaborantDetail(laborant_id);
            setUser(res.data);
        }
        fetchPosts()
    },[]);



    const deleteUser = () => {
        AdminService.deleteLaborant(user.laborantId).then((response)=>{
            let data = response.data;
            if(data.status===true){
                alert(data.message)
                navigate("/admin/list");
            }else{alert(data.message)}
        })
    }

    const roleUpgrade = () =>{
        AdminService.roleUpgrade(user.laborantId).then((response)=>{
           let data=response.data;
           if(data.status===true){alert(data.message);window.location.reload()}else{alert(data.message)}}
           )}

  return (
    <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="20" lg="100" xl="100" className="mt-5">
          <MDBCard style={{ borderRadius: '45px' }}>
            <MDBCardBody className="p-4">
              <div className="d-flex text-black">
                <div className="flex-shrink-0">
                  <MDBCardImage
                    image_name="image"
                    style={{ width: '300px',height:'400px', borderRadius: '5px' }}
                    src="https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=1800"
                    alt='Generic placeholder image'
                    fluid />
                </div>
                <br></br>
                <div className="flex-grow-1 ms-3">
                  <MDBCardTitle>Profile</MDBCardTitle>


                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="large text-muted mb-1">Ad</p>
                      <p className="mb-0">{user.ad}</p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="large text-muted mb-1">Soyad</p>
                      <p className="mb-0">{user.soyad}</p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="large text-muted mb-1">Role</p>
                      <p className="mb-0">{user.rolename}</p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="large text-muted mb-1">Rapor sayısı</p>
                      <p className="mb-0">{user.reportCount}</p>
                    </div>
                  </div>

                 <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="large text-muted mb-1">Laborant id</p>
                      <p className="mb-0">{user.laborantId}</p>
                    </div>
                  </div>

                  <div className="d-flex pt-1">
                  <MDBBtn className="me-1" color='danger' onClick={deleteUser} >Sil</MDBBtn>
                  <MDBBtn className="flex-grow-1" onClick={roleUpgrade}>Rol yükselt</MDBBtn>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>
    )
}

export default Profile