import React from 'react'
import { useState } from 'react'
import "./reportAdd.css"
import icon from "./image/reportIcon.jpg"
import LaborantService from '../../../services/laborant.service'
import { useNavigate } from 'react-router-dom'

const ReportAdd = () => {

  const navigate = useNavigate();
  const [imageFile,setImageFile] = useState();
  const [image,setImage]=useState();
  const [report, setReport] = useState({
    patient_firstname :"",
    patient_lastname:"",
    patient_identity_no:"",
    dfnTitle:"",
    dfnDetails:""
  });

  const selectHandleImage=(event)=>{
	if (event.target.files && event.target.files[0]) {
		setImageFile(event.target.files[0])
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (_event) => {
		let image=reader.result;
		setImage(image)
	}
  }else{setImage(icon)}
}

const saveReport = () => {
	let file = imageFile
	let formData= new FormData();
	const reportBlob=new Blob([JSON.stringify(report)], {type: 'application/json'});
	formData.append('reportSaveDto',reportBlob);
	formData.append('image',file,file.name)

	LaborantService.saveReport(formData).then((response)=>{
		console.log(response)
    if(response.data.status===true){
      navigate("/laborant/reports")
    }else{alert(response.data.message)} 
	})
}




  const onChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };


  return (
    <div className="container rounded bg-white mt-5 mb-5">
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded" width="300px" height="300px" src={image}  alt='image'/>
            </div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Rapor</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6"><label className="labels">Name</label><input type="text" name='patient_firstname' pattern="^[a-z]{3,}$"  className="form-control" placeholder="first name" onChange={onChange}/></div>
                    <div className="col-md-6"><label className="labels">Surname</label><input type="text" name='patient_lastname' className="form-control"  placeholder="surname" onChange={onChange}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">hasta kimlik no</label><input type="text" name='patient_identity_no' className="form-control" placeholder="enter patient identity no" onChange={onChange}/></div>
    		    </div>
				<br></br>
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={saveReport} >Rapor kaydet</button></div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-3 py-5">
				<div nameName="col-md-12"><label className="labels">Tanı başlıgı</label><input type="text" name='dfnTitle' className="form-control" placeholder="enter diagnosis title" onChange={onChange}/></div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Tanı detay</label>
					<textarea className="form-control" id="exampleFormControlTextarea1" name='dfnDetails' rows="6" onChange={onChange}></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="formFile" className="form-label">Default file input example</label>
					<input className="form-control" type="file" id="formFile" onChange={selectHandleImage}/>
				</div>
            </div>
        </div>
    </div>
</div>
  )
}
export default ReportAdd
