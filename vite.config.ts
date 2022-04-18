import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'
import importToCDN from 'vite-plugin-cdn-import'// import by CDN (only import needed)
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
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
        plugins: [
            vue(),
            WindiCSS(),
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
                            // alias
                            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
                        ],
                        axios: [
                            // default imports
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
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver({})],
            }),
            importToCDN({
                modules: [
                    {
                        path: 'https://unpkg.com/element-plus',
                        css: 'https://unpkg.com/element-plus/dist/index.css',
                        name: 'element-plus',
                        var: 'ElementPlus',
                    },
                ],
            }),
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [resolve(process.cwd(), 'src/assets/icon')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',
            }),
        ],
        resolve: {
            alias: {
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
        },
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
        },
        css: {
            // preload scss
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "src/assets/scss/element/index.scss" as *;',
                },
            },
        },
    })
}
