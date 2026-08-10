export async function generateBlog(topic) {
  return {
    title: topic,
    content: "AI generated content for " + topic,
  };
}
