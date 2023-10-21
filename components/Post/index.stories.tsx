import type { Meta, StoryObj } from "@storybook/react";
import { ObjectId } from "mongodb";
import { Post } from ".";

const meta: Meta<typeof Post> = {
  title: "Post",
  component: Post,
  args: {
    post: {
      _id: "65338b0d72441ab593bb47b4" as unknown as ObjectId,
      author: {
        _id: "653389acbaa0561a75bc4413" as unknown as ObjectId,
        email: "1p22geo@gmail.com",
        name: "Bartosz Geodecki",
        hash: "489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35",
        added: 1697876396926,
        type: "user",
      },
      posted: 1697876546354,
      content: `# Hello everyone!

## This post is made in Markdown.

Inline equation: $\\pi$
yes. 

**asdf**

_asdgsdg_`,
    },
  },
};

type Story = StoryObj<typeof Post>;

export const Default: Story = {
  render: (args) => (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
        integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
        crossOrigin="anonymous"
      />
      <Post {...args} />,
    </>
  ),
};

export default meta;
