import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import SearchBox from './SearchBox.vue'

// یک ref برای mock کردن مقدار debounced ایجاد می‌کنیم.
const mockDebouncedQuery = ref('')

// useDebounce رو به شکلی ساده mock می‌کنیم که همیشه mockDebouncedQuery رو برگردونه.
// این کار باعث می‌شه تست ما پایدارتر و قابل پیش‌بینی‌تر باشه.
vi.mock('@vueuse/core', () => ({
    useDebounce: vi.fn(() => mockDebouncedQuery)
}))

describe('SearchBox.vue', () => {
    // قبل از هر تست، مقدار mockDebouncedQuery را به حالت اولیه برمی‌گردانیم.
    beforeEach(() => {
        mockDebouncedQuery.value = ''
    })

    // Stub کامپوننت aInputSearch رو به شکلی هوشمندتر بازنویسی می‌کنیم.
    // این Stub هم شامل input و هم شامل button هست تا تست find('button') شکست نخوره.
    const globalStubs = {
        aInputSearch: {
            template: `
        <div>
          <input
            type="text"
            @input="$emit('update:value', $event.target.value)"
          />
          <button @click="$emit('search', value)">Search</button>
        </div>
      `,
            props: ['value'], // پراپ value رو می‌پذیره
            // اگر Ant Design Vue از یک prop به نام 'size' استفاده می‌کنه، می‌تونیم اینجا اونو تعریف کنیم تا هشدار Vue رو از بین ببریم.
            // البته برای این تست خاص، حتی بدون تعریفش هم کار می‌کنه چون props واقعی استفاده نمی‌شوند.
            props: ['placeholder', 'size', 'value'],
            setup(props, { emit }) {
                const onSearch = () => {
                    emit('search', props.value)
                }
                return { onSearch }
            }
        }
    }

    it('renders correctly', () => {
        const wrapper = mount(SearchBox, {
            global: {
                stubs: globalStubs
            }
        })
        // حالا مطمئنیم که input در خروجی هست
        expect(wrapper.find('input').exists()).toBe(true)
        // و همچنین دکمه
        expect(wrapper.find('button').exists()).toBe(true)
    })

    it('emits a search event on button click', async () => {
        const wrapper = mount(SearchBox, {
            global: {
                stubs: globalStubs
            }
        })
        const input = wrapper.find('input')
        await input.setValue('test')
        // حالا میتونیم با خیال راحت دکمه رو پیدا کنیم و روی اون کلیک کنیم
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('search')).toHaveLength(1)
        expect(wrapper.emitted('search')[0][0]).toBe('test')
    })

    // این تست به صورت دقیق‌تری عملکرد debounced را بررسی می‌کند.
    it('emits a search event when the debounced value changes', async () => {
        const wrapper = mount(SearchBox, {
            global: {
                stubs: globalStubs
            }
        })

        // مقدار debounced mock را به صورت دستی تغییر می‌دهیم.
        mockDebouncedQuery.value = 'tor'
        // منتظر می‌مانیم تا DOM به‌روزرسانی شود.
        await wrapper.vm.$nextTick()

        // بررسی می‌کنیم که رویداد search با مقدار 'tor' یک بار emit شده است.
        expect(wrapper.emitted('search')).toHaveLength(1)
        expect(wrapper.emitted('search')[0][0]).toBe('tor')

        // دوباره مقدار debounced mock را تغییر می‌دهیم.
        mockDebouncedQuery.value = 'toronto'
        await wrapper.vm.$nextTick()

        // انتظار داریم رویداد search مجدداً emit شده باشد و طول آرایه 2 باشد.
        expect(wrapper.emitted('search')).toHaveLength(2)
        expect(wrapper.emitted('search')[1][0]).toBe('toronto')
    })
})
