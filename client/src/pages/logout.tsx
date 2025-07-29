// client/src/pages/logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() =>{
        localStorage.clear();
        navigate("/");
    },[navigate]);
return null
}

export default Logout;