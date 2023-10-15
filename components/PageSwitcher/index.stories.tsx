import type { Meta, StoryObj } from "@storybook/react";
import { PageSwitcher } from ".";

const meta: Meta<typeof PageSwitcher> = {
  title: "PageSwitcher",
  component: PageSwitcher,
  args: {
    maxPages: 3,
    page: 0,
    setPage: (page) => {
      console.log("Setting page " + page);
    },
  },
  argTypes: {
    maxPages: {
      control: { type: "number" },
    },
    page: {
      control: { type: "number" },
    },
  },
};

type Story = StoryObj<typeof PageSwitcher>;

export const Default: Story = {
  render: (args) => <PageSwitcher {...args} />,
};

export default meta;
