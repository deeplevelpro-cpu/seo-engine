export function generateContent(keyword) {
  return {
    title: keyword,
    description: `Best tool for ${keyword}`,
    content: `This is a powerful SEO tool for ${keyword}. It helps improve rankings and traffic.`
  };
}

export function generateBlogContent(keyword) {
  return {
    title: keyword,
    content: `This is a detailed blog about ${keyword}. Learn SEO strategies and tips.`
  };
}
