import BaseDropdown from './base-dropdown.vue';

export default {
  title: 'Example/Dropdowns',
  component: BaseDropdown,
  argTypes: {
  },
};

const Template = (args, { argTypes }) => ({
  components: { BaseDropdown },
  props: Object.keys(argTypes),
  template: `
  <div>
    <base-dropdown size="m">
      <template #default="{ onToggle }">
        <button @click="onToggle">Lonely</button>
      </template>
      <template #menu>
        Menu
      </template>
    </base-dropdown>

    <base-dropdown size="m">
      <template #default="{ onToggle }">
        <button @click="onToggle">Nested</button>
      </template>
      <template #menu>
        <base-dropdown size="m">
          <template #default="{ onToggle }">
            <button @click="onToggle">Lonely</button>
          </template>
          <template #menu>
            Menu
          </template>
        </base-dropdown>
      </template>
    </base-dropdown>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
};