import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import HomePageMain from "./components/HomepageMain";

function App() {
  return (
    <>
      <Header />
      <div style={{marginTop: "4rem"}}>

          <HomePageMain  />

      </div>
    
     

     
    </>
  );
}

export default App;
