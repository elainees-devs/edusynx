// client/src/pages/dashboard/schools.tsx
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { SchoolList } from "../../components";


const Schools: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () =>{
    navigate(-1)
  }
  return (
    <div>
        <button
        onClick={handleNavigate}
        className="flex items-center gap-1 p-2 text-sm text-teal-600 hover:underline"
        aria-label="Go back"
      >
        <FiArrowLeft className="text-lg" />
        Back
      </button>
  
            <SchoolList />
          </div>

  );
};

export default Schools;
