import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Isso diz ao Vite: "use caminhos relativos ao arquivo atual"
})