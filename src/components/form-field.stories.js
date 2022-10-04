import FormField from './form-field.vue';
import FormDivider from './form-divider.vue';
import BaseInput from './base-input.vue';
import BaseSelect from './base-select.vue';

export default {
  title: 'Example/FormField',
  component: FormField,
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { FormDivider, FormField, BaseInput, BaseSelect },
  props: Object.keys(argTypes),
  data() {
    return args;
  },
  template: `
  <div>
  <form-field v-bind="$data" v-on="$listeners">
    <template #default="{ id }">
      <base-input :id="id" />
    </template>
  </form-field>
  <form-divider />
  <form-field v-bind="$data" v-on="$listeners">
    <template #default="{ id }">
      <base-select :id="id">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </base-select>
    </template>
  </form-field>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  description: '',
  hint: ''
};