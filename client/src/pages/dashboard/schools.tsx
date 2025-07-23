// client/src/pages/dashboard/schools.tsx
import { useNavigate } from "react-router-dom";
import SchoolTable from "../../components/dashboard/super-admin/school-list";
import { FiArrowLeft } from "react-icons/fi";


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
  
            <SchoolTable />
          </div>

  );
};

export default Schools;
