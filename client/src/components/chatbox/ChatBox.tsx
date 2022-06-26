import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

const ChatBox = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<{ from: string; message: string }[]>([]);

  const conversationRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (currentMessage) {
      setMessages([
        ...messages,
        {
          from: 'sender',
          message: currentMessage,
        },
      ]);
      setCurrentMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const receiveMessage = () => {
    setMessages([
      ...messages,
      {
        from: 'receiver',
        message: currentMessage ? currentMessage : 'Hello',
      },
    ]);
    setCurrentMessage('');
  };

  useEffect(() => {
    if (conversationRef.current) {
      const xH = conversationRef.current.scrollHeight;
      conversationRef.current.scrollTo(0, xH);
    }
  }, [messages])


  return (
    <div
      className="w-100 d-flex flex-column justify-content-center align-items-center"
      style={{ height: '100%' }}
    >
      <div
        style={{
          overflowX: 'hidden',
          height: "100px"
        }}
        ref={conversationRef}
        className="bg-light w-100 flex-grow-1 scrollbar-hidden"
      >
        {messages.map((message, index) => {
          return (
            <div>
              {message && message.from === 'sender' ? (
                <div
                  key={index}
                  className="m-2 d-flex flex-row-reverse"
                >
                  <SentMessage message={message.message} />
                </div>
              ) : (
                <div
                  key={index}
                  className="m-2 d-flex flex-row"
                >
                  <ReceivedMessage message={message.message} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        className="d-flex justify-content-between align-items-center w-100"
      >
        <input
          type="text"
          name="message"
          id="message"
          autoCapitalize="word"
          autoComplete="off"
          value={currentMessage}
          onChange={e => setCurrentMessage(e.target.value)}
          onKeyDown={e => handleKeyPress(e)}
          className="form-control m-2 flex-grow-1"
          placeholder='Type your message here...'
        />
        <button className="btn btn-primary m-2" onClick={() => sendMessage()}>
          Send
        </button>
        <button className="btn btn-primary m-2" onClick={() => receiveMessage()}>
          Receive
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
