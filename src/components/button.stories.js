import BaseButton from './button.vue';

export default {
  title: 'Example/Button',
  component: BaseButton,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: '<base-button v-bind="$attrs" v-on="$listeners">Button</base-button>',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
};