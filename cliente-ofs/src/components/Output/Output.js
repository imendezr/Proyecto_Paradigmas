import React from 'react';

const Output = ({ result }) => {
    return (
        <div>
            <textarea readOnly value={result} rows="10" cols="50"></textarea>
        </div>
    );
};

export default Output;
