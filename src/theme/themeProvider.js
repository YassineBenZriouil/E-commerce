import React, { useEffect, useState } from "react";
import "./themes.css";

function Theme() {
    const themes = [
        "default",
        "dark",
        "love",
        "grape",
        "sky",
        "forest",
        "sunset",
        "pitch-black",
        "jumia",
    ];
    const [selectedTheme, setSelectedTheme] = useState("default");

    const applyTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

    const handleThemeChange = (e) => {
        const theme = e.target.value;
        setSelectedTheme(theme);
        applyTheme(theme);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "default";
        setSelectedTheme(storedTheme);
        applyTheme(storedTheme);
    }, []);

    return (
        <div className="theme-selector">
            <select
                id="theme-select"
                value={selectedTheme}
                onChange={handleThemeChange}
            >
                {themes.map((theme) => (
                    <option key={theme} value={theme}>
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Theme;
