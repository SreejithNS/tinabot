import { KeyboardEvent, useState } from 'react';
import sendImage from '../../images/send.png';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

const ChatBox = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      from: '',
      message: '',
    },
  ]);
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          borderRadius: '30px',
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            height: '80vh',
            background: '#66b4db',
            width: '100%',
            overflowY: 'auto',
          }}
        >
          {messages.map((message, index) => {
            return (
              <div>
                {message && message.from === 'sender' ? (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                    }}
                  >
                    <SentMessage message={message.message} />
                  </div>
                ) : (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                    }}
                  >
                    <ReceivedMessage message={message.message} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div
          style={{
            height: '10vh',
            background: '#aeffa3',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ transform: 'rotate(180deg)' }}>
            <button
              style={{ cursor: 'pointer' }}
              onClick={() => receiveMessage()}
            >
              <img
                src={sendImage}
                alt="send message"
                width={50}
                height={50}
                style={{ rotate: '180deg' }}
              />
            </button>
          </div>
          <input
            type="text"
            name="message"
            id="message"
            autoCapitalize="word"
            autoComplete="off"
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
            onKeyDown={e => handleKeyPress(e)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
              height: '50%',
              border: '1px solid black',
              borderRadius: '30px',
              margin: '5px',
              padding: '10px',
              outline: 'none',
              background: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'black',
            }}
          />
          <div style={{}}>
            <button style={{ cursor: 'pointer' }} onClick={() => sendMessage()}>
              <img src={sendImage} alt="send message" width={50} height={50} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
