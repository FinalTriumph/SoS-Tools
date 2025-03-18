import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            colors: {
                custom: {
                    'td-grey': '#E0FFFF',
                    'td-green': '#AFE1AF',
                    'td-blue': '#ADDFFF',
                    'td-purple': '#DDA0DD',
                    'td-gold': '#FBDB98',
                    'td-red' : '#FF8787',
                    'td-red-d': '#F08080',
                }
            },
        },
    },

    plugins: [forms],
    safelist: [
        'bg-custom-td-grey',
        'bg-custom-td-green',
        'bg-custom-td-blue',
        'bg-custom-td-purple',
        'bg-custom-td-gold',
        'bg-custom-td-red',
        'bg-custom-td-red-d',
        {
            pattern: /(bg|border)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{3}/,
        },
    ],
};
