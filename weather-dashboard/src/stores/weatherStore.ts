import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        favorites: useLocalStorage<string[]>('favorites', []),
    }),
    actions: {
        addFavorite(city: string) {
            if (!this.favorites.includes(city)) {
                this.favorites.push(city)
            }
        },
        removeFavorite(city: string) {
            this.favorites = this.favorites.filter(c => c !== city)
        },
    },
})
