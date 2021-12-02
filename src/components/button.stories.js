import BaseButton from './button.vue';

export default {
  title: 'Example/Button',
  component: BaseButton,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l'],
    },
    theme: {
      control: { type: 'select' },
      options: [
        'default',
        'accent',
        'success',
        'error'
      ],
    },
    prominence: {
      control: { type: 'select' },
      options: [
        'primary',
        'weak'
      ],
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
  <base-button v-bind="$attrs" v-bind="$data" v-on="$listeners">{{ label }}</base-button>
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  size: 's',
  theme: 'default',
  prominence: 'primary',
  disabled: false
};