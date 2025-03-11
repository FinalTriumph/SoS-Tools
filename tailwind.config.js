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
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                custom: {
                    'td-grey': '#E0FFFF',
                    'td-green': '#AFE1AF',
                    'td-blue': '#ADDFFF',
                    'td-purple': '#DDA0DD',
                    'td-gold': '#FBDB98',
                    'td-red' : '#FF8787',
                    'td-red-d': '#F08080',
                    'tr-1': '#FFF0F0',
                    'tr-2' : '#F5F5DC',
                    'tr-1-b': '#F2727A',
                    'tr-2-b' : '#D2B48C',
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
        'bg-custom-tr-1',
        'bg-custom-tr-2',
        'border-custom-tr-1-b',
        'border-custom-tr-2-b',
    ],
};
