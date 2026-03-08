//client/src/shared/table/row-actions.tsx
import React from "react";

interface RowActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const RowActions: React.FC<RowActionsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="flex gap-3">
      {isEditing ? (
        <>
          <button
            onClick={onSave}
            className="text-green-600 font-medium hover:underline"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onEdit}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default RowActions;
