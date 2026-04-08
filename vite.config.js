import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pje-calc-pro/', // Adicione exatamente o nome do seu repositório aqui entre barras
})