import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1/current.json'

export function useWeatherApi() {
    const currentWeather = ref<any>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const getCurrentWeather = async (city: string) => {
        if (!API_KEY) {
            console.error("❌ WeatherAPI API key is missing")
            error.value = "API Key is missing"
            return
        }

        loading.value = true
        error.value = null

        try {
            const res = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no&lang=fa`)
            if (!res.ok) throw new Error("Failed to fetch weather")
            currentWeather.value = await res.json()
        } catch (err: any) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    return { currentWeather, loading, error, getCurrentWeather }
}
