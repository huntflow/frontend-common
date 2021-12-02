import BaseInput from './base-input.vue';

export default {
  title: 'Example/Input',
  component: BaseInput,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l'],
    },
    invalid: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { BaseInput },
  props: Object.keys(argTypes),
  data() {
    return args;
  },
  template: `
  <base-input v-bind="$data" v-on="$listeners" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  size: 's',
  disabled: false,
  invalid: false,
  placeholder: 'Type something here'
};