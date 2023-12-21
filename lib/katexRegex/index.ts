export function katexRegex(content: string) {
  return content.replace(/```KaTeX(([^\n\r]|\n|\r)*?)```/gs, "$$$ $1$$$");
}
