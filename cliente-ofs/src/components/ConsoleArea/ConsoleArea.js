function ConsoleArea({ message, onCompile }) {
  return (
    <div className="Console">
      <div className="RA">
        <button onClick={onCompile}>Compilar</button>
        <textarea readOnly value={message} rows="3"></textarea>
      </div>
    </div>
  );
}

export default ConsoleArea;
