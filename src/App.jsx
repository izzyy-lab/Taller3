import { HashRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";

// Layout
import Footer from "./features/layout/components/Footer";
import Header from "./features/layout/components/Header";
import { Content } from "./features/layout/components/Content";

// Auth
import { MyAccount } from "./features/auth/components/MyAccount";
import { MyBuys } from "./features/auth/components/MyBuys";
import { MyFavorites } from "./features/auth/components/MyFavorites";

// Articles
import { Articles } from "./features/articles/components/Articles";
import Offers  from "./features/articles/components/Offers";
import { FavoritesProvider } from "./features/articles/hooks/FavoriteContext";

function App() {
  return (
    <>
    <FavoritesProvider>
      <CssBaseline />

      <HashRouter>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
          }}
        >
          <Header />

          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/mybuys" element={<MyBuys />} />
              <Route path="/myfavorites" element={<MyFavorites />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </HashRouter>
      </FavoritesProvider>
    </>
  );
}

export default App;