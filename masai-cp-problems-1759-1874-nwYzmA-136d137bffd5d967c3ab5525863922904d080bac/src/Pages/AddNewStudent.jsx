export const AddNewStudent = () => {
  return (
    <div data-cy="add-new-component">
      <form data-cy="add-new-form">
        <h1>Add Student details</h1>

        <p data-cy="error-box"></p>

        <div>
          <label>Name</label>
          <input type="text" data-cy="form-student-name" />
        </div>

        <div>
          <label>Age </label>
          <input type="number" data-cy="form-student-age" />
        </div>
        <div>
          <label>Grade </label>
          <input type="number" data-cy="form-student-grade" />
        </div>
        <div>
          <label>AdditionalInfo </label>
          <input type="text" data-cy="form-student-info" />
        </div>

        <button type="submit"> Add Student</button>
      </form>
    </div>
  );
};
