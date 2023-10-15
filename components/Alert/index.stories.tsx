import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from ".";

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
  args: {
    type: "error",
    children: "There has been an error",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["error", "info", "warning", "success", "loading"],
    },
  },
};

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => <Alert {...args} />,
};

export default meta;
