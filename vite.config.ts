import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1]
const isUserSiteRepo = repositoryName?.toLowerCase().endsWith(".github.io")
const ghPagesBase =
  repositoryName && !isUserSiteRepo ? `/${repositoryName}/` : "/"

// https://vite.dev/config/
export default defineConfig({
  base: ghPagesBase,
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
