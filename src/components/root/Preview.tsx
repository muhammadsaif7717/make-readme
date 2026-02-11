'use client';

import { useReadme } from '@/providers/ReadmeProvider';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Copy, Download, Eye, Code, RefreshCw, Github } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import rehypeRaw from 'rehype-raw';

export default function Preview() {
  const { blocks } = useReadme();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'markdown'>('preview');

  // Enhanced Markdown Generation with support for all element types
  const generateMarkdown = () => {
    return blocks
      .map((block) => {
        const content = block.content.trim();

        // Skip empty blocks except for certain types that generate their own content
        if (
          !content &&
          ![
            'stats',
            'langs',
            'streak',
            'trophy',
            'views',
            'activity',
            'divider',
          ].includes(block.type)
        ) {
          return '';
        }

        switch (block.type) {
          // Typography
          case 'heading':
            return `# ${content}`;
          case 'heading2':
            return `## ${content}`;
          case 'heading3':
            return `### ${content}`;
          case 'text':
            return content;
          case 'quote':
            return `> ${content}`;
          case 'alert':
            return `> [!WARNING]\n> ${content}`;
          case 'tip':
            return `> [!TIP]\n> ${content}`;
          case 'highlight':
            return `> [!IMPORTANT]\n> ${content}`;

          // Lists & Tables
          case 'list':
            return content
              .split('\n')
              .filter(Boolean)
              .map((l) => `- ${l}`)
              .join('\n');
          case 'numbered-list':
            return content
              .split('\n')
              .filter(Boolean)
              .map((l, i) => `${i + 1}. ${l}`)
              .join('\n');
          case 'task':
            return content
              .split('\n')
              .filter(Boolean)
              .map((l) => {
                if (l.startsWith('[x]') || l.startsWith('[ ]')) {
                  return `- ${l}`;
                }
                return `- [ ] ${l}`;
              })
              .join('\n');
          case 'table':
          case 'comparison':
            return content;
          case 'definition':
            return content
              .split('\n')
              .filter(Boolean)
              .map((l) => {
                const [term, def] = l.split(':');
                return `**${term?.trim() || ''}**: ${def?.trim() || ''}`;
              })
              .join('\n\n');

          // Code & Technical
          case 'code':
            return `\`\`\`\n${content}\n\`\`\``;
          case 'inline-code':
            return `\`${content}\``;
          case 'terminal':
            return `\`\`\`bash\n${content}\n\`\`\``;
          case 'file-tree':
            return `\`\`\`\n${content}\n\`\`\``;
          case 'api':
            return `### API Endpoint\n\`\`\`\n${content}\n\`\`\``;
          case 'config':
            return `\`\`\`json\n${content}\n\`\`\``;

          // Media & Assets
          case 'image':
            return `![Image](${content})`;
          case 'banner':
            return `![Banner](${content})`;
          case 'gif':
            return `![Demo](${content})`;
          case 'screenshot':
            return `![Screenshot](${content})`;
          case 'logo':
            return `<p align="center">\n  <img src="${content}" alt="Logo" width="200"/>\n</p>`;
          case 'video':
            return `[![Video](${content})](${content})`;

          // GitHub & Stats
          case 'stats':
            return `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${content}&show_icons=true&theme=radical)`;
          case 'langs':
            return `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${content}&layout=compact&theme=radical)`;
          case 'streak':
            return `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${content}&theme=radical)`;
          case 'trophy':
            return `![Trophy](https://github-profile-trophy.vercel.app/?username=${content}&theme=radical&no-frame=true&no-bg=true&row=1&column=7)`;
          case 'views':
            return `![Profile Views](https://komarev.com/ghpvc/?username=${content}&color=blue&style=flat-square)`;
          case 'activity':
            return `![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${content}&theme=react-dark)`;

          // Badges & Links
          case 'badges':
          case 'social':
            return content.split('\n').filter(Boolean).join(' ');
          case 'tech-stack':
            return `### 🛠️ Tech Stack\n\n${content}`;
          case 'license':
            return `![License](https://img.shields.io/badge/license-${content}-blue.svg)`;
          case 'build':
            return `![Build Status](https://img.shields.io/badge/build-${content}-brightgreen.svg)`;
          case 'version':
            return `![Version](https://img.shields.io/badge/version-${content}-blue.svg)`;
          case 'coverage':
            return `![Coverage](https://img.shields.io/badge/coverage-${content}%25-brightgreen.svg)`;

          // Project Info
          case 'features':
            return `## ✨ Features\n\n${content
              .split('\n')
              .filter(Boolean)
              .map((l) => `- ${l}`)
              .join('\n')}`;
          case 'installation':
            return `## 📦 Installation\n\n\`\`\`bash\n${content}\n\`\`\``;
          case 'quickstart':
            return `## 🚀 Quick Start\n\n${content}`;
          case 'usage':
            return `## 💻 Usage\n\n${content}`;
          case 'api-docs':
            return `## 📚 API Documentation\n\n${content}`;
          case 'faq':
            return `## ❓ FAQ\n\n${content}`;

          // Community & Support
          case 'contributing':
            return `## 🤝 Contributing\n\n${content}`;
          case 'conduct':
            return `## 📜 Code of Conduct\n\n${content}`;
          case 'support':
            return `## 💬 Support\n\n${content}`;
          case 'sponsors':
            return `## ❤️ Sponsors\n\n${content}`;
          case 'authors':
            return `## 👥 Authors\n\n${content}`;
          case 'acknowledgments':
            return `## 🙏 Acknowledgments\n\n${content}`;

          // Documentation
          case 'demo':
            return `## 🎯 Demo\n\n[Live Demo](${content})`;
          case 'docs':
            return `## 📖 Documentation\n\n[Full Documentation](${content})`;
          case 'roadmap':
            return `## 🗺️ Roadmap\n\n${content}`;
          case 'changelog':
            return `## 📝 Changelog\n\n${content}`;
          case 'security':
            return `## 🔒 Security\n\n${content}`;
          case 'testing':
            return `## 🧪 Testing\n\n${content}`;

          // Contact & Social
          case 'contact':
            return `## 📧 Contact\n\n${content}`;
          case 'website':
            return `🌐 **Website**: ${content}`;
          case 'chat':
            return `💬 **Join our community**: ${content}`;
          case 'newsletter':
            return `📬 **Newsletter**: ${content}`;

          // Achievements
          case 'achievements':
            return `## 🏆 Achievements\n\n${content}`;
          case 'metrics':
            return `## 📊 Metrics\n\n${content}`;
          case 'testimonials':
            return `## 💭 Testimonials\n\n${content}`;
          case 'casestudy':
            return `## 📖 Case Studies\n\n${content}`;

          // Structure & Layout
          case 'divider':
            return `---`;
          case 'details':
            return `<details>\n<summary>Click to expand</summary>\n\n${content}\n\n</details>`;
          case 'columns':
            const [col1, col2] = content.split('|||');
            return `<table>\n<tr>\n<td width="50%">\n\n${col1?.trim() || ''}\n\n</td>\n<td width="50%">\n\n${col2?.trim() || ''}\n\n</td>\n</tr>\n</table>`;
          case 'callout':
            return `> [!NOTE]\n> ${content}`;

          default:
            return content;
        }
      })
      .filter(Boolean)
      .join('\n\n');
  };

  const finalMarkdown = generateMarkdown();

  // Copy to Clipboard with feedback
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(finalMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy. Please try again.');
    }
  };

  // Download as README.md
  const downloadFile = () => {
    const blob = new Blob([finalMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full w-full flex-col border-l border-gray-200 bg-white dark:border-[#30363d] dark:bg-[#0d1117]">
      {/* GitHub-style Header */}
      <div className="sticky top-0 z-10 shrink-0 border-b border-gray-200 bg-white dark:border-[#30363d] dark:bg-[#0d1117]">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-gray-100 p-2 dark:bg-[#21262d]">
                <Github
                  size={20}
                  className="text-gray-700 dark:text-gray-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-100">
                  README.md
                </h2>
                <p className="mt-0.5 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  GitHub-style preview
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex-1 border-gray-300 hover:bg-gray-100 sm:flex-none dark:border-[#30363d] dark:hover:bg-[#21262d]"
                disabled={blocks.length === 0}
              >
                {copied ? (
                  <>
                    <RefreshCw size={14} className="mr-2 animate-spin" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} className="mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                size="sm"
                onClick={downloadFile}
                className="flex-1 bg-[#2da44e] text-white hover:bg-[#2c974b] sm:flex-none"
                disabled={blocks.length === 0}
              >
                <Download size={14} className="mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* View Toggle Tabs */}
          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as any)}
            className="mt-4"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 sm:w-auto dark:bg-[#21262d]">
              <TabsTrigger
                value="preview"
                className="text-xs data-[state=active]:bg-white sm:text-sm dark:data-[state=active]:bg-[#0d1117]"
              >
                <Eye size={14} className="mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="markdown"
                className="text-xs data-[state=active]:bg-white sm:text-sm dark:data-[state=active]:bg-[#0d1117]"
              >
                <Code size={14} className="mr-2" />
                Code
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-[1012px] p-4 sm:p-8 md:p-12">
            {blocks.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 dark:border-[#30363d] dark:bg-[#161b22] dark:text-gray-400">
                <Eye size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium sm:text-base">
                  This README file is still empty
                </p>
                <p className="mt-1 text-xs opacity-70 sm:text-sm">
                  Add elements from the sidebar
                </p>
              </div>

            ) : (
              <Tabs value={viewMode} className="w-full">
                {/* GitHub-Authentic Preview Mode */}
                <TabsContent value="preview" className="mt-0">
                  <div className="markdown-body">
                    <style jsx global>{`
                      .markdown-body {
                        font-family:
                          -apple-system, BlinkMacSystemFont, 'Segoe UI',
                          'Noto Sans', Helvetica, Arial, sans-serif,
                          'Apple Color Emoji', 'Segoe UI Emoji';
                        font-size: 16px;
                        line-height: 1.6;
                        word-wrap: break-word;
                        color: #24292f;
                      }

                      .dark .markdown-body {
                        color: #c9d1d9;
                      }

                      .markdown-body h1 {
                        font-size: 2em;
                        font-weight: 600;
                        padding-bottom: 0.3em;
                        border-bottom: 1px solid #d0d7de;
                        margin-top: 24px;
                        margin-bottom: 16px;
                      }

                      .dark .markdown-body h1 {
                        border-bottom-color: #21262d;
                      }

                      .markdown-body h2 {
                        font-size: 1.5em;
                        font-weight: 600;
                        padding-bottom: 0.3em;
                        border-bottom: 1px solid #d0d7de;
                        margin-top: 24px;
                        margin-bottom: 16px;
                      }

                      .dark .markdown-body h2 {
                        border-bottom-color: #21262d;
                      }

                      .markdown-body h3 {
                        font-size: 1.25em;
                        font-weight: 600;
                        margin-top: 24px;
                        margin-bottom: 16px;
                      }

                      .markdown-body h4 {
                        font-size: 1em;
                        font-weight: 600;
                        margin-top: 24px;
                        margin-bottom: 16px;
                      }

                      .markdown-body p {
                        margin-top: 0;
                        margin-bottom: 16px;
                      }

                      .markdown-body a {
                        color: #0969da;
                        text-decoration: none;
                      }

                      .dark .markdown-body a {
                        color: #58a6ff;
                      }

                      .markdown-body a:hover {
                        text-decoration: underline;
                      }

                      .markdown-body code {
                        padding: 0.2em 0.4em;
                        margin: 0;
                        font-size: 85%;
                        background-color: rgba(175, 184, 193, 0.2);
                        border-radius: 6px;
                        font-family:
                          ui-monospace,
                          SFMono-Regular,
                          SF Mono,
                          Menlo,
                          Consolas,
                          Liberation Mono,
                          monospace;
                      }

                      .dark .markdown-body code {
                        background-color: rgba(110, 118, 129, 0.4);
                      }

                      .markdown-body pre {
                        padding: 16px;
                        overflow: auto;
                        font-size: 85%;
                        line-height: 1.45;
                        background-color: #f6f8fa;
                        border-radius: 6px;
                        margin-top: 0;
                        margin-bottom: 16px;
                      }

                      .dark .markdown-body pre {
                        background-color: #161b22;
                      }

                      .markdown-body pre code {
                        background-color: transparent;
                        border: 0;
                        display: inline;
                        line-height: inherit;
                        margin: 0;
                        overflow: visible;
                        padding: 0;
                        word-wrap: normal;
                      }

                      .markdown-body blockquote {
                        padding: 0 1em;
                        color: #57606a;
                        border-left: 0.25em solid #d0d7de;
                        margin-top: 0;
                        margin-bottom: 16px;
                      }

                      .dark .markdown-body blockquote {
                        color: #8b949e;
                        border-left-color: #3b434b;
                      }

                      .markdown-body ul,
                      .markdown-body ol {
                        padding-left: 2em;
                        margin-top: 0;
                        margin-bottom: 16px;
                      }

                      .markdown-body li {
                        margin-top: 0.25em;
                      }

                      .markdown-body li + li {
                        margin-top: 0.25em;
                      }

                      .markdown-body table {
                        border-spacing: 0;
                        border-collapse: collapse;
                        display: block;
                        width: max-content;
                        max-width: 100%;
                        overflow: auto;
                        margin-top: 0;
                        margin-bottom: 16px;
                      }

                      .markdown-body table tr {
                        background-color: #ffffff;
                        border-top: 1px solid hsla(210, 18%, 87%, 1);
                      }

                      .dark .markdown-body table tr {
                        background-color: #0d1117;
                        border-top-color: #21262d;
                      }

                      .markdown-body table tr:nth-child(2n) {
                        background-color: #f6f8fa;
                      }

                      .dark .markdown-body table tr:nth-child(2n) {
                        background-color: #161b22;
                      }

                      .markdown-body table th,
                      .markdown-body table td {
                        padding: 6px 13px;
                        border: 1px solid #d0d7de;
                      }

                      .dark .markdown-body table th,
                      .dark .markdown-body table td {
                        border-color: #3b434b;
                      }

                      .markdown-body table th {
                        font-weight: 600;
                        background-color: #f6f8fa;
                      }

                      .dark .markdown-body table th {
                        background-color: #161b22;
                      }

                      .markdown-body img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 6px;
                        margin-top: 16px;
                        margin-bottom: 16px;
                      }

                      .markdown-body hr {
                        height: 0.25em;
                        padding: 0;
                        margin: 24px 0;
                        background-color: #d0d7de;
                        border: 0;
                      }

                      .dark .markdown-body hr {
                        background-color: #21262d;
                      }

                      .markdown-body input[type='checkbox'] {
                        margin-right: 0.5em;
                      }

                      .markdown-body details {
                        margin-bottom: 16px;
                      }

                      .markdown-body summary {
                        cursor: pointer;
                        font-weight: 600;
                      }
                    `}</style>

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {finalMarkdown}
                    </ReactMarkdown>
                  </div>
                </TabsContent>

                {/* Markdown Code Mode */}
                <TabsContent value="markdown" className="mt-0">
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-[#f6f8fa] p-4 font-mono text-xs leading-relaxed text-gray-900 sm:p-6 sm:text-sm dark:border-[#30363d] dark:bg-[#161b22] dark:text-gray-100">
                      <code>{finalMarkdown || '# Empty README'}</code>
                    </pre>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={copyToClipboard}
                      className="absolute top-2 right-2 border-gray-300 bg-white text-xs dark:border-[#30363d] dark:bg-[#21262d]"
                    >
                      {copied ? 'Copied!' : 'Copy Code'}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>

          {/* GitHub-style Stats Footer */}
          {blocks.length > 0 && (
            <div className="mx-auto max-w-[1012px] px-4 pb-6 sm:px-8 md:px-12">
              <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-600 dark:border-[#30363d] dark:bg-[#161b22] dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {blocks.length}
                  </span>{' '}
                  blocks
                </span>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {finalMarkdown.split('\n').length}
                  </span>{' '}
                  lines
                </span>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {finalMarkdown.length}
                  </span>{' '}
                  characters
                </span>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
