import FormField from './form-field.vue';
import BaseInput from './base-input.vue';

export default {
  title: 'Example/FormField',
  component: FormField,
  argTypes: {
    // size: {
    //   control: { type: 'select' },
    //   options: ['xs', 's', 'm', 'l'],
    // },
    // theme: {
    //   control: { type: 'select' },
    //   options: [
    //     'default',
    //     'accent',
    //     'success',
    //     'error'
    //   ],
    // },
    // prominence: {
    //   control: { type: 'select' },
    //   options: [
    //     'main',
    //     'weak',
    //     'thin'
    //   ],
    // },
    // disabled: {
    //   control: { type: 'boolean' }
    // },
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
};