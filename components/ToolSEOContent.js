export default function ToolSEOContent({ tool }) {
  return (
    <div style={{ marginTop: "40px", lineHeight: "1.7" }}>
      
      <h2>What is {tool.name}?</h2>
      <p>
        {tool.name} is a free online tool that helps you {tool.description.toLowerCase()}.
        It is useful for writers, bloggers, students, and SEO experts.
      </p>

      <h2>How to use {tool.name}?</h2>
      <p>
        Simply paste your text into the input box above, and the tool will instantly calculate results.
      </p>

      <h2>Why use our {tool.name}?</h2>
      <ul>
        <li>Fast and real-time results</li>
        <li>Free and unlimited usage</li>
        <li>No login required</li>
        <li>SEO optimized output</li>
      </ul>

    </div>
  );
}
