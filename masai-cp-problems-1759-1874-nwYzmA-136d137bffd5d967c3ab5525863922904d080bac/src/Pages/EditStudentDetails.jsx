export const EditStudentDetails = () => {
  return (
    <div>
      <form data-cy="edit-form">
        <h1>Edit details here</h1>

        <div>
          <label>Name</label>
          <input type="text" data-cy="edit-form-student-name" />
        </div>

        <div>
          <label>Age </label>
          <input type="number" data-cy="edit-form-student-age" />
        </div>
        <div>
          <label>Grade </label>
          <input type="number" data-cy="edit-form-student-grade" />
        </div>
        <div>
          <label>AdditionalInfo </label>
          <input type="text" data-cy="edit-form-student-info" />
        </div>

        <button type="submit"> Edit Student details</button>
      </form>
    </div>
  );
};
