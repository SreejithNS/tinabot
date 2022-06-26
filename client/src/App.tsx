import './App.scss';
import PredictionForm from './components/widgets/predictionform';

function App() {
  return (
    <main className="container-sm h-100 position-relative text-center">
      <section className='pt-5'>
        <h1 className="mt-5 fw-bold animate__animated animate__slideInDown">Welcome to the World of Healthy Skin</h1>
      </section>
      <section className='position-absolute top-50 start-50 translate-middle'>
        <span className="lead my-5 animate__animated animate__fadeIn">
          Find the issues on your skin.<br />
          Just upload an image of your affected skin.
        </span>
        <PredictionForm />
      </section>
    </main>
  );
}

export default App;
