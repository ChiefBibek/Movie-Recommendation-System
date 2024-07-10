import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Title from "./Components/Title";
import Form from "./Components/Form";
import { GlobalProvider } from "./Context/GlobalState";
import MainBody from "./Components/MainBody";
import Footer from "./Components/Footer";
import { DNA } from "react-loader-spinner";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [movieres, setMovieRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleform = async (movies) => {
    setSubmitted(true);
    setLoading(false);
    setMovieRes(movies);
  };

  return (
    <GlobalProvider>
      <div className="flex flex-col min-h-screen ">
        {/* Header Section */}
        <header className="sm:px-20">
          <div className="container">
            <Title />
            <Form onSubmit={handleform} setLoading={setLoading} />
          </div>
        </header>

        {/* Main Content Section */}
        <main className="flex-1 overflow-y-auto flex justify-center items-center">
          <div className="my-5">
            {loading && (
              <div className="">
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="fidget-spinner-wrapper"
                />
                </div>
            )}
            {submitted && !loading && (
                <MainBody movieres={movieres} />
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
