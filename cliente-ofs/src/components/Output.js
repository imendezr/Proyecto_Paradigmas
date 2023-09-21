import React from 'react';

const Output = ({ result }) => {
  return (
    <div>
      <h2>Resultado:</h2>
      <pre>{result}</pre>
    </div>
  );
};

export default Output;
