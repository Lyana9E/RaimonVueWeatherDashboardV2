import {computed, reactive} from 'vue'
import {defineStore} from "pinia";
import {useLocalStorage} from '@vueuse/core'
import {useWeatherApi} from '../composables/useWeatherApi'


export const useWeatherStore = defineStore('weather', () => {

    const favorites = useLocalStorage<string[]>('favorites', [])
    const {getCurrentWeather, currentWeather, loading, error} = useWeatherApi()

    const favoriteCitiesData = reactive<Record<string, {
        data: any | null,
        loading: boolean,
        error: string | null
    }>>({})

    const addFavorite = (city: string) => {
        if (!favorites.value.includes(city)) {
            favorites.value.push(city)
        }
    }

    const removeFavorite = (city: string) => {
        favorites.value = favorites.value.filter(c => c !== city)
    }
    const fetchFavoriteCityWeather = async (city: string) => {
        favoriteCitiesData[city] = {data: null, loading: true, error: null}
        await getCurrentWeather(city);
        favoriteCitiesData[city] = {
            data:currentWeather.value,
            loading:loading.value,
            error:error.value
    }
    }
    
    const loadAllFavoriteCities = ()=>{
        favorites.value.forEach(city =>fetchFavoriteCityWeather(city))
    }

    const favoriteCount = computed(() => favorites.value.length)

    return {
        favorites,
        addFavorite,
        removeFavorite,
        favoriteCount,
        favoriteCitiesData,
        loadAllFavoriteCities

    }
})