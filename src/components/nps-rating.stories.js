import NpsRating from './nps-rating.vue';
import FormDivider from './form-divider.vue';
import BaseInput from './base-input.vue';
import BaseSelect from './base-select.vue';

export default {
  title: 'Example/NpsRating',
  component: NpsRating,
};

const Template = (args, { argTypes }) => ({
  components: { FormDivider, NpsRating, BaseInput, BaseSelect },
  props: Object.keys(argTypes),
  data() {
    return {
      value: null
    };
  },
  template: `
  <div>
  <nps-rating v-model="value" bottom-label="Точно нет" top-label="Точно да" />
  Value: {{ value === null ? 'null' : value }}
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
};