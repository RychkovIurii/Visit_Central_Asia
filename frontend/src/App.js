import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from './routes/Home';
import ThingsToDo from './routes/ThingsToDo';
import Search from './routes/Search';
import PracticalTips from './routes/PracticalTips';
import PlacesToGo from './routes/PlacesToGo';
import PlacesToStay from './routes/PlacesToStay';
import SignIn from './routes/SignIn';
import TravelPlan from './routes/TravelPlan';
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <div className="App">
      
      <LanguageProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/places-to-stay' element={<PlacesToStay/>}/>
        <Route path='/places-to-go' element={<PlacesToGo/>}/>
        <Route path='/things-to-do' element={<ThingsToDo/>}/>
        <Route path='/practical-tips' element={<PracticalTips/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/logout' element={<Home/>}/>
        <Route path="/travel-plan" element={<TravelPlan />} />
      </Routes>
      </LanguageProvider>
    </div>
  );
}

export default App;
