import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SigninForm } from ".";

export default {
  title: "Forms/Signin",
  argTypes: {
    onSubmit: {
      description: "A callback called when the form has submitted",
    },
  },
} as Meta;

const Template: Story<{
  onSubmit?: () => void;
}> = args => <SigninForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: action("Form data submited"),
};
