import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Forecast from '../components/forecast.vue'

// Describe: گروه تست برای کامپوننت Forecast
describe('forecast.vue', () => {

    // Mock Data (داده‌های ساختگی)
    // برای تست یک کامپوننت که داده‌های زیادی رو نمایش میده، بهترین کار اینه که
    // یک نمونه داده‌ی ساختگی ایجاد کنیم تا مطمئن باشیم کامپوننت با داده‌های واقعی به درستی کار می‌کنه.
    const mockForecastData = [
        {
            date: '2024-07-25',
            day: {
                maxtemp_c: 30,
                mintemp_c: 20,
                avgtemp_c: 25,
                avghumidity: 70,
                maxwind_kph: 15,
                daily_chance_of_rain: 10,
                condition: {
                    text: 'Sunny',
                    icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
                }
            }
        },
        {
            date: '2024-07-26',
            day: {
                maxtemp_c: 28,
                mintemp_c: 18,
                avgtemp_c: 23,
                avghumidity: 75,
                maxwind_kph: 12,
                daily_chance_of_rain: 40,
                condition: {
                    text: 'Partly cloudy',
                    icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
                }
            }
        },
        {
            date: '2024-07-27',
            day: {
                maxtemp_c: 26,
                mintemp_c: 16,
                avgtemp_c: 21,
                avghumidity: 80,
                maxwind_kph: 10,
                daily_chance_of_rain: 80,
                condition: {
                    text: 'Rainy',
                    icon: 'https://cdn.weatherapi.com/weather/64x64/day/308.png'
                }
            }
        }
    ]

    // تست اول: آیا کامپوننت با داده‌های معتبر به درستی رندر می‌شود؟
    it('renders correctly with valid forecast data', () => {
        // کامپوننت را با داده‌های ساختگی mount می‌کنیم.
        const wrapper = mount(Forecast, {
            props: {
                forecast: mockForecastData
            }
        })

        // مطمئن می‌شیم عنوان اصلی وجود داره.
        expect(wrapper.text()).toContain('3-Day Weather Forecast')

        // مطمئن می‌شیم سه روز پیش‌بینی نمایش داده میشه.
        const forecastItems = wrapper.findAll('.grid.grid-cols-1 > div')
        expect(forecastItems.length).toBe(3)

        // مطمئن می‌شیم محتوای روز اول به درستی نمایش داده میشه.
        expect(forecastItems[0].text()).toContain('Max: 30°C')
        expect(forecastItems[0].text()).toContain('Min: 20°C')
        expect(forecastItems[0].text()).toContain('Humidity: 70%')

        // مطمئن می‌شیم تابع formatDate به درستی کار می‌کنه و تاریخ‌ها فرمت شدن.
        expect(wrapper.text()).toContain('Jul 25')
    })

    // تست دوم: آیا کامپوننت وقتی داده‌ها null هستند، رندر نمی‌شود؟
    it('does not render when forecast prop is null', () => {
        // کامپوننت را با prop برابر با null mount می‌کنیم.
        const wrapper = mount(Forecast, {
            props: {
                forecast: null
            }
        })

        // انتظار داریم که هیچ محتوایی وجود نداشته باشه.
        expect(wrapper.find('h2').exists()).toBe(false)
        expect(wrapper.find('.mt-6').exists()).toBe(false)
    })

    // تست سوم: آیا کامپوننت وقتی داده‌ها یک آرایه خالی هستند، رندر نمی‌شود؟
    it('does not render when forecast prop is an empty array', () => {
        // کامپوننت را با prop برابر با یک آرایه خالی mount می‌کنیم.
        const wrapper = mount(Forecast, {
            props: {
                forecast: []
            }
        })

        // انتظار داریم که هیچ محتوایی وجود نداشته باشه.
        expect(wrapper.find('h2').exists()).toBe(false)
        expect(wrapper.find('.mt-6').exists()).toBe(false)
    })
})
