import type { Meta, StoryObj } from "@storybook/react";
import { ObjectId } from "mongodb";
import { Header } from ".";

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
  args: {
    user: {
      _id: "653389acbaa0561a75bc4413" as unknown as ObjectId,
      email: "1p22geo@gmail.com",
      name: "Bartosz Geodecki",
      hash: "489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35",
      added: 1697876396926,
      type: "user",
    },
  },
};

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: (args) => <Header {...args} />,
};
export const Logged_out: Story = {
  render: () => <Header />,
};

export default meta;
