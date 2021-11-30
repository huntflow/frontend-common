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

const Template = () => ({
  components: { BaseButton },
  data() {
    return {
      size: 's',
      theme: 'default',
      prominence: 'primary',
      disabled: false
    };
  },
  template: `
  <div>
  <select v-model="size">
    <option value="xs">xs</option>
    <option value="s">s</option>
    <option value="m">m</option>
  </select>
  <select v-model="theme">
    <option value="default">default</option>
    <option value="accent">accent</option>
    <option value="success">success</option>
    <option value="error">error</option>
  </select>
  <select v-model="prominence">
    <option value="primary">primary</option>
    <option value="weak">weak</option>
  </select>
  <label>
    <input type="checkbox" v-model="disabled" />
    Disabled
  </label>
  <hr />
  <base-button :size="size" :theme="theme" :prominence="prominence" :disabled="disabled" v-bind="$attrs" v-on="$listeners">Button</base-button>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
};