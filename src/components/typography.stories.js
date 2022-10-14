import BaseHeading from './base-heading.vue';
import BaseText from './base-text.vue';

export default {
  title: 'Example/Typography',
  argTypes: {},
};

const Template = () => ({
  components: { BaseHeading, BaseText },
  template: `
  <div>
    <base-heading :level="1">Heading 1</base-heading>
    <base-heading :level="2">Heading 2</base-heading>
    <base-heading :level="3">Heading 3</base-heading>
    <base-heading :level="4">Heading 4</base-heading>
    <base-heading :level="5">Heading 5</base-heading>
    <base-heading :level="6">Heading 6</base-heading>
    <div><base-text>Text Main</base-text></div>
    <div><base-text weight="bold">Text Main Bold</base-text></div>
    <div><base-text>UI Main</base-text></div>
    <div><base-text weight="medium">UI Main Medium</base-text></div>
    <div><base-text weight="bold">UI Main Bold</base-text></div>
    <div><base-text>UI Secondary</base-text></div>


    <hr />
    <base-text tag="div">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </base-text>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};