// client/src/utils/useSchoolEditHandlers.ts
import { useState } from "react";
import type { ISchool } from "../types";
import { deleteSchool, updateSchool } from "../api/school.api";

export const useSchoolEditHandlers = (
  setSchools: React.Dispatch<React.SetStateAction<ISchool[]>>
) => {
  const [editingSchoolId, setEditingSchoolId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ISchool>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (id: string) => {
    try {
      const updatedSchool = await updateSchool(id, editForm);
      setSchools((prev) =>
        prev.map((school) => (school._id === id ? updatedSchool : school))
      );
      setEditingSchoolId(null);
      setEditForm({});
    } catch (error) {
      console.error("Failed to update school:", error);
      alert("Failed to save changes.");
    }
  };

  const handleCancel = () => {
    setEditingSchoolId(null);
    setEditForm({});
  };

  const handleEdit = (school: ISchool) => {
    setEditingSchoolId(school._id || "");
    setEditForm(school);
  };

 const handleDelete = async (id: string) => {
  try {
    console.log("Deleting school with ID:", id);

    await deleteSchool(id); // call API with just the ID

    // Remove from state
    setSchools((prev) => prev.filter((school) => school._id !== id));

    console.log("School deleted successfully.");
  } catch (error) {
    console.error("Error deleting school:", error);
  }
};


  return {
    editingSchoolId,
    editForm,
    handleChange,
    handleSave,
    handleCancel,
    handleEdit,
    handleDelete
  };
};
