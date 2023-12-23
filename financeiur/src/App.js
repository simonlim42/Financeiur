// import StockTracker from './components/stockTracker';
import { ColorModeContext , useMode } from './theme';
import { CssBaseline, ThemeProvider} from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/Dashboard";
import Sidebar from "./scenes/global/Sidebar";
import FAQ from "./faq/faq"
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('AAPL');
  return (
    <ColorModeContext.Provider value ={colorMode}>
      <ThemeProvider theme = {theme}>
        <CssBaseline />
        <div className="app">
        <Sidebar isSidebar={isSidebar} />
          <main className="content">
          <Topbar setIsSidebar={setIsSidebar} setSearchQuery={setSearchQuery}/>
          <Routes>            
            <Route path="/" element={<Dashboard searchQuery={searchQuery}/>}/>
            <Route path="/faq" element={<FAQ />}/>
          </Routes>

            {/* <StockTracker /> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
