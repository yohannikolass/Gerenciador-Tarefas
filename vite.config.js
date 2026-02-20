import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],// Se for usar GitHub Pages, coloque o nome do repositório aqui:
  // base: '/Gerenciador-Tarefas/',
})