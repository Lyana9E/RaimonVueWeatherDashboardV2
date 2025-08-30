import {computed} from 'vue'
import {defineStore} from "pinia";
import {useLocalStorage} from '@vueuse/core'

export const useWeatherStore = defineStore('weather',()=>{

    const favorites = useLocalStorage<string[]>('favorites',[])


    const addFavorite =(city:string)=>{
        if(!favorites.value.includes(city)){
            favorites.value.push(city)

        }

    }

    const removeFavorite = (city:string)=>{
        favorites.value = favorites.value.filter(c=>c!==city)

    }

    const favoriteCount = computed(() => favorites.value.length)

    return{
        favorites,
        addFavorite,
        removeFavorite,
        favoriteCount

    }
})