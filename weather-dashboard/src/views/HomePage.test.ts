import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from '../views/HomePage.vue'

// توابع mock را در اینجا تعریف می‌کنیم تا در همه تست‌ها قابل دسترسی باشند
const mockGetCurrentWeather = vi.fn()
const mockAddFavorite = vi.fn()
const mockRemoveFavorite = vi.fn()

// ماژول‌های useWeatherApi و useWeatherStore را mock می‌کنیم
// و توابع mock شده را به جای توابع اصلی قرار می‌دهیم.
vi.mock('../composables/useWeatherApi', () => ({
    useWeatherApi: () => ({
        currentWeather: null,
        loading: false,
        error: null,
        getCurrentWeather: mockGetCurrentWeather,
    }),
}))

vi.mock('../stores/weatherStore', () => ({
    useWeatherStore: () => ({
        favorites: [],
        addFavorite: mockAddFavorite,
        removeFavorite: mockRemoveFavorite,
    }),
}))

describe('HomePage.vue', () => {
    // این تست مطمئن می‌شود که کامپوننت‌های اصلی به درستی در صفحه وجود دارند.
    // هشدارهای مربوط به کامپوننت‌های Ant Design Vue طبیعی هستند و باعث fail شدن تست‌ها نمی‌شوند.
    it('باید کامپوننت‌های اصلی را به درستی رندر کند', () => {
        // `mount` کامپوننت HomePage را در یک محیط مجازی رندر می‌کند
        const wrapper = mount(HomePage)

        // بررسی می‌کنیم که کامپوننت‌های AppHeader, SearchBox و WeatherCard وجود دارند
        expect(wrapper.findComponent({ name: 'AppHeader' }).exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'SearchBox' }).exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'WeatherCard' }).exists()).toBe(true)
    })

    // این تست رفتار تابع `handleSearch` را هنگام جستجوی شهر بررسی می‌کند.
    it('باید `handleSearch` را هنگام جستجو فراخوانی کند', async () => {
        const cityName = 'Toronto'
        const wrapper = mount(HomePage)

        // پیدا کردن SearchBox و شبیه‌سازی رویداد 'search'
        const searchBox = wrapper.findComponent({ name: 'SearchBox' })
        await searchBox.vm.$emit('search', cityName)

        // بررسی می‌کنیم که تابع `getCurrentWeather` با نام شهر صحیح فراخوانی شده است
        expect(mockGetCurrentWeather).toHaveBeenCalledWith(cityName)
    })

    // این تست رفتار تابع `toggleFavorite` را هنگام کلیک روی دکمه مورد علاقه بررسی می‌کند.
    it('باید `toggleFavorite` را هنگام کلیک روی دکمه مورد علاقه فراخوانی کند', async () => {
        const cityName = 'London'
        const wrapper = mount(HomePage)

        // یک رویداد mock برای دکمه 'toggle-favorite' ایجاد می‌کنیم
        const weatherCard = wrapper.findComponent({ name: 'WeatherCard' })
        await weatherCard.vm.$emit('toggle-favorite', cityName)

        // بررسی می‌کنیم که تابع `addFavorite` با نام شهر صحیح فراخوانی شده است
        expect(mockAddFavorite).toHaveBeenCalledWith(cityName)
    })
})
