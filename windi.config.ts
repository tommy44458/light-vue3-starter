import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

import filters from 'windicss/plugin/filters'
import forms from 'windicss/plugin/forms'
import aspectRatio from 'windicss/plugin/aspect-ratio'
import lineClamp from 'windicss/plugin/line-clamp'
import typography from 'windicss/plugin/typography'

export default defineConfig({
    darkMode: 'class', // or 'media'
    // e.g.
    // w:bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
    // w:text="sm white"
    attributify: {
        prefix: 'w:',
    },
    // Be aware, alias entries need to be prefixed with * when used, eg:
    // <div class="*hstack">
    alias: {
        hstack: 'flex items-center',
        vstack: 'flex flex-col',
    },
    shortcuts: {
    },
    theme: {
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
            colors: {
                blue: colors.sky,
                red: colors.rose,
                pink: colors.fuchsia,
            },
            spacing: {
                128: '32rem',
                144: '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [
        filters,
        forms,
        aspectRatio,
        lineClamp,
        typography({
            modifiers: ['DEFAULT', 'sm', 'lg', 'red'],
        }),
    ],
})
