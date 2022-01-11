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
    <base-dropdown menu-size="m">
      <template #default="{ toggle }">
        <button @click="toggle">Lonely</button>
      </template>
      <template #menu>
        Menu
      </template>
    </base-dropdown>
    <hr />
    <base-dropdown menu-size="m">
      <template #default="{ toggle }">
        <button @click="toggle">Nested</button>
      </template>
      <template #menu>
        <base-dropdown menu-size="m">
          <template #default="{ toggle }">
            <button @click="toggle">Lonely</button>
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