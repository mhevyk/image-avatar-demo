import { Toaster } from "@/components/Toaster";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Failed to find the root element");
}

createRoot(root).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
      <Toaster />
    </ChakraProvider>
  </StrictMode>,
);
