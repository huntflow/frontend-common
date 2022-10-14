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
  <div>
  <base-button v-bind="$data" v-on="$listeners">{{ label }}</base-button>
  <base-button v-bind="$data" v-on="$listeners" kind="ghost">{{ label }}</base-button>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  loading: false,
  disabled: false
};