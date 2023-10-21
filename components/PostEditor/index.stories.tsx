import type { Meta, StoryObj } from "@storybook/react";
import { PostEditor } from ".";

const meta: Meta<typeof PostEditor> = {
  title: "PostEditor",
  component: PostEditor,
  args: {},
};

type Story = StoryObj<typeof PostEditor>;

export const Default: Story = {
  render: () => <PostEditor />,
};

export default meta;
