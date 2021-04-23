import { Meta, Story } from "@storybook/react";
import { ReactNode } from "react";
import { TextLink } from "@components/TextLink";
import { Dropdown } from ".";

export default {
  title: "UI Elements/Dropdown",
  component: Dropdown,
} as Meta;

const Template: Story<{
  dropdownContent: ReactNode | ReactNode[];
  children: ReactNode;
}> = ({ dropdownContent, children }) => (
  <Dropdown dropdownContent={dropdownContent}>{children}</Dropdown>
);

export const Default = Template.bind({});
Default.args = {
  dropdownContent: (
    <div className='px-4 py-3'>
      <h1>Hi. I am the content.</h1>
    </div>
  ),
  children: <TextLink>Click me</TextLink>,
};
