import BaseSelect from './base-select.vue';

export default {
  title: 'Example/Select',
  component: BaseSelect,
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
  components: { BaseSelect },
  props: Object.keys(argTypes),
  data() {
    return {
      ...args,
      items: [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
        { id: 4, name: 'Option 4' },
        { id: 11, name: 'Option 11' },
        { id: 21, name: 'Option 21' },
        { id: 31, name: 'Option 31' },
        { id: 41, name: 'Option 41' },
        { id: 12, name: 'Option 12' },
        { id: 22, name: 'Option 22' },
        { id: 32, name: 'Option 32' },
        { id: 42, name: 'Option 42' }
      ],
      value: null
    };
  },
  template: `
  <base-select v-bind="$data" v-on="$listeners" v-model="value" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  size: 's',
  disabled: false,
  invalid: false,
  placeholder: ''
};