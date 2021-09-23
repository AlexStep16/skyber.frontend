import { mount } from '@vue/test-utils'
import Component from '@/components/DeleteModal.vue'

describe('Component', () => {
  test('Удаление модальное окно', () => {
    const wrapper = mount(Component, {
      propsData: {
        message: 'qdw'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
