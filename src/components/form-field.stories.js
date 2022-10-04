import FormField from './form-field.vue';
import BaseInput from './base-input.vue';

export default {
  title: 'Example/FormField',
  component: FormField,
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { FormField, BaseInput },
  props: Object.keys(argTypes),
  data() {
    return args;
  },
  template: `
  <form-field v-bind="$data" v-on="$listeners">
    <template #default="{ id }">
      <base-input :id="id" />
    </template>
  </form-field>
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  description: '',
  hint: ''
};