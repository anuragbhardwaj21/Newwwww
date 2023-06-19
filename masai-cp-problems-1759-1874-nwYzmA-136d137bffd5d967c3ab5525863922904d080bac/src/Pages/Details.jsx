export const Details = () => {
  return (
    <div data-cy="details-component">
      <h1> Student Details</h1>

      <div>
        <h3 data-cy="student-details-name"></h3>

        <div>
          <h4 data-cy="student-details-age"></h4>
          <h4 data-cy="student-details-grade"></h4>
        </div>

        <h4 data-cy="student-details-info"></h4>

        <div>
          <button data-cy="edit-Btn">Edit</button>

          <button data-cy="delete-Btn">Delete</button>
        </div>
      </div>
    </div>
  );
};
