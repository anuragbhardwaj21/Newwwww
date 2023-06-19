export const Card = () => {
  return (
    <div data-cy="student-card">
      <h3 data-cy="student-name">Name: {"student name"}</h3>

      <div>
        <h4 data-cy="student-age">Age: {"student age"}</h4>
        <h4 data-cy="student-grade">Grade: {"studen grade"}</h4>
      </div>

      <button data-cy="view-dtl-btn">View Details</button>
    </div>
  );
};
