const ReceivedMessage = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        minHeight: '4vh',
        maxWidth: '80%',
        width: 'fit-content',
        background: '#9fe496',
        borderRadius: '10px',
        padding: '5px',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {message}
    </div>
  );
};

export default ReceivedMessage;
