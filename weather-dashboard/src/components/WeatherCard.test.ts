import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherCard from "./WeatherCard.vue";

// Describe: گروه تست برای کامپوننت WeatherCard
describe('WeatherCard.vue', () => {

    // ما باید کامپوننت‌های Ant Design Vue رو برای تست mock کنیم.
    // این کار به Vue Test Utils اجازه میده اون‌ها رو شناسایی کنه.
    const globalComponents = {
        // aCard: یک کامپوننت ساختگی که محتوای داخلی خودش رو نمایش میده.
        aCard: {
            template: '<div><slot name="title" /><slot /></div>'
        },
        // aButton: یک دکمه ساختگی.
        aButton: {
            template: '<button><slot /></button>'
        },
        // aSkeleton: کامپوننت ساختگی برای تست حالت لودینگ.
        aSkeleton: {
            template: '<div data-testid="skeleton-mock"></div>'
        },
        // aAlert: کامپوننت ساختگی برای تست حالت خطا.
        aAlert: {
            // حالا mock ما props رو دریافت می‌کنه و نمایش میده.
            props: ['message', 'description'],
            template: '<div data-testid="alert-mock">{{ message }}<br />{{ description }}</div>'
        }
    }

    // تست اول: آیا عنوان به درستی نمایش داده میشه؟
    it('renders the title correctly', () => {
        const wrapper = mount(WeatherCard, {
            props: { title: 'Current Weather' },
            global: { components: globalComponents }
        })
        expect(wrapper.text()).toContain('Current Weather')
    })

    // تست دوم: آیا اطلاعات آب و هوا در حالت عادی نمایش داده میشه؟
    it('displays weather information when data is loaded', () => {
        const wrapper = mount(WeatherCard, {
            props: {
                city: 'Tehran',
                country: 'Iran',
                temp: 25,
                description: 'Cloudy',
                humidity: 60,
                windSpeed: 10,
                isFavorite: false
            },
            global: { components: globalComponents }
        })

        expect(wrapper.text()).toContain('Tehran')
        expect(wrapper.text()).toContain('Iran')
        expect(wrapper.text()).toContain('25°')
        expect(wrapper.text()).toContain('Cloudy')
        expect(wrapper.text()).toContain('60%')
        expect(wrapper.text()).toContain('10 km/h')
    })

    // تست سوم: آیا وقتی در حالت لودینگ هستیم، اسکلتون نمایش داده میشه و بقیه محتوا پنهانه؟
    it('shows skeleton when loading is true and hides other content', () => {
        const wrapper = mount(WeatherCard, {
            props: { loading: true },
            global: { components: globalComponents }
        })

        // با استفاده از data-testid مطمئن می‌شیم که کامپوننت mock ما رندر شده.
        expect(wrapper.find('[data-testid="skeleton-mock"]').exists()).toBe(true)

        // مطمئن می‌شیم که محتوای اصلی نمایش داده نمیشه.
        expect(wrapper.text()).not.toContain('Tehran')
        expect(wrapper.text()).not.toContain('ابتدا نام یک شهر را جستجو کنید')
    })

    // تست چهارم: آیا وقتی خطا رخ میده، پیام خطا نمایش داده میشه؟
    it('shows error alert when error prop is provided and hides other content', () => {
        const wrapper = mount(WeatherCard, {
            props: { error: 'Network Error' },
            global: { components: globalComponents }
        })

        // مطمئن می‌شیم که کامپوننت alert ما رندر شده.
        expect(wrapper.find('[data-testid="alert-mock"]').exists()).toBe(true)

        // همچنین مطمئن می‌شیم متن خطا در صفحه نمایش داده میشه.
        expect(wrapper.text()).toContain('خطا در واکشی اطلاعات')
        expect(wrapper.text()).toContain('Network Error')

        // مطمئن می‌شیم که محتوای اصلی نمایش داده نمیشه.
        expect(wrapper.text()).not.toContain('Tehran')
        expect(wrapper.text()).not.toContain('ابتدا نام یک شهر را جستجو کنید')
    })

    // تست پنجم: آیا دکمه favourite به درستی event رو emit می‌کنه؟
    it('emits a "toggle-favorite" event with the correct city', async () => {
        const wrapper = mount(WeatherCard, {
            props: { city: 'Tehran' },
            global: { components: globalComponents }
        })

        const favoriteButton = wrapper.find('button')
        await favoriteButton.trigger('click')

        expect(wrapper.emitted('toggle-favorite')).toBeTruthy()
        expect(wrapper.emitted('toggle-favorite')?.[0]?.[0]).toBe('Tehran')
    })

    // تست ششم: بررسی اینکه دکمه favourite با توجه به isFavorite prop به درستی متن رو نمایش میده.
    it('displays the correct favorite icon based on isFavorite prop', async () => {
        const wrapper = mount(WeatherCard, {
            props: { city: 'Tehran', isFavorite: false },
            global: { components: globalComponents }
        })

        expect(wrapper.find('button').text()).toContain('☆')

        await wrapper.setProps({ isFavorite: true })

        expect(wrapper.find('button').text()).toContain('★')
    })
})
