import BaseButton from './base-button.vue';

export default {
  title: 'Example/Button',
  component: BaseButton,
  argTypes: {
    loading: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { BaseButton },
  props: Object.keys(argTypes),
  data() {
    return args;
  },
  template: `
  <base-button v-bind="$data" v-on="$listeners">{{ label }}</base-button>
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  loading: false,
  disabled: false
};