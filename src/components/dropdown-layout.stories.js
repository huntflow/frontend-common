import DropdownLayout from './dropdown-layout.vue';
import BaseButton from './base-button.vue';
import FormFooter from './form-footer.vue';

export default {
  title: 'Example/DropdownLayout',
  component: DropdownLayout,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { DropdownLayout, BaseButton, FormFooter },
  props: Object.keys(argTypes),
  data() {
    return args;
  },
  template: `
  <dropdown-layout v-bind="$attrs" v-bind="$data" v-on="$listeners">
    Содержимое дропдауна

    <template #footer>
      <form-footer spacing="xs">
        <base-button theme="accent" size="xs">Сохранить</base-button>
        <base-button theme="default" size="xs" prominence="weak">Отмена</base-button>
        <template #right>
          Сноска
        </template>
      </form-footer>
    </template>
  </dropdown-layout>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок',
  subtitle: 'Подзаголовок',
};
