// client/src/pages/ViewTeachers.tsx

import { ViewTeachersDetails } from "../components";
import { sampleTeachers } from "../data/sampleTeachers";

const ViewTeachersPage = () => {
  const handleEdit = (teacherId: string) => {
    console.log("Edit teacher:", teacherId);
  };

  const handleToggle = (teacherId: string) => {
    console.log("Toggle status for:", teacherId);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Teachers List</h1>
      <ViewTeachersDetails
        teachers={sampleTeachers}
        onEdit={handleEdit}
        onToggleStatus={handleToggle}
      />
    </div>
  );
};

export default ViewTeachersPage;
