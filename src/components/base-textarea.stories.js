import BaseTextarea from './base-textarea.vue';

export default {
  title: 'Example/Textarea',
  component: BaseTextarea,
  argTypes: {
    invalid: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { BaseTextarea },
  props: Object.keys(argTypes),
  data() {
    return args;
  },
  template: `
  <base-textarea v-bind="$data" v-on="$listeners" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  invalid: false,
  placeholder: 'Type something here'
};