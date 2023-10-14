import {
    BrowserRouter as Router,
    Navigate,
    Routes,
    Route,
} from "react-router-dom";

import HomePage from "./scenes/HomePage";
import LoginPage from "./scenes/LoginPage";
import ProfilePage from "./scenes/ProfilePage";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Layout from "./scenes/Layout";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    const isAuth = Boolean(useSelector((state) => state.token));

    return (
        <div className="app">
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuth ? <Navigate to="/home" /> : <LoginPage />
                            }
                        />
                        <Route path="/" element={<Layout />}>
                            <Route
                                path="/home"
                                element={
                                    isAuth ? <HomePage /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/profile/:userId"
                                element={
                                    isAuth ? (
                                        <ProfilePage />
                                    ) : (
                                        <Navigate to="/" />
                                    )
                                }
                            />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </Router>
        </div>
    );
}

export default App;
