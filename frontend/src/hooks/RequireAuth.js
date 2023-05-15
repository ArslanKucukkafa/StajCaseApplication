import { useLocation,Navigate, Outlet } from "react-router-dom";
const RequireAuth = ({allowedRoles}) =>{
    const location = useLocation();
    const token = JSON.parse(localStorage.getItem("accesToken"));
    const role = JSON.parse(localStorage.getItem("role"));

    console.log(allowedRoles?.includes(role))
    return(
            allowedRoles?.includes(role)
            ?<Outlet/>
            :token
                ?<Navigate to="error" state={{from:location}} replace/>
                :<Navigate to="/login" state={{from:location}} replace/>
    );
}
export default RequireAuth