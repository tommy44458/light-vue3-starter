import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const TRUE = 'true'

export default ({ mode, command }: { mode: string, command: string }) => {
    const ENV = loadEnv(mode, process.cwd()) // load (dev || prod) .env
    // vite config
    return defineConfig({
        base: '/',
        define: {
            'process.env': ENV,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/styles/scss/element/index.scss" as *;',
                },
            },
        },
        plugins: [
            vue(),
            AutoImport({
                // targets to transform
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/, /\.vue\?vue/, // .vue
                    /\.md$/, // .md
                ],

                // global imports to register
                imports: [
                    // presets
                    'vue',
                    'vue-router',
                    // custom
                    {
                        '@vueuse/core': [
                            // named imports
                            'useMouse', // import { useMouse } from '@vueuse/core',
                            'useWindowSize', // import { useWindowSize } from '@vueuse/core',
                        ],
                        axios: [
                            ['default', 'axios'], // import { default as axios } from 'axios',
                        ],
                    },
                ],

                // Generate corresponding .eslintrc-auto-import.json file.
                // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
                eslintrc: {
                    enabled: false, // Default `false`
                    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                    globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
                },

                // custom resolvers
                // see https://github.com/antfu/unplugin-auto-import/pull/23/
                resolvers: [
                    ElementPlusResolver({
                        // for import styles/scss/element/index.scss to change system color
                        importStyle: 'sass',
                    }),
                ],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass',
                    }),
                ],
            }),
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [resolve(process.cwd(), 'src/assets/icon')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',
            }),
            ElementPlus({
                useSource: true,
            }),
        ],
        resolve: {
            alias: {
                mqtt: 'mqtt/dist/mqtt.js',
                '@': resolve(__dirname, resolve('src')),
            },
        },
        server: {
            open: true,
            proxy: {
                '/proxy': {
                    target: ENV.VITE_BASE_URL,
                    changeOrigin: command === 'serve' && ENV.VITE_OPEN_PROXY === TRUE, // is cross proxy,
                    rewrite: path => path.replace(/\/proxy/, ''),
                },
            },
            // reload mqtt-vue-hook
            watch: {
                usePolling: true, // For Docker.
                ignored: ['!**/node_modules/mqtt-vue-hook/**'],
            },
            // reload mqtt-vue-hook
        },
        // reload mqtt-vue-hook
        optimizeDeps: {
            exclude: ['mqtt-vue-hook'],
        },
        // reload mqtt-vue-hook
        build: {
            outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
            sourcemap: ENV.VITE_BUILD_SOURCEMAP === TRUE,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: ENV.VITE_BUILD_DROP_CONSOLE === TRUE, // disable console in prod.env
                    drop_debugger: ENV.VITE_BUILD_DROP_DEBUGGER === TRUE, // disable debug in prod.env
                },
            },
            rollupOptions: {
                output: {
                    assetFileNames: ({ name }) => {
                        if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
                            return 'assets/images/[name]-[hash][extname]'
                        }

                        if (/\.css$/.test(name ?? '')) {
                            return 'assets/css/[name]-[hash][extname]'
                        }

                        // default value
                        // ref: https://rollupjs.org/guide/en/#outputassetfilenames
                        return 'assets/[name]-[hash][extname]'
                    },
                },
            },
        },
    })
}
