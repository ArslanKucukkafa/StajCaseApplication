import React,{useEffect} from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn,MDBInput,MDBTextArea } from 'mdb-react-ui-kit';
import {  useLocation, useNavigate } from 'react-router-dom';
import LaborantService from '../../../services/laborant.service';
import { useState } from 'react';


function ReportDetail () {
    const location = useLocation();
    const navigate = useNavigate();

    var [image,setImage] = useState();
    var [imageFile ,setImageFile]=useState(null);
    let formData= new FormData();


    const [report, setReport] = useState({
      patient_firstname: "",
      patient_lastname: "",
      patient_identity_no: "",
      dfnTitle: "",
      dfnDetails: "",
      create_date:"",
      reportId:0,
      image:{
        data:"",
        image_id:0,
        image_name:"",
        image_type:""
      }
    });    

    const selectHandleImage =(event) =>{
    var reader = new FileReader();
    const file =event.target.files[0]
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
			setImage(reader.result)
      setImageFile(file)};
    }

    const displayReport = () =>{
        LaborantService.getReport(location?.state.reportId).then((res)=>{
            setReport(res.data)
            var strImage="data:"+res.data.image.image_type+";base64,"+res.data.image.data;
            setImage(strImage)
          })
    }

    useEffect(() => {
      let ignore = false;
      
      if (!ignore)  displayReport()
      return () => { ignore = true; }
      },[]);


     const onTodoChange =(event)=>{
      const { name, value } = event.target;
      setReport((prevState) =>({
        ...prevState,
        [name]:value
      }))
    }

    const updateReport=()=>{
      let update={
        patient_firstname: report.patient_firstname,
        patient_lastname: report.patient_lastname,
        patient_identity_no: report.patient_identity_no,
        dfnTitle: report.dfnTitle,
        dfnDetails: report.dfnDetails,
        reportId:report.reportId}

      let file = imageFile;
      if(file==null){
       let base = "data:"+report.image.image_type+";base64,"+report.image.data
       const byteCharacters = atob(base.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""));
       const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: report.image.image_type});
        file=blob;}

        const reportBlob=new Blob([JSON.stringify(update)], {type: 'application/json'});
        formData.append('ReportGetDto',reportBlob);
        formData.append('image',file,"filename")
        LaborantService.updateReport(formData).then((res)=>{
        alert(res.data.message)
        window.location.reload()
        })
      }

  const deleteReport = () =>{
    LaborantService.deleteReport(report.reportId).then((response) =>{
      alert(response.data.message)
    })
      navigate("/laborant/reports")
  }
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
                    src={image}
                    alt='Generic placeholder image'
                    fluid />
                </div>
                <div className="flex-grow-1 ms-3">
                  <MDBCardTitle>{report.patient_firstname+" "+report.patient_lastname}</MDBCardTitle>
                  <MDBCardText>{report.patient_identity_no}</MDBCardText>

                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="large text-muted mb-1">Report Id </p>
                      <p className="mb-0">{report.reportId}</p>
                    </div>
                  </div>

                 <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="large text-muted mb-1">Oluşturulma Tarihi</p>
                      <p className="mb-0">{report.create_date}</p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}> 
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Default file input example</label>
                    <input className="form-control" type="file" id="formFile" onChange={selectHandleImage}/>
                </div>
                  </div>
 

                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="large text-muted mb-1">Tanı</p>
                      <MDBInput name='dfnTitle' id='form1' placeholder={report.dfnTitle} type='text' size='lg' style={{ width: '400px',  }} onChange={onTodoChange} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="large text-muted mb-1">Detay</p>
                      <MDBTextArea name='dfnDetails' label='Message' id='textAreaExample' rows={7} style={{ width: '900px', borderRadius: '5px' }} placeholder={report.dfnDetails} onChange={onTodoChange}/>
                    </div>
                  </div>

                  <div className="d-flex pt-1">
                  <MDBBtn className="me-1" color='danger' onClick={deleteReport}>Sil</MDBBtn>
                  <MDBBtn className="flex-grow-1" onClick={updateReport}>Update</MDBBtn>
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

export default ReportDetail



