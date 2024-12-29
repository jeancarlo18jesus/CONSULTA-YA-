import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",

    setupNodeEvents(on) {  // <-- Asegúrate de que sea "setupNodeEvents"
      // Ejecuta algo antes de que comiencen las pruebas
      on('before:run', (details) => {
        console.log('Las pruebas están a punto de comenzar' + details);
      });
    },
  },
});

