import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Title from "./Components/Title";
import Form from "./Components/Form";
import { GlobalProvider } from "./Context/GlobalState";
import MainBody from "./Components/MainBody";
import Footer from "./Components/Footer";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [movieres, setMovieRes] = useState([]);
  const handleform = (movies) => {
    setSubmitted(true);
    setMovieRes(movies);
  };
  return (
    <GlobalProvider>
      <div className="flex flex-col min-h-screen ">
        {/* Header Section */}
        <header className="sm:px-20">
          <div className="container mx-auto">
            <Title />
            <Form onSubmit={handleform} />
          </div>
        </header>

        {/* Main Content Section */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4">
            {submitted && (
              <>
                <hr/>
                <MainBody movieres={movieres} />
              </>
            )}
          </div>
        </main>

        {/* Footer Section */}
        <footer className=" text-center mt-auto">
          <Footer />
        </footer>
      </div>
    </GlobalProvider>
  );
}

export default App;
