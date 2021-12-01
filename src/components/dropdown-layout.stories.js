import DropdownLayout from './dropdown-layout.vue';
import BaseButton from './button.vue';

export default {
  title: 'Example/DropdownLayout',
  component: DropdownLayout,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { DropdownLayout, BaseButton },
  props: Object.keys(argTypes),
  data() {
    return args;
  },
  template: `
  <dropdown-layout v-bind="$attrs" v-bind="$data" v-on="$listeners">
    Содержимое дропдауна

    <template #footer>
      <base-button theme="accent" size="xs">Сохранить</base-button>
      <base-button theme="default" size="xs" prominence="weak">Отмена</base-button>
    </template>
  </dropdown-layout>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок',
  subtitle: 'Подзаголовок',
};
