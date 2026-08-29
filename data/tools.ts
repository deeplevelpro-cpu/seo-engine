export type Tool = {
  title: string;
  description: string;
  category: string;
  seoTitle: string;
  seoDesc: string;
};

const tools: Record<string, Tool> = {  "keyword-density-checker": {
    "title": "Keyword Density Checker",
    "description": "Measure how often a target keyword appears in your content and review its percentage of total words.",
    "category": "SEO",
    "seoTitle": "Keyword Density Checker - Free Online Tool",
    "seoDesc": "Keyword Density Checker helps you measure keyword usage in content and review how frequently a target term appears. Useful for SEO content analysis and optimization."
  },  "keyword-frequency-checker": {
    "title": "Keyword Frequency Checker",
    "description": "Count keyword occurrences in text and quickly see which terms appear most often.",
    "category": "SEO",
    "seoTitle": "Keyword Frequency Checker - Free Online Tool",
    "seoDesc": "Keyword Frequency Checker counts keyword occurrences in your content so you can review term usage, compare important phrases, and refine copy."
  },  "meta-tag-generator": {
    "title": "Meta Tag Generator",
    "description": "Generate essential HTML meta tags for a webpage, including title, description, robots, and social metadata.",
    "category": "SEO",
    "seoTitle": "Meta Tag Generator - Free Online Tool",
    "seoDesc": "Meta Tag Generator helps create essential webpage meta tags for SEO and sharing. Prepare cleaner metadata without manually writing each tag."
  },  "meta-description-generator": {
    "title": "Meta Description Generator",
    "description": "Create concise, search-friendly meta descriptions designed to summarize a webpage clearly.",
    "category": "SEO",
    "seoTitle": "Meta Description Generator - Free Online Tool",
    "seoDesc": "Meta Description Generator helps you create concise search-result descriptions that summarize a page clearly and improve snippet wording."
  },  "title-tag-generator": {
    "title": "Title Tag Generator",
    "description": "Create concise SEO title tags that clearly describe a webpage and its primary search intent.",
    "category": "SEO",
    "seoTitle": "Title Tag Generator - Free Online Tool",
    "seoDesc": "Title Tag Generator helps create focused SEO title tags with clear wording for search results, page relevance, and stronger snippet presentation."
  },  "serp-snippet-preview": {
    "title": "SERP Snippet Preview",
    "description": "Preview how a page title and meta description may appear together in search results.",
    "category": "SEO",
    "seoTitle": "SERP Snippet Preview - Free Online Tool",
    "seoDesc": "SERP Snippet Preview lets you review title and meta description text together before publishing, helping you refine search-result presentation."
  },  "robots-txt-generator": {
    "title": "Robots.txt Generator",
    "description": "Create robots.txt directives that specify which website paths search-engine crawlers can access.",
    "category": "SEO",
    "seoTitle": "Robots.txt Generator - Free Online Tool",
    "seoDesc": "Robots.txt Generator helps create crawler directives for website paths. Prepare robots.txt rules quickly and review them before publishing."
  },  "sitemap-generator": {
    "title": "Sitemap Generator",
    "description": "Generate an XML sitemap structure containing the URLs that search engines should discover on your website.",
    "category": "SEO",
    "seoTitle": "Sitemap Generator - Free Online Tool",
    "seoDesc": "Sitemap Generator helps create an XML sitemap structure for important website URLs, making it easier to prepare pages for search-engine discovery."
  },  "canonical-url-generator": {
    "title": "Canonical URL Generator",
    "description": "Generate canonical URL markup that identifies the preferred version of a webpage.",
    "category": "SEO",
    "seoTitle": "Canonical URL Generator - Free Online Tool",
    "seoDesc": "Canonical URL Generator helps create canonical URL references for pages with duplicate or similar versions, supporting cleaner SEO signal management."
  },  "open-graph-generator": {
    "title": "Open Graph Generator",
    "description": "Generate Open Graph metadata for webpages so shared links can display richer previews on supported platforms.",
    "category": "SEO",
    "seoTitle": "Open Graph Generator - Free Online Tool",
    "seoDesc": "Open Graph Generator helps prepare social sharing metadata such as titles, descriptions, and preview information for webpages."
  },  "twitter-card-generator": {
    "title": "Twitter Card Generator",
    "description": "Generate Twitter/X card metadata for webpages to control how shared links are presented.",
    "category": "SEO",
    "seoTitle": "Twitter Card Generator - Free Online Tool",
    "seoDesc": "Twitter Card Generator helps prepare Twitter/X metadata for cleaner link previews, including page titles, descriptions, and sharing information."
  },  "schema-markup-generator": {
    "title": "Schema Markup Generator",
    "description": "Generate structured data markup that helps search engines understand the content and purpose of a webpage.",
    "category": "SEO",
    "seoTitle": "Schema Markup Generator - Free Online Tool",
    "seoDesc": "Schema Markup Generator helps create structured data for webpages so important content details can be represented in a search-friendly format."
  },  "faq-schema-generator": {
    "title": "FAQ Schema Generator",
    "description": "Create FAQ structured data from question-and-answer content for supported search-engine implementations.",
    "category": "SEO",
    "seoTitle": "FAQ Schema Generator - Free Online Tool",
    "seoDesc": "FAQ Schema Generator converts question-and-answer content into FAQ structured data, helping you prepare valid markup for supported implementations."
  },  "article-schema-generator": {
    "title": "Article Schema Generator",
    "description": "Generate Article structured data for blog posts, news articles, and other editorial webpages.",
    "category": "SEO",
    "seoTitle": "Article Schema Generator - Free Online Tool",
    "seoDesc": "Article Schema Generator helps create structured data for editorial content, including key article information for search-engine understanding."
  },  "breadcrumb-schema-generator": {
    "title": "Breadcrumb Schema Generator",
    "description": "Generate Breadcrumb structured data that describes the hierarchy and navigation path of a webpage.",
    "category": "SEO",
    "seoTitle": "Breadcrumb Schema Generator - Free Online Tool",
    "seoDesc": "Breadcrumb Schema Generator creates structured data describing page hierarchy and breadcrumb navigation for search-engine understanding."
  },  "local-business-schema-generator": {
    "title": "Local Business Schema Generator",
    "description": "Generate LocalBusiness structured data for webpages representing local businesses and their information.",
    "category": "SEO",
    "seoTitle": "Local Business Schema Generator - Free Online Tool",
    "seoDesc": "Local Business Schema Generator helps create LocalBusiness structured data for business details such as name, location, contact information, and services."
  },  "organization-schema-generator": {
    "title": "Organization Schema Generator",
    "description": "Generate Organization structured data for company, brand, or organizational information.",
    "category": "SEO",
    "seoTitle": "Organization Schema Generator - Free Online Tool",
    "seoDesc": "Organization Schema Generator helps create structured data for companies and brands, making key organization information easier for search engines to interpret."
  },  "website-schema-generator": {
    "title": "Website Schema Generator",
    "description": "Generate Website structured data for site-level information and search-engine understanding.",
    "category": "SEO",
    "seoTitle": "Website Schema Generator - Free Online Tool",
    "seoDesc": "Website Schema Generator helps create Website structured data for site-level information and important details about an online property."
  },  "seo-slug-generator": {
    "title": "SEO Slug Generator",
    "description": "Turn page titles into clean, readable, SEO-friendly URL slugs.",
    "category": "SEO",
    "seoTitle": "SEO Slug Generator - Free Online Tool",
    "seoDesc": "SEO Slug Generator converts page titles into clean, readable URL slugs that are easier for users and search engines to understand."
  },  "seo-title-checker": {
    "title": "SEO Title Checker",
    "description": "Check an SEO title for length and wording so it is clearer and more suitable for search-result presentation.",
    "category": "SEO",
    "seoTitle": "SEO Title Checker - Free Online Tool",
    "seoDesc": "SEO Title Checker helps review title wording and length so you can create clearer, more focused titles for search results."
  },

  "meta-description-length-checker": {
    "title": "Meta Description Length Checker",
    "description": "Meta Description Length Checker helps you write or evaluate concise search-result descriptions for pages and improve snippet wording. Use it to get a clear result quickly without unnecessary setup.",
    "category": "SEO",
    "seoTitle": "Meta Description Length Checker - Free Online Tool",
    "seoDesc": "Use Meta Description Length Checker to write or evaluate concise search-result descriptions for pages and improve snippet wording. Get a clear, practical r."
  },

  "heading-structure-checker": {
    "title": "Heading Structure Checker",
    "description": "Heading Structure Checker helps you inspect heading hierarchy and identify structural improvements for readable pages. Use it to get a clear result quickly without unnecessary setup.",
    "category": "SEO",
    "seoTitle": "Heading Structure Checker - Free Online Tool",
    "seoDesc": "Use Heading Structure Checker to inspect heading hierarchy and identify structural improvements for readable pages. Get a clear, practical result online wi."
  },

  "internal-link-checker": {
    "title": "Internal Link Checker",
    "description": "Internal Link Checker helps you review internal linking opportunities and identify useful links within website content. Use it to get a clear result quickly without unnecessary setup.",
    "category": "SEO",
    "seoTitle": "Internal Link Checker - Free Online Tool",
    "seoDesc": "Use Internal Link Checker to review internal linking opportunities and identify useful links within website content. Get a clear, practical result online w."
  },

  "keyword-placement-checker": {
    "title": "Keyword Placement Checker",
    "description": "Keyword Placement Checker helps you support SEO planning, optimization, and website content tasks. Use it to get a clear result quickly without unnecessary setup.",
    "category": "SEO",
    "seoTitle": "Keyword Placement Checker - Free Online Tool",
    "seoDesc": "Use Keyword Placement Checker to support SEO planning, optimization, and website content tasks. Get a clear, practical result online with AI Tool Engine."
  },

  "word-counter": {
    "title": "Word Counter",
    "description": "Word Counter helps you count words in text and get a quick measure of document length. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Word Counter - Free Online Tool",
    "seoDesc": "Use Word Counter to count words in text and get a quick measure of document length. Get a clear, practical result online with AI Tool Engine."
  },

  "character-counter": {
    "title": "Character Counter",
    "description": "Character Counter helps you count characters in text for copy limits, captions, and content checks. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Character Counter - Free Online Tool",
    "seoDesc": "Use Character Counter to count characters in text for copy limits, captions, and content checks. Get a clear, practical result online with AI Tool Engine."
  },

  "sentence-counter": {
    "title": "Sentence Counter",
    "description": "Sentence Counter helps you count sentences to understand basic text structure and length. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Sentence Counter - Free Online Tool",
    "seoDesc": "Use Sentence Counter to count sentences to understand basic text structure and length. Get a clear, practical result online with AI Tool Engine."
  },

  "paragraph-counter": {
    "title": "Paragraph Counter",
    "description": "Paragraph Counter helps you count paragraphs and quickly review document structure. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Paragraph Counter - Free Online Tool",
    "seoDesc": "Use Paragraph Counter to count paragraphs and quickly review document structure. Get a clear, practical result online with AI Tool Engine."
  },

  "reading-time-calculator": {
    "title": "Reading Time Calculator",
    "description": "Reading Time Calculator helps you estimate how long written content may take to read. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Reading Time Calculator - Free Online Tool",
    "seoDesc": "Use Reading Time Calculator to estimate how long written content may take to read. Get a clear, practical result online with AI Tool Engine."
  },

  "text-case-converter": {
    "title": "Text Case Converter",
    "description": "Text Case Converter helps you convert text between common capitalization styles. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Text Case Converter - Free Online Tool",
    "seoDesc": "Use Text Case Converter to convert text between common capitalization styles. Get a clear, practical result online with AI Tool Engine."
  },

  "text-reverser": {
    "title": "Text Reverser",
    "description": "Text Reverser helps you reverse text order for testing, formatting, and simple text transformations. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Text Reverser - Free Online Tool",
    "seoDesc": "Use Text Reverser to reverse text order for testing, formatting, and simple text transformations. Get a clear, practical result online with AI Tool Engine."
  },

  "remove-extra-spaces": {
    "title": "Remove Extra Spaces",
    "description": "Remove Extra Spaces helps you clean repeated or unnecessary spaces from text. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Remove Extra Spaces - Free Online Tool",
    "seoDesc": "Use Remove Extra Spaces to clean repeated or unnecessary spaces from text. Get a clear, practical result online with AI Tool Engine."
  },

  "remove-duplicate-lines": {
    "title": "Remove Duplicate Lines",
    "description": "Remove Duplicate Lines helps you remove repeated lines and keep a cleaner list or text block. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Remove Duplicate Lines - Free Online Tool",
    "seoDesc": "Use Remove Duplicate Lines to remove repeated lines and keep a cleaner list or text block. Get a clear, practical result online with AI Tool Engine."
  },

  "remove-empty-lines": {
    "title": "Remove Empty Lines",
    "description": "Remove Empty Lines helps you remove blank lines to compact and clean text. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Remove Empty Lines - Free Online Tool",
    "seoDesc": "Use Remove Empty Lines to remove blank lines to compact and clean text. Get a clear, practical result online with AI Tool Engine."
  },

  "line-counter": {
    "title": "Line Counter",
    "description": "Line Counter helps you work with written content, text analysis, and everyday editing tasks. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Line Counter - Free Online Tool",
    "seoDesc": "Use Line Counter to work with written content, text analysis, and everyday editing tasks. Get a clear, practical result online with AI Tool Engine."
  },

  "word-frequency-counter": {
    "title": "Word Frequency Counter",
    "description": "Word Frequency Counter helps you count words in text and get a quick measure of document length. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Word Frequency Counter - Free Online Tool",
    "seoDesc": "Use Word Frequency Counter to count words in text and get a quick measure of document length. Get a clear, practical result online with AI Tool Engine."
  },

  "text-sorter": {
    "title": "Text Sorter",
    "description": "Text Sorter helps you sort lines or text entries into a more organized order. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Text Sorter - Free Online Tool",
    "seoDesc": "Use Text Sorter to sort lines or text entries into a more organized order. Get a clear, practical result online with AI Tool Engine."
  },

  "find-and-replace-text": {
    "title": "Find and Replace Text",
    "description": "Find and Replace Text helps you find matching text and replace it consistently across a text block. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Find and Replace Text - Free Online Tool",
    "seoDesc": "Use Find and Replace Text to find matching text and replace it consistently across a text block. Get a clear, practical result online with AI Tool Engine."
  },

  "lorem-ipsum-generator": {
    "title": "Lorem Ipsum Generator",
    "description": "Lorem Ipsum Generator helps you generate placeholder copy for prototypes, layouts, and design drafts. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Lorem Ipsum Generator - Free Online Tool",
    "seoDesc": "Use Lorem Ipsum Generator to generate placeholder copy for prototypes, layouts, and design drafts. Get a clear, practical result online with AI Tool Engine."
  },

  "text-cleaner": {
    "title": "Text Cleaner",
    "description": "Text Cleaner helps you clean common text formatting issues and prepare copy for reuse. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Text Cleaner - Free Online Tool",
    "seoDesc": "Use Text Cleaner to clean common text formatting issues and prepare copy for reuse. Get a clear, practical result online with AI Tool Engine."
  },

  "duplicate-word-finder": {
    "title": "Duplicate Word Finder",
    "description": "Duplicate Word Finder helps you find repeated words that may need editing or cleanup. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Duplicate Word Finder - Free Online Tool",
    "seoDesc": "Use Duplicate Word Finder to find repeated words that may need editing or cleanup. Get a clear, practical result online with AI Tool Engine."
  },

  "palindrome-checker": {
    "title": "Palindrome Checker",
    "description": "Palindrome Checker helps you check whether text reads the same forward and backward. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Content",
    "seoTitle": "Palindrome Checker - Free Online Tool",
    "seoDesc": "Use Palindrome Checker to check whether text reads the same forward and backward. Get a clear, practical result online with AI Tool Engine."
  },

  "json-formatter": {
    "title": "JSON Formatter",
    "description": "JSON Formatter helps you format JSON with readable indentation for easier inspection and editing. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "JSON Formatter - Free Online Tool",
    "seoDesc": "Use JSON Formatter to format JSON with readable indentation for easier inspection and editing. Get a clear, practical result online with AI Tool Engine."
  },

  "json-validator": {
    "title": "JSON Validator",
    "description": "JSON Validator helps you validate JSON structure and catch malformed syntax before using the data. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "JSON Validator - Free Online Tool",
    "seoDesc": "Use JSON Validator to validate JSON structure and catch malformed syntax before using the data. Get a clear, practical result online with AI Tool Engine."
  },

  "json-minifier": {
    "title": "JSON Minifier",
    "description": "JSON Minifier helps you reduce JSON whitespace to create a more compact representation. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "JSON Minifier - Free Online Tool",
    "seoDesc": "Use JSON Minifier to reduce JSON whitespace to create a more compact representation. Get a clear, practical result online with AI Tool Engine."
  },

  "base64-encoder": {
    "title": "Base64 Encoder",
    "description": "Base64 Encoder helps you encode text or data into Base64 representation. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "Base64 Encoder - Free Online Tool",
    "seoDesc": "Use Base64 Encoder to encode text or data into Base64 representation. Get a clear, practical result online with AI Tool Engine."
  },

  "base64-decoder": {
    "title": "Base64 Decoder",
    "description": "Base64 Decoder helps you decode Base64 data back into readable text. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "Base64 Decoder - Free Online Tool",
    "seoDesc": "Use Base64 Decoder to decode Base64 data back into readable text. Get a clear, practical result online with AI Tool Engine."
  },

  "url-encoder": {
    "title": "URL Encoder",
    "description": "URL Encoder helps you work with code, structured data, URLs, and common development tasks. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "URL Encoder - Free Online Tool",
    "seoDesc": "Use URL Encoder to work with code, structured data, URLs, and common development tasks. Get a clear, practical result online with AI Tool Engine."
  },

  "url-decoder": {
    "title": "URL Decoder",
    "description": "URL Decoder helps you work with code, structured data, URLs, and common development tasks. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "URL Decoder - Free Online Tool",
    "seoDesc": "Use URL Decoder to work with code, structured data, URLs, and common development tasks. Get a clear, practical result online with AI Tool Engine."
  },

  "xml-formatter": {
    "title": "XML Formatter",
    "description": "XML Formatter helps you format XML with clearer indentation for easier reading and maintenance. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "XML Formatter - Free Online Tool",
    "seoDesc": "Use XML Formatter to format XML with clearer indentation for easier reading and maintenance. Get a clear, practical result online with AI Tool Engine."
  },

  "xml-validator": {
    "title": "XML Validator",
    "description": "XML Validator helps you check XML structure for malformed syntax and formatting problems. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "XML Validator - Free Online Tool",
    "seoDesc": "Use XML Validator to check XML structure for malformed syntax and formatting problems. Get a clear, practical result online with AI Tool Engine."
  },

  "css-formatter": {
    "title": "CSS Formatter",
    "description": "CSS Formatter helps you format CSS into a cleaner and more readable structure. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "CSS Formatter - Free Online Tool",
    "seoDesc": "Use CSS Formatter to format CSS into a cleaner and more readable structure. Get a clear, practical result online with AI Tool Engine."
  },

  "javascript-formatter": {
    "title": "JavaScript Formatter",
    "description": "JavaScript Formatter helps you format JavaScript code into a more consistent readable layout. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "JavaScript Formatter - Free Online Tool",
    "seoDesc": "Use JavaScript Formatter to format JavaScript code into a more consistent readable layout. Get a clear, practical result online with AI Tool Engine."
  },

  "sql-formatter": {
    "title": "SQL Formatter",
    "description": "SQL Formatter helps you format SQL queries into a cleaner structure for inspection and editing. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "SQL Formatter - Free Online Tool",
    "seoDesc": "Use SQL Formatter to format SQL queries into a cleaner structure for inspection and editing. Get a clear, practical result online with AI Tool Engine."
  },

  "sql-minifier": {
    "title": "SQL Minifier",
    "description": "SQL Minifier helps you compact SQL by removing unnecessary whitespace. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "SQL Minifier - Free Online Tool",
    "seoDesc": "Use SQL Minifier to compact SQL by removing unnecessary whitespace. Get a clear, practical result online with AI Tool Engine."
  },

  "uuid-generator": {
    "title": "UUID Generator",
    "description": "UUID Generator helps you generate UUID values for identifiers, development, and testing. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "UUID Generator - Free Online Tool",
    "seoDesc": "Use UUID Generator to generate UUID values for identifiers, development, and testing. Get a clear, practical result online with AI Tool Engine."
  },

  "uuid-validator": {
    "title": "UUID Validator",
    "description": "UUID Validator helps you check whether a UUID value follows a valid format. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "UUID Validator - Free Online Tool",
    "seoDesc": "Use UUID Validator to check whether a UUID value follows a valid format. Get a clear, practical result online with AI Tool Engine."
  },

  "unix-timestamp-converter": {
    "title": "Unix Timestamp Converter",
    "description": "Unix Timestamp Converter helps you convert or work with Unix timestamp values for application and development tasks. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "Unix Timestamp Converter - Free Online Tool",
    "seoDesc": "Use Unix Timestamp Converter to convert or work with Unix timestamp values for application and development tasks. Get a clear, practical result online with."
  },

  "timestamp-generator": {
    "title": "Timestamp Generator",
    "description": "Timestamp Generator helps you generate timestamp values for testing, logging, and development workflows. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "Timestamp Generator - Free Online Tool",
    "seoDesc": "Use Timestamp Generator to generate timestamp values for testing, logging, and development workflows. Get a clear, practical result online with AI Tool Eng."
  },

  "regex-tester": {
    "title": "Regex Tester",
    "description": "Regex Tester helps you test regular expressions against sample text and inspect matches. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "Regex Tester - Free Online Tool",
    "seoDesc": "Use Regex Tester to test regular expressions against sample text and inspect matches. Get a clear, practical result online with AI Tool Engine."
  },

  "regex-escape-tool": {
    "title": "Regex Escape Tool",
    "description": "Regex Escape Tool helps you escape special regular-expression characters for safer literal matching. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "Regex Escape Tool - Free Online Tool",
    "seoDesc": "Use Regex Escape Tool to escape special regular-expression characters for safer literal matching. Get a clear, practical result online with AI Tool Engine."
  },

  "html-entity-encoder": {
    "title": "HTML Entity Encoder",
    "description": "HTML Entity Encoder helps you convert special characters into HTML entity representations. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "HTML Entity Encoder - Free Online Tool",
    "seoDesc": "Use HTML Entity Encoder to convert special characters into HTML entity representations. Get a clear, practical result online with AI Tool Engine."
  },

  "html-entity-decoder": {
    "title": "HTML Entity Decoder",
    "description": "HTML Entity Decoder helps you decode HTML entities back into readable characters. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Developer",
    "seoTitle": "HTML Entity Decoder - Free Online Tool",
    "seoDesc": "Use HTML Entity Decoder to decode HTML entities back into readable characters. Get a clear, practical result online with AI Tool Engine."
  },

  "url-parser": {
    "title": "URL Parser",
    "description": "URL Parser helps you break a URL into useful components such as protocol, host, path, and query. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "URL Parser - Free Online URL Tool",
    "seoDesc": "Use URL Parser to break a URL into useful components such as protocol, host, path, and query. Get a clear, practical result online with AI Tool Engine."
  },

  "url-cleaner": {
    "title": "URL Cleaner",
    "description": "URL Cleaner helps you clean URLs by removing unnecessary tracking or formatting noise. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "URL Cleaner - Free Online Tool",
    "seoDesc": "Use URL Cleaner to clean URLs by removing unnecessary tracking or formatting noise. Get a clear, practical result online with AI Tool Engine."
  },

  "query-string-parser": {
    "title": "Query String Parser",
    "description": "Query String Parser helps you parse URL query parameters into readable key-value data. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "Query String Parser - Free Online Tool",
    "seoDesc": "Use Query String Parser to parse URL query parameters into readable key-value data. Get a clear, practical result online with AI Tool Engine."
  },

  "query-string-builder": {
    "title": "Query String Builder",
    "description": "Query String Builder helps you build URL query strings from parameter values. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "Query String Builder - Free Online Tool",
    "seoDesc": "Use Query String Builder to build URL query strings from parameter values. Get a clear, practical result online with AI Tool Engine."
  },

  "utm-url-builder": {
    "title": "UTM URL Builder",
    "description": "UTM URL Builder helps you create campaign-tagged URLs for tracking marketing traffic. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "UTM URL Builder - Free Online Tool",
    "seoDesc": "Use UTM URL Builder to create campaign-tagged URLs for tracking marketing traffic. Get a clear, practical result online with AI Tool Engine."
  },

  "http-status-code-lookup": {
    "title": "HTTP Status Code Lookup",
    "description": "HTTP Status Code Lookup helps you look up HTTP status codes and understand what common responses mean. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "HTTP Status Code Lookup - Free Online Tool",
    "seoDesc": "Use HTTP Status Code Lookup to look up HTTP status codes and understand what common responses mean. Get a clear, practical result online with AI Tool Engine."
  },

  "mime-type-lookup": {
    "title": "MIME Type Lookup",
    "description": "MIME Type Lookup helps you look up MIME types used for common file formats and web resources. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "MIME Type Lookup - Free Online Tool",
    "seoDesc": "Use MIME Type Lookup to look up MIME types used for common file formats and web resources. Get a clear, practical result online with AI Tool Engine."
  },

  "user-agent-parser": {
    "title": "User Agent Parser",
    "description": "User Agent Parser helps you inspect user-agent strings and identify browser or client details. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "User Agent Parser - Free Online Tool",
    "seoDesc": "Use User Agent Parser to inspect user-agent strings and identify browser or client details. Get a clear, practical result online with AI Tool Engine."
  },

  "domain-name-parser": {
    "title": "Domain Name Parser",
    "description": "Domain Name Parser helps you inspect domain names and break them into useful components. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "Domain Name Parser - Free Online Tool",
    "seoDesc": "Use Domain Name Parser to inspect domain names and break them into useful components. Get a clear, practical result online with AI Tool Engine."
  },

  "email-link-generator": {
    "title": "Email Link Generator",
    "description": "Email Link Generator helps you create mailto links with a clean, reusable format. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "Email Link Generator - Free Online Tool",
    "seoDesc": "Use Email Link Generator to create mailto links with a clean, reusable format. Get a clear, practical result online with AI Tool Engine."
  },

  "tel-link-generator": {
    "title": "Tel Link Generator",
    "description": "Tel Link Generator helps you create telephone links that can be opened from supported devices. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "Tel Link Generator - Free Online Tool",
    "seoDesc": "Use Tel Link Generator to create telephone links that can be opened from supported devices. Get a clear, practical result online with AI Tool Engine."
  },

  "anchor-link-generator": {
    "title": "Anchor Link Generator",
    "description": "Anchor Link Generator helps you create anchor links for navigation within web pages. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Web",
    "seoTitle": "Anchor Link Generator - Free Online Tool",
    "seoDesc": "Use Anchor Link Generator to create anchor links for navigation within web pages. Get a clear, practical result online with AI Tool Engine."
  },

  "password-generator": {
    "title": "Password Generator",
    "description": "Password Generator helps you generate stronger random passwords with configurable length. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "Password Generator - Free Online Tool",
    "seoDesc": "Use Password Generator to generate stronger random passwords with configurable length. Get a clear, practical result online with AI Tool Engine."
  },

  "password-strength-checker": {
    "title": "Password Strength Checker",
    "description": "Password Strength Checker helps you evaluate password strength and identify characteristics that improve security. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "Password Strength Checker - Free Online Tool",
    "seoDesc": "Use Password Strength Checker to evaluate password strength and identify characteristics that improve security. Get a clear, practical result online with A."
  },

  "random-string-generator": {
    "title": "Random String Generator",
    "description": "Random String Generator helps you generate random text strings for testing, identifiers, and development tasks. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "Random String Generator - Free Online Tool",
    "seoDesc": "Use Random String Generator to generate random text strings for testing, identifiers, and development tasks. Get a clear, practical result online with AI T."
  },

  "random-number-generator": {
    "title": "Random Number Generator",
    "description": "Random Number Generator helps you generate random numbers within a useful range for testing and utilities. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "Random Number Generator - Free Online Tool",
    "seoDesc": "Use Random Number Generator to generate random numbers within a useful range for testing and utilities. Get a clear, practical result online with AI Tool E."
  },

  "hash-generator": {
    "title": "Hash Generator",
    "description": "Hash Generator helps you create hash values from supplied text for development and verification. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "Hash Generator - Free Online Tool",
    "seoDesc": "Use Hash Generator to create hash values from supplied text for development and verification. Get a clear, practical result online with AI Tool Engine."
  },

  "md5-hash-generator": {
    "title": "MD5 Hash Generator",
    "description": "MD5 Hash Generator helps you create hash values from supplied text for development and verification. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "MD5 Hash Generator - Free Online Tool",
    "seoDesc": "Use MD5 Hash Generator to create hash values from supplied text for development and verification. Get a clear, practical result online with AI Tool Engine."
  },

  "sha256-hash-generator": {
    "title": "SHA256 Hash Generator",
    "description": "SHA256 Hash Generator helps you create hash values from supplied text for development and verification. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "SHA256 Hash Generator - Free Online Tool",
    "seoDesc": "Use SHA256 Hash Generator to create hash values from supplied text for development and verification. Get a clear, practical result online with AI Tool Engine."
  },

  "sha512-hash-generator": {
    "title": "SHA512 Hash Generator",
    "description": "SHA512 Hash Generator helps you create hash values from supplied text for development and verification. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "SHA512 Hash Generator - Free Online Tool",
    "seoDesc": "Use SHA512 Hash Generator to create hash values from supplied text for development and verification. Get a clear, practical result online with AI Tool Engine."
  },

  "hmac-generator": {
    "title": "HMAC Generator",
    "description": "HMAC Generator helps you create HMAC values using a message and secret key. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "HMAC Generator - Free Online Tool",
    "seoDesc": "Use HMAC Generator to create HMAC values using a message and secret key. Get a clear, practical result online with AI Tool Engine."
  },

  "secret-key-generator": {
    "title": "Secret Key Generator",
    "description": "Secret Key Generator helps you generate random secret-key material for development and testing. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "Secret Key Generator - Free Online Tool",
    "seoDesc": "Use Secret Key Generator to generate random secret-key material for development and testing. Get a clear, practical result online with AI Tool Engine."
  },

  "pin-generator": {
    "title": "PIN Generator",
    "description": "PIN Generator helps you generate random PIN values for testing and sample workflows. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Security",
    "seoTitle": "PIN Generator - Free Online Tool",
    "seoDesc": "Use PIN Generator to generate random PIN values for testing and sample workflows. Get a clear, practical result online with AI Tool Engine."
  },

  "image-alt-text-generator": {
    "title": "Image Alt Text Generator",
    "description": "Image Alt Text Generator helps you create useful alternative text suggestions for images and accessibility. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "Image Alt Text Generator - Free Online Tool",
    "seoDesc": "Use Image Alt Text Generator to create useful alternative text suggestions for images and accessibility. Get a clear, practical result online with AI Tool."
  },

  "image-filename-generator": {
    "title": "Image Filename Generator",
    "description": "Image Filename Generator helps you create cleaner descriptive image filenames for organization and SEO. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "Image Filename Generator - Free Online Tool",
    "seoDesc": "Use Image Filename Generator to create cleaner descriptive image filenames for organization and SEO. Get a clear, practical result online with AI Tool Engine."
  },

  "image-dimensions-checker": {
    "title": "Image Dimensions Checker",
    "description": "Image Dimensions Checker helps you check image width and height values for layout and content planning. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "Image Dimensions Checker - Free Online Tool",
    "seoDesc": "Use Image Dimensions Checker to check image width and height values for layout and content planning. Get a clear, practical result online with AI Tool Engine."
  },

  "color-picker": {
    "title": "Color Picker",
    "description": "Color Picker helps you select and inspect colors for design and web projects. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "Color Picker - Free Online Tool",
    "seoDesc": "Use Color Picker to select and inspect colors for design and web projects. Get a clear, practical result online with AI Tool Engine."
  },

  "hex-to-rgb-converter": {
    "title": "HEX to RGB Converter",
    "description": "HEX to RGB Converter helps you convert hexadecimal colors into RGB values. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "HEX to RGB Converter - Free Online Tool",
    "seoDesc": "Use HEX to RGB Converter to convert hexadecimal colors into RGB values. Get a clear, practical result online with AI Tool Engine."
  },

  "rgb-to-hex-converter": {
    "title": "RGB to HEX Converter",
    "description": "RGB to HEX Converter helps you convert hexadecimal colors into RGB values. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "RGB to HEX Converter - Free Online Tool",
    "seoDesc": "Use RGB to HEX Converter to convert hexadecimal colors into RGB values. Get a clear, practical result online with AI Tool Engine."
  },

  "hsl-color-converter": {
    "title": "HSL Color Converter",
    "description": "HSL Color Converter helps you convert HSL color values for design and development use. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "HSL Color Converter - Free Online Tool",
    "seoDesc": "Use HSL Color Converter to convert HSL color values for design and development use. Get a clear, practical result online with AI Tool Engine."
  },

  "color-contrast-checker": {
    "title": "Color Contrast Checker",
    "description": "Color Contrast Checker helps you check color contrast for more readable interfaces. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "Color Contrast Checker - Free Online Tool",
    "seoDesc": "Use Color Contrast Checker to check color contrast for more readable interfaces. Get a clear, practical result online with AI Tool Engine."
  },

  "image-to-base64-converter": {
    "title": "Image to Base64 Converter",
    "description": "Image to Base64 Converter helps you convert images to or from Base64 data for development workflows. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "Image to Base64 Converter - Free Online Tool",
    "seoDesc": "Use Image to Base64 Converter to convert images to or from Base64 data for development workflows. Get a clear, practical result online with AI Tool Engine."
  },

  "base64-to-image-converter": {
    "title": "Base64 to Image Converter",
    "description": "Base64 to Image Converter helps you convert images to or from Base64 data for development workflows. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "Base64 to Image Converter - Free Online Tool",
    "seoDesc": "Use Base64 to Image Converter to convert images to or from Base64 data for development workflows. Get a clear, practical result online with AI Tool Engine."
  },

  "aspect-ratio-calculator": {
    "title": "Aspect Ratio Calculator",
    "description": "Aspect Ratio Calculator helps you calculate or inspect image and video aspect ratios. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "Aspect Ratio Calculator - Free Online Tool",
    "seoDesc": "Use Aspect Ratio Calculator to calculate or inspect image and video aspect ratios. Get a clear, practical result online with AI Tool Engine."
  },

  "image-url-generator": {
    "title": "Image URL Generator",
    "description": "Image URL Generator helps you work with image, color, and visual-content tasks. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Image",
    "seoTitle": "Image URL Generator - Free Online Tool",
    "seoDesc": "Use Image URL Generator to work with image, color, and visual-content tasks. Get a clear, practical result online with AI Tool Engine."
  },

  "hashtag-generator": {
    "title": "Hashtag Generator",
    "description": "Hashtag Generator helps you generate relevant hashtag ideas for social content. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "Hashtag Generator - Free Online Tool",
    "seoDesc": "Use Hashtag Generator to generate relevant hashtag ideas for social content. Get a clear, practical result online with AI Tool Engine."
  },

  "youtube-title-generator": {
    "title": "YouTube Title Generator",
    "description": "YouTube Title Generator helps you generate YouTube title ideas designed around clearer topics and audience intent. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "YouTube Title Generator - Free Online Tool",
    "seoDesc": "Use YouTube Title Generator to generate YouTube title ideas designed around clearer topics and audience intent. Get a clear, practical result online with A."
  },

  "youtube-description-generator": {
    "title": "YouTube Description Generator",
    "description": "YouTube Description Generator helps you create YouTube descriptions with useful structure and relevant context. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "YouTube Description Generator - Free Online Tool",
    "seoDesc": "Use YouTube Description Generator to create YouTube descriptions with useful structure and relevant context. Get a clear, practical result online with AI T."
  },

  "youtube-tag-generator": {
    "title": "YouTube Tag Generator",
    "description": "YouTube Tag Generator helps you generate YouTube tag ideas related to a video topic. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "YouTube Tag Generator - Free Online Tool",
    "seoDesc": "Use YouTube Tag Generator to generate YouTube tag ideas related to a video topic. Get a clear, practical result online with AI Tool Engine."
  },

  "instagram-caption-generator": {
    "title": "Instagram Caption Generator",
    "description": "Instagram Caption Generator helps you create Instagram caption ideas for social posts. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "Instagram Caption Generator - Free Online Tool",
    "seoDesc": "Use Instagram Caption Generator to create Instagram caption ideas for social posts. Get a clear, practical result online with AI Tool Engine."
  },

  "social-media-caption-generator": {
    "title": "Social Media Caption Generator",
    "description": "Social Media Caption Generator helps you generate caption ideas for social media content. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "Social Media Caption Generator - Free Online Tool",
    "seoDesc": "Use Social Media Caption Generator to generate caption ideas for social media content. Get a clear, practical result online with AI Tool Engine."
  },

  "call-to-action-generator": {
    "title": "Call to Action Generator",
    "description": "Call to Action Generator helps you create CTA wording that encourages a clear next step. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "Call to Action Generator - Free Online Tool",
    "seoDesc": "Use Call to Action Generator to create CTA wording that encourages a clear next step. Get a clear, practical result online with AI Tool Engine."
  },

  "headline-generator": {
    "title": "Headline Generator",
    "description": "Headline Generator helps you generate headline ideas for articles, landing pages, and campaigns. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "Headline Generator - Free Online Tool",
    "seoDesc": "Use Headline Generator to generate headline ideas for articles, landing pages, and campaigns. Get a clear, practical result online with AI Tool Engine."
  },

  "blog-title-generator": {
    "title": "Blog Title Generator",
    "description": "Blog Title Generator helps you generate blog title ideas around a specific topic or search intent. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "Blog Title Generator - Free Online Tool",
    "seoDesc": "Use Blog Title Generator to generate blog title ideas around a specific topic or search intent. Get a clear, practical result online with AI Tool Engine."
  },

  "content-brief-generator": {
    "title": "Content Brief Generator",
    "description": "Content Brief Generator helps you create a structured content brief with useful planning elements. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "Content Brief Generator - Free Online Tool",
    "seoDesc": "Use Content Brief Generator to create a structured content brief with useful planning elements. Get a clear, practical result online with AI Tool Engine."
  },

  "utm-campaign-builder": {
    "title": "UTM Campaign Builder",
    "description": "UTM Campaign Builder helps you build campaign tracking parameters for marketing URLs. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Marketing",
    "seoTitle": "UTM Campaign Builder - Free Online Tool",
    "seoDesc": "Use UTM Campaign Builder to build campaign tracking parameters for marketing URLs. Get a clear, practical result online with AI Tool Engine."
  },

  "csv-to-json-converter": {
    "title": "CSV to JSON Converter",
    "description": "CSV to JSON Converter helps you convert CSV-style data into JSON for easier application and data workflows. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "CSV to JSON Converter - Free Online Tool",
    "seoDesc": "Use CSV to JSON Converter to convert CSV-style data into JSON for easier application and data workflows. Get a clear, practical result online with AI Tool."
  },

  "json-to-csv-converter": {
    "title": "JSON to CSV Converter",
    "description": "JSON to CSV Converter helps you convert CSV-style data into JSON for easier application and data workflows. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "JSON to CSV Converter - Free Online Tool",
    "seoDesc": "Use JSON to CSV Converter to convert CSV-style data into JSON for easier application and data workflows. Get a clear, practical result online with AI Tool."
  },

  "json-to-xml-converter": {
    "title": "JSON to XML Converter",
    "description": "JSON to XML Converter helps you convert JSON into XML for systems that require XML output. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "JSON to XML Converter - Free Online Tool",
    "seoDesc": "Use JSON to XML Converter to convert JSON into XML for systems that require XML output. Get a clear, practical result online with AI Tool Engine."
  },

  "xml-to-json-converter": {
    "title": "XML to JSON Converter",
    "description": "XML to JSON Converter helps you convert JSON into XML for systems that require XML output. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "XML to JSON Converter - Free Online Tool",
    "seoDesc": "Use XML to JSON Converter to convert JSON into XML for systems that require XML output. Get a clear, practical result online with AI Tool Engine."
  },

  "text-to-csv-converter": {
    "title": "Text to CSV Converter",
    "description": "Text to CSV Converter helps you turn structured text into CSV-style data. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "Text to CSV Converter - Free Online Tool",
    "seoDesc": "Use Text to CSV Converter to turn structured text into CSV-style data. Get a clear, practical result online with AI Tool Engine."
  },

  "csv-column-extractor": {
    "title": "CSV Column Extractor",
    "description": "CSV Column Extractor helps you extract a selected column from CSV data. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "CSV Column Extractor - Free Online Tool",
    "seoDesc": "Use CSV Column Extractor to extract a selected column from CSV data. Get a clear, practical result online with AI Tool Engine."
  },

  "number-to-words-converter": {
    "title": "Number to Words Converter",
    "description": "Number to Words Converter helps you convert numeric values into written words. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "Number to Words Converter - Free Online Tool",
    "seoDesc": "Use Number to Words Converter to convert numeric values into written words. Get a clear, practical result online with AI Tool Engine."
  },

  "words-to-number-converter": {
    "title": "Words to Number Converter",
    "description": "Words to Number Converter helps you convert numeric values into written words. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "Words to Number Converter - Free Online Tool",
    "seoDesc": "Use Words to Number Converter to convert numeric values into written words. Get a clear, practical result online with AI Tool Engine."
  },

  "binary-to-decimal-converter": {
    "title": "Binary to Decimal Converter",
    "description": "Binary to Decimal Converter helps you convert binary values to decimal numbers. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "Binary to Decimal Converter - Free Online Tool",
    "seoDesc": "Use Binary to Decimal Converter to convert binary values to decimal numbers. Get a clear, practical result online with AI Tool Engine."
  },

  "decimal-to-binary-converter": {
    "title": "Decimal to Binary Converter",
    "description": "Decimal to Binary Converter helps you convert binary values to decimal numbers. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "Decimal to Binary Converter - Free Online Tool",
    "seoDesc": "Use Decimal to Binary Converter to convert binary values to decimal numbers. Get a clear, practical result online with AI Tool Engine."
  },

  "hex-to-decimal-converter": {
    "title": "Hex to Decimal Converter",
    "description": "Hex to Decimal Converter helps you convert hexadecimal values to decimal numbers. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "Hex to Decimal Converter - Free Online Tool",
    "seoDesc": "Use Hex to Decimal Converter to convert hexadecimal values to decimal numbers. Get a clear, practical result online with AI Tool Engine."
  },

  "decimal-to-hex-converter": {
    "title": "Decimal to Hex Converter",
    "description": "Decimal to Hex Converter helps you convert hexadecimal values to decimal numbers. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "Decimal to Hex Converter - Free Online Tool",
    "seoDesc": "Use Decimal to Hex Converter to convert hexadecimal values to decimal numbers. Get a clear, practical result online with AI Tool Engine."
  },

  "roman-numeral-converter": {
    "title": "Roman Numeral Converter",
    "description": "Roman Numeral Converter helps you convert numbers to or from Roman numeral notation. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "Roman Numeral Converter - Free Online Tool",
    "seoDesc": "Use Roman Numeral Converter to convert numbers to or from Roman numeral notation. Get a clear, practical result online with AI Tool Engine."
  },

  "percentage-calculator": {
    "title": "Percentage Calculator",
    "description": "Percentage Calculator helps you calculate percentages from common value and percentage inputs. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Percentage Calculator - Free Online Tool",
    "seoDesc": "Use Percentage Calculator to calculate percentages from common value and percentage inputs. Get a clear, practical result online with AI Tool Engine."
  },

  "percentage-increase-calculator": {
    "title": "Percentage Increase Calculator",
    "description": "Percentage Increase Calculator helps you calculate percentage increases between values. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Percentage Increase Calculator - Free Online Tool",
    "seoDesc": "Use Percentage Increase Calculator to calculate percentage increases between values. Get a clear, practical result online with AI Tool Engine."
  },

  "percentage-decrease-calculator": {
    "title": "Percentage Decrease Calculator",
    "description": "Percentage Decrease Calculator helps you calculate percentage decreases between values. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Percentage Decrease Calculator - Free Online Tool",
    "seoDesc": "Use Percentage Decrease Calculator to calculate percentage decreases between values. Get a clear, practical result online with AI Tool Engine."
  },

  "average-calculator": {
    "title": "Average Calculator",
    "description": "Average Calculator helps you calculate an average from a set of numeric values. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Average Calculator - Free Online Tool",
    "seoDesc": "Use Average Calculator to calculate an average from a set of numeric values. Get a clear, practical result online with AI Tool Engine."
  },

  "ratio-calculator": {
    "title": "Ratio Calculator",
    "description": "Ratio Calculator helps you calculate and compare ratios from supplied values. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Ratio Calculator - Free Online Tool",
    "seoDesc": "Use Ratio Calculator to calculate and compare ratios from supplied values. Get a clear, practical result online with AI Tool Engine."
  },

  "proportion-calculator": {
    "title": "Proportion Calculator",
    "description": "Proportion Calculator helps you solve proportion relationships from known values. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Proportion Calculator - Free Online Tool",
    "seoDesc": "Use Proportion Calculator to solve proportion relationships from known values. Get a clear, practical result online with AI Tool Engine."
  },

  "age-calculator": {
    "title": "Age Calculator",
    "description": "Age Calculator helps you calculate age from date information. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Age Calculator - Free Online Tool",
    "seoDesc": "Use Age Calculator to calculate age from date information. Get a clear, practical result online with AI Tool Engine."
  },

  "date-difference-calculator": {
    "title": "Date Difference Calculator",
    "description": "Date Difference Calculator helps you calculate the difference between two dates. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Date Difference Calculator - Free Online Tool",
    "seoDesc": "Use Date Difference Calculator to calculate the difference between two dates. Get a clear, practical result online with AI Tool Engine."
  },

  "time-difference-calculator": {
    "title": "Time Difference Calculator",
    "description": "Time Difference Calculator helps you calculate the difference between two times. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Time Difference Calculator - Free Online Tool",
    "seoDesc": "Use Time Difference Calculator to calculate the difference between two times. Get a clear, practical result online with AI Tool Engine."
  },

  "character-limit-calculator": {
    "title": "Character Limit Calculator",
    "description": "Character Limit Calculator helps you check text against a character limit. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Character Limit Calculator - Free Online Tool",
    "seoDesc": "Use Character Limit Calculator to check text against a character limit. Get a clear, practical result online with AI Tool Engine."
  },

  "compound-interest-calculator": {
    "title": "Compound Interest Calculator",
    "description": "Compound Interest Calculator helps you calculate compound interest using principal, rate, time, and compounding. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Calculators",
    "seoTitle": "Compound Interest Calculator - Free Online Tool",
    "seoDesc": "Use Compound Interest Calculator to calculate compound interest using principal, rate, time, and compounding. Get a clear, practical result online with AI."
  },

  "list-randomizer": {
    "title": "List Randomizer",
    "description": "List Randomizer helps you randomize the order of list items. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Productivity",
    "seoTitle": "List Randomizer - Free Online Tool",
    "seoDesc": "Use List Randomizer to randomize the order of list items. Get a clear, practical result online with AI Tool Engine."
  },

  "checklist-generator": {
    "title": "Checklist Generator",
    "description": "Checklist Generator helps you create and manage a simple checklist for tasks and workflows. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Productivity",
    "seoTitle": "Checklist Generator - Free Online Tool",
    "seoDesc": "Use Checklist Generator to create and manage a simple checklist for tasks and workflows. Get a clear, practical result online with AI Tool Engine."
  },
"timestamp-converter": {
    "title": "Timestamp Converter",
    "description": "Timestamp Converter helps you convert timestamps between common date and time representations. Use it to get a clear result quickly without unnecessary setup.",
    "category": "Conversion",
    "seoTitle": "Timestamp Converter - Free Online Tool",
    "seoDesc": "Use Timestamp Converter to convert timestamps between common date and time representations. Get a clear, practical result online with AI Tool Engine."
  },

  "text-to-slug-generator": {
    "title": "Text to Slug Generator",
    "description": "Text to Slug Generator helps you convert text into a clean SEO-friendly URL slug. Use it to get a clear result quickly without unnecessary setup.",
    "category": "SEO",
    "seoTitle": "Text to Slug Generator - Free Online Tool",
    "seoDesc": "Use Text to Slug Generator to convert text into a clean SEO-friendly URL slug. Get a clear, practical result online with AI Tool Engine."
  },
};

export default tools;
