import React from "react"; // Import the React library for building user interfaces
import ReactDOM from "react-dom/client"; // Import the ReactDOM client for rendering React components in the DOM

// Import the App component from its file (likely App.jsx)
import App from "./App.jsx";

// Import the CSS styles from the index.css file
import "./index.css";

// Import Chakra UI components and theme extension
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// Import the `mode` function from Chakra UI's theme tools for conditional styling
import { mode } from "@chakra-ui/theme-tools";

// Import the BrowserRouter component from React Router DOM for routing
import { BrowserRouter } from "react-router-dom";

// Define custom CSS styles for the global scope
const styles = {
  global: (props) => ({
    body: {
      // Set background color based on the theme mode (light or dark)
      bg: mode("gray.100", "#000")(props),
      // Set text color based on the theme mode (dark or light)
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

// Define the initial theme configuration
const config = {
  initialColorMode: "dark", // Set the initial theme to dark
  useSystemColorMode: false,  // Don't use system color preferences
};

// Create a custom theme by extending the default Chakra UI theme with our styles and config
const theme = extendTheme({ config, styles });

// Render the React application using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>  
    <BrowserRouter>      
      <ChakraProvider theme={theme}> 
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
