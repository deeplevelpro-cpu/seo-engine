export function generateGuide(title: string) {
  return {
    intro: `This guide will help you to ${title.toLowerCase()} step by step.`,
    steps: [
      "Restart your device",
      "Check your internet connection",
      "Update the application",
      "Clear cache or temporary files",
      "Reinstall the software"
    ],
    conclusion: `By following these steps, you can easily resolve the issue: ${title}.`
  };
}
