/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                glass: "rgba(255, 255, 255, 0.1)",
                glassBorder: "rgba(255, 255, 255, 0.2)",
                luxuryDark: "#0f172a", // Slate 900
                luxuryAccent: "#8b5cf6", // Violet 500
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
