const ReceivedMessage = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        maxWidth: '80%',
        borderRadius: '8px',
        textAlign: 'left',
      }}
      className="p-2 bg-primary text-light border-primary animate__animated animate__fadeInLeft"
    >
      {message}
    </div>
  );
};

export default ReceivedMessage;
