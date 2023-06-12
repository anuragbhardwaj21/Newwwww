const ShowLectures = () => {
  return (
    <div className="show-lecture">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Batch</th>
            <th>Schedule</th>
            <th>Conclude</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{/* Add lectures here */}</tbody>
      </table>
    </div>
  );
};

export default ShowLectures;
