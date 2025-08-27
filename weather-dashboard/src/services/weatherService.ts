const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function fetchWeather(city: string) {
    if (!API_KEY) {
        console.error("❌ API key is missing!")
        return null
    }

    const res = await fetch(
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fa`
    )

    if (!res.ok) {
        throw new Error("Failed to fetch weather")
    }
    console.log(import.meta.env.VITE_OPENWEATHER_API_KEY)

    return res.json()
}
