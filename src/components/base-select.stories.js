import BaseSelect from './base-select.vue';

export default {
  title: 'Example/Select',
  component: BaseSelect,
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
  components: { BaseSelect },
  props: Object.keys(argTypes),
  data() {
    return args;
  },
  template: `
  <base-select v-bind="$data" v-on="$listeners">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </base-select>
  `,
});

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  invalid: false,
  placeholder: 'Type something here'
};