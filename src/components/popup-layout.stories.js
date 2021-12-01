import PopupLayout from './popup-layout.vue';
import BaseButton from './button.vue';

export default {
  title: 'Example/PopupLayout',
  component: PopupLayout,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 's'],
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { PopupLayout, BaseButton },
  props: Object.keys(argTypes),
  data() {
    return args;
  },
  template: `
  <popup-layout v-bind="$attrs" v-bind="$data" v-on="$listeners">
    Основной контент
    <template #side>Боковушечка</template>
    <template #footer>
      <base-button theme="accent" size="s">Сохранить</base-button>
      <base-button theme="default" size="s" prominence="weak">Отмена</base-button>
    </template>
  </popup-layout>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок'
};