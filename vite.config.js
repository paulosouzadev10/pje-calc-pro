import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh'

export default defineConfig({
  plugins: [react()],
  base: '/pje-calc-pro/', // Adicione esta linha com o nome do seu repositório no GitHub
})