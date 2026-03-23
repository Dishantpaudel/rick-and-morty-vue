import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import App from './App.vue'

describe('App.vue', () => {
    it('renders the Rick and Morty title', () => {
        const wrapper = mount(App)
            // Checks if the text exists in the rendered HTML
        expect(wrapper.text()).toContain('Rick and Morty Wiki (Vue Edition)')
    })
})