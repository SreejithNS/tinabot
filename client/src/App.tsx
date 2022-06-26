import React from 'react';
import './App.scss';
import ChatBox from './components/chatbox/ChatBox';
import PredictionForm from './components/widgets/predictionform';

function App() {
  const [start, setStart] = React.useState(false);
  return (
    <main style={{ height: "100vh", maxHeight: "100vh" }} className="container-sm position-relative text-center d-flex flex-column">
      {!start ? (
        <>
          <section className='pt-5'>
            <h1 className="mt-5 fw-bold animate__animated animate__slideInDown">AI Dermatologist<br />Dr.Tina from MUSTARD</h1>
          </section>
          <section className='position-absolute top-50 start-50 translate-middle'>
            <span className="lead my-5 animate__animated animate__fadeIn">
              Find the issues on your skin.<br />
              Just upload an image of your affected skin.
            </span>
            <PredictionForm onResult={() => setStart(true)} />
          </section>
        </>
      ) : (<section className='flex-fill animate__animated animate__fade d-flex align-items-center justify-content-center'>
        <ChatBox />
      </section>)
      }
    </main>
  );
}

export default App;
