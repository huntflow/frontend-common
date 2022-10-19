import PopupLayout from './popup-layout.vue';
import FormField from './form-field.vue';
import FormFooter from './form-footer.vue';
import FormDivider from './form-divider.vue';
import BaseInput from './base-input.vue';
import BaseButton from './base-button.vue';
import BaseSelect from './base-select.vue';

export default {
  title: 'Example/PopupLayout',
  component: PopupLayout,
};

const Template = (args, { argTypes }) => ({
  components: { FormField, FormFooter, PopupLayout, BaseInput, BaseSelect, BaseButton, FormDivider },
  props: Object.keys(argTypes),
  data() {
    return {
      value: null
    };
  },
  template: `
  <div style="padding: 100px; background-color: #efefef">
  <popup-layout title="Заголовок" subtitle="Подзаголовок">
    <form-field label="Поле">
      <template #default="{ id }">
        <base-input :id="id" />
      </template>
    </form-field>
    <form-field label="Поле">
      <template #default="{ id }">
        <base-input :id="id" />
      </template>
    </form-field>
    <form-divider />
    <form-field label="Поле">
      <template #default="{ id }">
        <base-input :id="id" />
      </template>
    </form-field>

    <template #footer>
      <base-button>Отправить</base-button>
      <base-button kind="ghost">Отмена</base-button>
    </template>
  </popup-layout>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
};