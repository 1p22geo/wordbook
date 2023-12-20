import type { Meta, StoryObj } from "@storybook/react";
import { ObjectId } from "mongodb";
import { Post } from ".";

const meta: Meta<typeof Post> = {
  title: "Post",
  component: Post,
  args: {
    post: {
      _id: new ObjectId("876587658765876587658765"),
      author: {
        email: "user@email.com",
        name: "Random user",
        hash: "x",
        added: 0,
        type: "user",
        _id: new ObjectId("876587658765876587658765"),
      },
      posted: Date.now() - 3600,
      content: "Good morning everyone",
      up: 0,
      down: 4,
      comments: [],
    },
  },
};

type Story = StoryObj<typeof Post>;

export const Default: Story = {
  render: (args) => <Post {...args} />,
};

export default meta;
