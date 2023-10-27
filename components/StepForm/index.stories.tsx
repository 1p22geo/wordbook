import { Meta, StoryObj } from "@storybook/react";
import { StepForm } from ".";
const meta: Meta<typeof StepForm> = {
  title: "Step login form",
  component: StepForm,
  args: {
    pages: ["page 1", "page 2"],
    page: 0,
    setpage: () => {
      return;
    },
    nextDisabled: false,
  },
};

type Story = StoryObj<typeof StepForm>;

export const Default: Story = {
  render: (args) => <StepForm {...args} />,
};

export default meta;
