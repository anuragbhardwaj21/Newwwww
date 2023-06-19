export const Invalid = () => {
  return (
    <div>
      <div data-cy="invalid-component">
        <h1 data-cy="invalid-code"></h1>
        <img
          src="https://cdn-icons-png.flaticon.com/128/944/944063.png"
          alt="icon"
        />
        <h3 data-cy="invalid-message"></h3>

        <button data-cy="back-home"> {"<< "} Back to Home page</button>
      </div>
    </div>
  );
};
