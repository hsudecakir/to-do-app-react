import { useEffect, useState } from "react";

export default function Header(){
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return(
    <header>
      <div className="header-container">
        <h1>TODO</h1>
        {isDarkMode ? <img onClick={() => setIsDarkMode(!isDarkMode)} src="./images/sun-icon.svg" /> : <img onClick={() => setIsDarkMode(!isDarkMode)} src="./images/moon-icon.svg" />}
      </div>
    </header>
  )
}