export type PlannedTool = {
  slug: string;
  name: string;
  category: string;
  description: string;
};

const realToolsPlan: PlannedTool[] = [

  // SEO

  {
    slug: "keyword-density-checker",
    name: "Keyword Density Checker",
    category: "SEO",
    description: "Use this free keyword density checker to improve your website SEO and content workflow.",
  },

  {
    slug: "keyword-frequency-checker",
    name: "Keyword Frequency Checker",
    category: "SEO",
    description: "Use this free keyword frequency checker to improve your website SEO and content workflow.",
  },

  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    category: "SEO",
    description: "Use this free meta tag generator to improve your website SEO and content workflow.",
  },

  {
    slug: "meta-description-generator",
    name: "Meta Description Generator",
    category: "SEO",
    description: "Use this free meta description generator to improve your website SEO and content workflow.",
  },

  {
    slug: "title-tag-generator",
    name: "Title Tag Generator",
    category: "SEO",
    description: "Use this free title tag generator to improve your website SEO and content workflow.",
  },

  {
    slug: "serp-snippet-preview",
    name: "SERP Snippet Preview",
    category: "SEO",
    description: "Use this free serp snippet preview to improve your website SEO and content workflow.",
  },

  {
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    category: "SEO",
    description: "Use this free robots.txt generator to improve your website SEO and content workflow.",
  },

  {
    slug: "sitemap-generator",
    name: "Sitemap Generator",
    category: "SEO",
    description: "Use this free sitemap generator to improve your website SEO and content workflow.",
  },

  {
    slug: "canonical-url-generator",
    name: "Canonical URL Generator",
    category: "SEO",
    description: "Use this free canonical url generator to improve your website SEO and content workflow.",
  },

  {
    slug: "open-graph-generator",
    name: "Open Graph Generator",
    category: "SEO",
    description: "Use this free open graph generator to improve your website SEO and content workflow.",
  },

  {
    slug: "twitter-card-generator",
    name: "Twitter Card Generator",
    category: "SEO",
    description: "Use this free twitter card generator to improve your website SEO and content workflow.",
  },

  {
    slug: "schema-markup-generator",
    name: "Schema Markup Generator",
    category: "SEO",
    description: "Use this free schema markup generator to improve your website SEO and content workflow.",
  },

  {
    slug: "faq-schema-generator",
    name: "FAQ Schema Generator",
    category: "SEO",
    description: "Use this free faq schema generator to improve your website SEO and content workflow.",
  },

  {
    slug: "article-schema-generator",
    name: "Article Schema Generator",
    category: "SEO",
    description: "Use this free article schema generator to improve your website SEO and content workflow.",
  },

  {
    slug: "breadcrumb-schema-generator",
    name: "Breadcrumb Schema Generator",
    category: "SEO",
    description: "Use this free breadcrumb schema generator to improve your website SEO and content workflow.",
  },

  {
    slug: "local-business-schema-generator",
    name: "Local Business Schema Generator",
    category: "SEO",
    description: "Use this free local business schema generator to improve your website SEO and content workflow.",
  },

  {
    slug: "organization-schema-generator",
    name: "Organization Schema Generator",
    category: "SEO",
    description: "Use this free organization schema generator to improve your website SEO and content workflow.",
  },

  {
    slug: "website-schema-generator",
    name: "Website Schema Generator",
    category: "SEO",
    description: "Use this free website schema generator to improve your website SEO and content workflow.",
  },

  {
    slug: "seo-slug-generator",
    name: "SEO Slug Generator",
    category: "SEO",
    description: "Use this free seo slug generator to improve your website SEO and content workflow.",
  },

  {
    slug: "seo-title-checker",
    name: "SEO Title Checker",
    category: "SEO",
    description: "Use this free seo title checker to improve your website SEO and content workflow.",
  },

  {
    slug: "meta-description-length-checker",
    name: "Meta Description Length Checker",
    category: "SEO",
    description: "Use this free meta description length checker to improve your website SEO and content workflow.",
  },

  {
    slug: "heading-structure-checker",
    name: "Heading Structure Checker",
    category: "SEO",
    description: "Use this free heading structure checker to improve your website SEO and content workflow.",
  },

  {
    slug: "internal-link-checker",
    name: "Internal Link Checker",
    category: "SEO",
    description: "Use this free internal link checker to improve your website SEO and content workflow.",
  },

  {
    slug: "keyword-placement-checker",
    name: "Keyword Placement Checker",
    category: "SEO",
    description: "Use this free keyword placement checker to improve your website SEO and content workflow.",
  },

  // Content

  {
    slug: "word-counter",
    name: "Word Counter",
    category: "Content",
    description: "Use this free word counter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "character-counter",
    name: "Character Counter",
    category: "Content",
    description: "Use this free character counter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "sentence-counter",
    name: "Sentence Counter",
    category: "Content",
    description: "Use this free sentence counter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "paragraph-counter",
    name: "Paragraph Counter",
    category: "Content",
    description: "Use this free paragraph counter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "reading-time-calculator",
    name: "Reading Time Calculator",
    category: "Content",
    description: "Use this free reading time calculator to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    category: "Content",
    description: "Use this free text case converter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "title-case-converter",
    name: "Title Case Converter",
    category: "Content",
    description: "Use this free title case converter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "uppercase-converter",
    name: "Uppercase Converter",
    category: "Content",
    description: "Use this free uppercase converter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "lowercase-converter",
    name: "Lowercase Converter",
    category: "Content",
    description: "Use this free lowercase converter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "sentence-case-converter",
    name: "Sentence Case Converter",
    category: "Content",
    description: "Use this free sentence case converter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "text-reverser",
    name: "Text Reverser",
    category: "Content",
    description: "Use this free text reverser to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "remove-extra-spaces",
    name: "Remove Extra Spaces",
    category: "Content",
    description: "Use this free remove extra spaces to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    category: "Content",
    description: "Use this free remove duplicate lines to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "remove-empty-lines",
    name: "Remove Empty Lines",
    category: "Content",
    description: "Use this free remove empty lines to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "line-counter",
    name: "Line Counter",
    category: "Content",
    description: "Use this free line counter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "word-frequency-counter",
    name: "Word Frequency Counter",
    category: "Content",
    description: "Use this free word frequency counter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "text-sorter",
    name: "Text Sorter",
    category: "Content",
    description: "Use this free text sorter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "alphabetical-sorter",
    name: "Alphabetical Sorter",
    category: "Content",
    description: "Use this free alphabetical sorter to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "find-and-replace-text",
    name: "Find and Replace Text",
    category: "Content",
    description: "Use this free find and replace text to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    category: "Content",
    description: "Use this free lorem ipsum generator to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "text-cleaner",
    name: "Text Cleaner",
    category: "Content",
    description: "Use this free text cleaner to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "whitespace-remover",
    name: "Whitespace Remover",
    category: "Content",
    description: "Use this free whitespace remover to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "duplicate-word-finder",
    name: "Duplicate Word Finder",
    category: "Content",
    description: "Use this free duplicate word finder to clean, analyze, transform, or improve your text.",
  },

  {
    slug: "palindrome-checker",
    name: "Palindrome Checker",
    category: "Content",
    description: "Use this free palindrome checker to clean, analyze, transform, or improve your text.",
  },

  // Developer

  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "Developer",
    description: "Use this free json formatter for fast browser-based development and data processing.",
  },

  {
    slug: "json-validator",
    name: "JSON Validator",
    category: "Developer",
    description: "Use this free json validator for fast browser-based development and data processing.",
  },

  {
    slug: "json-minifier",
    name: "JSON Minifier",
    category: "Developer",
    description: "Use this free json minifier for fast browser-based development and data processing.",
  },

  {
    slug: "json-beautifier",
    name: "JSON Beautifier",
    category: "Developer",
    description: "Use this free json beautifier for fast browser-based development and data processing.",
  },

  {
    slug: "base64-encoder",
    name: "Base64 Encoder",
    category: "Developer",
    description: "Use this free base64 encoder for fast browser-based development and data processing.",
  },

  {
    slug: "base64-decoder",
    name: "Base64 Decoder",
    category: "Developer",
    description: "Use this free base64 decoder for fast browser-based development and data processing.",
  },

  {
    slug: "url-encoder",
    name: "URL Encoder",
    category: "Developer",
    description: "Use this free url encoder for fast browser-based development and data processing.",
  },

  {
    slug: "url-decoder",
    name: "URL Decoder",
    category: "Developer",
    description: "Use this free url decoder for fast browser-based development and data processing.",
  },

  {
    slug: "html-encoder",
    name: "HTML Encoder",
    category: "Developer",
    description: "Use this free html encoder for fast browser-based development and data processing.",
  },

  {
    slug: "html-decoder",
    name: "HTML Decoder",
    category: "Developer",
    description: "Use this free html decoder for fast browser-based development and data processing.",
  },

  {
    slug: "xml-formatter",
    name: "XML Formatter",
    category: "Developer",
    description: "Use this free xml formatter for fast browser-based development and data processing.",
  },

  {
    slug: "xml-validator",
    name: "XML Validator",
    category: "Developer",
    description: "Use this free xml validator for fast browser-based development and data processing.",
  },

  {
    slug: "css-formatter",
    name: "CSS Formatter",
    category: "Developer",
    description: "Use this free css formatter for fast browser-based development and data processing.",
  },

  {
    slug: "javascript-formatter",
    name: "JavaScript Formatter",
    category: "Developer",
    description: "Use this free javascript formatter for fast browser-based development and data processing.",
  },

  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    category: "Developer",
    description: "Use this free sql formatter for fast browser-based development and data processing.",
  },

  {
    slug: "sql-minifier",
    name: "SQL Minifier",
    category: "Developer",
    description: "Use this free sql minifier for fast browser-based development and data processing.",
  },

  {
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "Developer",
    description: "Use this free uuid generator for fast browser-based development and data processing.",
  },

  {
    slug: "uuid-validator",
    name: "UUID Validator",
    category: "Developer",
    description: "Use this free uuid validator for fast browser-based development and data processing.",
  },

  {
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp Converter",
    category: "Developer",
    description: "Use this free unix timestamp converter for fast browser-based development and data processing.",
  },

  {
    slug: "timestamp-generator",
    name: "Timestamp Generator",
    category: "Developer",
    description: "Use this free timestamp generator for fast browser-based development and data processing.",
  },

  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "Developer",
    description: "Use this free regex tester for fast browser-based development and data processing.",
  },

  {
    slug: "regex-escape-tool",
    name: "Regex Escape Tool",
    category: "Developer",
    description: "Use this free regex escape tool for fast browser-based development and data processing.",
  },

  {
    slug: "html-entity-encoder",
    name: "HTML Entity Encoder",
    category: "Developer",
    description: "Use this free html entity encoder for fast browser-based development and data processing.",
  },

  {
    slug: "html-entity-decoder",
    name: "HTML Entity Decoder",
    category: "Developer",
    description: "Use this free html entity decoder for fast browser-based development and data processing.",
  },

  // Web

  {
    slug: "url-parser",
    name: "URL Parser",
    category: "Web",
    description: "Use this free url parser to work with URLs, web data, and common web formats.",
  },

  {
    slug: "url-cleaner",
    name: "URL Cleaner",
    category: "Web",
    description: "Use this free url cleaner to work with URLs, web data, and common web formats.",
  },

  {
    slug: "url-shortener-format-builder",
    name: "URL Shortener Format Builder",
    category: "Web",
    description: "Use this free url shortener format builder to work with URLs, web data, and common web formats.",
  },

  {
    slug: "query-string-parser",
    name: "Query String Parser",
    category: "Web",
    description: "Use this free query string parser to work with URLs, web data, and common web formats.",
  },

  {
    slug: "query-string-builder",
    name: "Query String Builder",
    category: "Web",
    description: "Use this free query string builder to work with URLs, web data, and common web formats.",
  },

  {
    slug: "utm-url-builder",
    name: "UTM URL Builder",
    category: "Web",
    description: "Use this free utm url builder to work with URLs, web data, and common web formats.",
  },

  {
    slug: "utm-parameter-generator",
    name: "UTM Parameter Generator",
    category: "Web",
    description: "Use this free utm parameter generator to work with URLs, web data, and common web formats.",
  },

  {
    slug: "http-status-code-lookup",
    name: "HTTP Status Code Lookup",
    category: "Web",
    description: "Use this free http status code lookup to work with URLs, web data, and common web formats.",
  },

  {
    slug: "mime-type-lookup",
    name: "MIME Type Lookup",
    category: "Web",
    description: "Use this free mime type lookup to work with URLs, web data, and common web formats.",
  },

  {
    slug: "user-agent-parser",
    name: "User Agent Parser",
    category: "Web",
    description: "Use this free user agent parser to work with URLs, web data, and common web formats.",
  },

  {
    slug: "domain-name-parser",
    name: "Domain Name Parser",
    category: "Web",
    description: "Use this free domain name parser to work with URLs, web data, and common web formats.",
  },

  {
    slug: "email-link-generator",
    name: "Email Link Generator",
    category: "Web",
    description: "Use this free email link generator to work with URLs, web data, and common web formats.",
  },

  {
    slug: "tel-link-generator",
    name: "Tel Link Generator",
    category: "Web",
    description: "Use this free tel link generator to work with URLs, web data, and common web formats.",
  },

  {
    slug: "anchor-link-generator",
    name: "Anchor Link Generator",
    category: "Web",
    description: "Use this free anchor link generator to work with URLs, web data, and common web formats.",
  },

  // Security

  {
    slug: "password-generator",
    name: "Password Generator",
    category: "Security",
    description: "Use this free password generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "password-strength-checker",
    name: "Password Strength Checker",
    category: "Security",
    description: "Use this free password strength checker for convenient browser-based security and utility tasks.",
  },

  {
    slug: "random-string-generator",
    name: "Random String Generator",
    category: "Security",
    description: "Use this free random string generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    category: "Security",
    description: "Use this free random number generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "Security",
    description: "Use this free hash generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "md5-hash-generator",
    name: "MD5 Hash Generator",
    category: "Security",
    description: "Use this free md5 hash generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "sha256-hash-generator",
    name: "SHA256 Hash Generator",
    category: "Security",
    description: "Use this free sha256 hash generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "sha512-hash-generator",
    name: "SHA512 Hash Generator",
    category: "Security",
    description: "Use this free sha512 hash generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "hmac-generator",
    name: "HMAC Generator",
    category: "Security",
    description: "Use this free hmac generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "uuid-security-generator",
    name: "UUID Security Generator",
    category: "Security",
    description: "Use this free uuid security generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "secret-key-generator",
    name: "Secret Key Generator",
    category: "Security",
    description: "Use this free secret key generator for convenient browser-based security and utility tasks.",
  },

  {
    slug: "pin-generator",
    name: "PIN Generator",
    category: "Security",
    description: "Use this free pin generator for convenient browser-based security and utility tasks.",
  },

  // Image

  {
    slug: "image-alt-text-generator",
    name: "Image Alt Text Generator",
    category: "Image",
    description: "Use this free image alt text generator for image, color, and visual content workflows.",
  },

  {
    slug: "image-filename-generator",
    name: "Image Filename Generator",
    category: "Image",
    description: "Use this free image filename generator for image, color, and visual content workflows.",
  },

  {
    slug: "image-dimensions-checker",
    name: "Image Dimensions Checker",
    category: "Image",
    description: "Use this free image dimensions checker for image, color, and visual content workflows.",
  },

  {
    slug: "color-picker",
    name: "Color Picker",
    category: "Image",
    description: "Use this free color picker for image, color, and visual content workflows.",
  },

  {
    slug: "hex-to-rgb-converter",
    name: "HEX to RGB Converter",
    category: "Image",
    description: "Use this free hex to rgb converter for image, color, and visual content workflows.",
  },

  {
    slug: "rgb-to-hex-converter",
    name: "RGB to HEX Converter",
    category: "Image",
    description: "Use this free rgb to hex converter for image, color, and visual content workflows.",
  },

  {
    slug: "hsl-color-converter",
    name: "HSL Color Converter",
    category: "Image",
    description: "Use this free hsl color converter for image, color, and visual content workflows.",
  },

  {
    slug: "color-contrast-checker",
    name: "Color Contrast Checker",
    category: "Image",
    description: "Use this free color contrast checker for image, color, and visual content workflows.",
  },

  {
    slug: "image-to-base64-converter",
    name: "Image to Base64 Converter",
    category: "Image",
    description: "Use this free image to base64 converter for image, color, and visual content workflows.",
  },

  {
    slug: "base64-to-image-converter",
    name: "Base64 to Image Converter",
    category: "Image",
    description: "Use this free base64 to image converter for image, color, and visual content workflows.",
  },

  {
    slug: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    category: "Image",
    description: "Use this free aspect ratio calculator for image, color, and visual content workflows.",
  },

  {
    slug: "image-url-generator",
    name: "Image URL Generator",
    category: "Image",
    description: "Use this free image url generator for image, color, and visual content workflows.",
  },

  // Marketing

  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    category: "Marketing",
    description: "Use this free hashtag generator to speed up your marketing and content workflow.",
  },

  {
    slug: "youtube-title-generator",
    name: "YouTube Title Generator",
    category: "Marketing",
    description: "Use this free youtube title generator to speed up your marketing and content workflow.",
  },

  {
    slug: "youtube-description-generator",
    name: "YouTube Description Generator",
    category: "Marketing",
    description: "Use this free youtube description generator to speed up your marketing and content workflow.",
  },

  {
    slug: "youtube-tag-generator",
    name: "YouTube Tag Generator",
    category: "Marketing",
    description: "Use this free youtube tag generator to speed up your marketing and content workflow.",
  },

  {
    slug: "instagram-caption-generator",
    name: "Instagram Caption Generator",
    category: "Marketing",
    description: "Use this free instagram caption generator to speed up your marketing and content workflow.",
  },

  {
    slug: "social-media-caption-generator",
    name: "Social Media Caption Generator",
    category: "Marketing",
    description: "Use this free social media caption generator to speed up your marketing and content workflow.",
  },

  {
    slug: "call-to-action-generator",
    name: "Call to Action Generator",
    category: "Marketing",
    description: "Use this free call to action generator to speed up your marketing and content workflow.",
  },

  {
    slug: "headline-generator",
    name: "Headline Generator",
    category: "Marketing",
    description: "Use this free headline generator to speed up your marketing and content workflow.",
  },

  {
    slug: "blog-title-generator",
    name: "Blog Title Generator",
    category: "Marketing",
    description: "Use this free blog title generator to speed up your marketing and content workflow.",
  },

  {
    slug: "content-brief-generator",
    name: "Content Brief Generator",
    category: "Marketing",
    description: "Use this free content brief generator to speed up your marketing and content workflow.",
  },

  {
    slug: "utm-campaign-builder",
    name: "UTM Campaign Builder",
    category: "Marketing",
    description: "Use this free utm campaign builder to speed up your marketing and content workflow.",
  },

  {
    slug: "marketing-url-builder",
    name: "Marketing URL Builder",
    category: "Marketing",
    description: "Use this free marketing url builder to speed up your marketing and content workflow.",
  },

  // Conversion

  {
    slug: "csv-to-json-converter",
    name: "CSV to JSON Converter",
    category: "Conversion",
    description: "Use this free csv to json converter to quickly convert and transform your data.",
  },

  {
    slug: "json-to-csv-converter",
    name: "JSON to CSV Converter",
    category: "Conversion",
    description: "Use this free json to csv converter to quickly convert and transform your data.",
  },

  {
    slug: "json-to-xml-converter",
    name: "JSON to XML Converter",
    category: "Conversion",
    description: "Use this free json to xml converter to quickly convert and transform your data.",
  },

  {
    slug: "xml-to-json-converter",
    name: "XML to JSON Converter",
    category: "Conversion",
    description: "Use this free xml to json converter to quickly convert and transform your data.",
  },

  {
    slug: "text-to-csv-converter",
    name: "Text to CSV Converter",
    category: "Conversion",
    description: "Use this free text to csv converter to quickly convert and transform your data.",
  },

  {
    slug: "csv-column-extractor",
    name: "CSV Column Extractor",
    category: "Conversion",
    description: "Use this free csv column extractor to quickly convert and transform your data.",
  },

  {
    slug: "number-to-words-converter",
    name: "Number to Words Converter",
    category: "Conversion",
    description: "Use this free number to words converter to quickly convert and transform your data.",
  },

  {
    slug: "words-to-number-converter",
    name: "Words to Number Converter",
    category: "Conversion",
    description: "Use this free words to number converter to quickly convert and transform your data.",
  },

  {
    slug: "binary-to-decimal-converter",
    name: "Binary to Decimal Converter",
    category: "Conversion",
    description: "Use this free binary to decimal converter to quickly convert and transform your data.",
  },

  {
    slug: "decimal-to-binary-converter",
    name: "Decimal to Binary Converter",
    category: "Conversion",
    description: "Use this free decimal to binary converter to quickly convert and transform your data.",
  },

  {
    slug: "hex-to-decimal-converter",
    name: "Hex to Decimal Converter",
    category: "Conversion",
    description: "Use this free hex to decimal converter to quickly convert and transform your data.",
  },

  {
    slug: "decimal-to-hex-converter",
    name: "Decimal to Hex Converter",
    category: "Conversion",
    description: "Use this free decimal to hex converter to quickly convert and transform your data.",
  },

  {
    slug: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    category: "Conversion",
    description: "Use this free roman numeral converter to quickly convert and transform your data.",
  },

  {
    slug: "roman-numeral-generator",
    name: "Roman Numeral Generator",
    category: "Conversion",
    description: "Use this free roman numeral generator to quickly convert and transform your data.",
  },

  // Calculators

  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Calculators",
    description: "Use this free percentage calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "percentage-increase-calculator",
    name: "Percentage Increase Calculator",
    category: "Calculators",
    description: "Use this free percentage increase calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "percentage-decrease-calculator",
    name: "Percentage Decrease Calculator",
    category: "Calculators",
    description: "Use this free percentage decrease calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "average-calculator",
    name: "Average Calculator",
    category: "Calculators",
    description: "Use this free average calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "ratio-calculator",
    name: "Ratio Calculator",
    category: "Calculators",
    description: "Use this free ratio calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "proportion-calculator",
    name: "Proportion Calculator",
    category: "Calculators",
    description: "Use this free proportion calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "age-calculator",
    name: "Age Calculator",
    category: "Calculators",
    description: "Use this free age calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    category: "Calculators",
    description: "Use this free date difference calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "time-difference-calculator",
    name: "Time Difference Calculator",
    category: "Calculators",
    description: "Use this free time difference calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "word-count-calculator",
    name: "Word Count Calculator",
    category: "Calculators",
    description: "Use this free word count calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "character-limit-calculator",
    name: "Character Limit Calculator",
    category: "Calculators",
    description: "Use this free character limit calculator to calculate common values quickly and accurately.",
  },

  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "Calculators",
    description: "Use this free compound interest calculator to calculate common values quickly and accurately.",
  },

  // Productivity

  {
    slug: "pomodoro-timer",
    name: "Pomodoro Timer",
    category: "Productivity",
    description: "Use this free pomodoro timer to make everyday work faster and easier.",
  },

  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    category: "Productivity",
    description: "Use this free countdown timer to make everyday work faster and easier.",
  },

  {
    slug: "stopwatch",
    name: "Stopwatch",
    category: "Productivity",
    description: "Use this free stopwatch to make everyday work faster and easier.",
  },

  {
    slug: "random-decision-maker",
    name: "Random Decision Maker",
    category: "Productivity",
    description: "Use this free random decision maker to make everyday work faster and easier.",
  },

  {
    slug: "random-choice-picker",
    name: "Random Choice Picker",
    category: "Productivity",
    description: "Use this free random choice picker to make everyday work faster and easier.",
  },

  {
    slug: "list-randomizer",
    name: "List Randomizer",
    category: "Productivity",
    description: "Use this free list randomizer to make everyday work faster and easier.",
  },

  {
    slug: "number-list-generator",
    name: "Number List Generator",
    category: "Productivity",
    description: "Use this free number list generator to make everyday work faster and easier.",
  },

  {
    slug: "password-list-generator",
    name: "Password List Generator",
    category: "Productivity",
    description: "Use this free password list generator to make everyday work faster and easier.",
  },

  {
    slug: "checklist-generator",
    name: "Checklist Generator",
    category: "Productivity",
    description: "Use this free checklist generator to make everyday work faster and easier.",
  },

  {
    slug: "meeting-notes-formatter",
    name: "Meeting Notes Formatter",
    category: "Productivity",
    description: "Use this free meeting notes formatter to make everyday work faster and easier.",
  },

  {
    slug: "bullet-point-formatter",
    name: "Bullet Point Formatter",
    category: "Productivity",
    description: "Use this free bullet point formatter to make everyday work faster and easier.",
  },

  {
    slug: "text-deduplicator",
    name: "Text Deduplicator",
    category: "Productivity",
    description: "Use this free text deduplicator to make everyday work faster and easier.",
  },

];

export default realToolsPlan;
