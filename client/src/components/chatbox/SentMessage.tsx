const SentMessage = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        maxWidth: '80%',
        borderRadius: '8px',
      }}
      className="p-2 bg-white border-primary border-1 animate__animated animate__fadeInRight"
    >
      {message}
    </div>
  );
};

export default SentMessage;
