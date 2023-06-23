import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globale: true,
            environment: 'jsdom',
            include: [
                './src/**/*.test.js'
            ],
            exclude: [...configDefaults.exclude, 'e2e/*'],
            reporters: [
                'default',
                'junit'
            ],
            outputFile: './test-results.xml',
            root: fileURLToPath(new URL('./', import.meta.url))
        }
    })
)
