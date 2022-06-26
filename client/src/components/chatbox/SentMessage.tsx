const SentMessage = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        minHeight: '4vh',
        maxWidth: '80%',
        width: 'fit-content',
        background: 'white',
        borderRadius: '10px',
        padding: '5px',
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {message}
    </div>
  );
};

export default SentMessage;
