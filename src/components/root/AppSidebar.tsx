'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

import {
  Heading1,
  Heading2,
  Heading3,
  Type,
  Image as ImageIcon,
  Code2,
  List,
  CheckSquare,
  Table as TableIcon,
  Github,
  Link as LinkIcon,
  Quote,
  Sparkles,
  Award,
  Zap,
  Mail,
  ExternalLink,
  FileCode,
  Layers,
  Eye,
  AlertCircle,
  Lightbulb,
  Shield,
  Users,
  Star,
  GitBranch,
  Rocket,
  Package,
  Terminal,
  FolderTree,
  Wrench,
  Video,
  Trophy,
  Heart,
  MessageSquare,
  Globe,
  Cpu,
  Lock,
  BookOpen,
  GraduationCap,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Settings,
  HelpCircle,
  FileText,
  Hash,
} from 'lucide-react';
import { useReadme } from '@/providers/ReadmeProvider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function AppSidebar() {
  const { addBlock, blocks } = useReadme();
  const { setOpen, open, isMobile } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');

  // এলিমেন্টগুলোকে ক্যাটাগরি অনুযায়ী সাজানো হয়েছে
  const elements = [
    {
      group: 'Typography',
      icon: <Type size={14} />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-900',
      items: [
        {
          label: 'Main Heading (H1)',
          type: 'heading',
          icon: <Heading1 size={16} />,
          desc: 'Project title',
          keywords: 'title header h1',
        },
        {
          label: 'Sub Heading (H2)',
          type: 'heading2',
          icon: <Heading2 size={16} />,
          desc: 'Section title',
          keywords: 'subtitle h2 section',
        },
        {
          label: 'Small Heading (H3)',
          type: 'heading3',
          icon: <Heading3 size={16} />,
          desc: 'Subsection',
          keywords: 'h3 subheading',
        },
        {
          label: 'Paragraph',
          type: 'text',
          icon: <Type size={16} />,
          desc: 'Body text',
          keywords: 'text content paragraph description',
        },
        {
          label: 'Blockquote',
          type: 'quote',
          icon: <Quote size={16} />,
          desc: 'Important quote',
          keywords: 'quote citation',
        },
        {
          label: 'Alert/Warning',
          type: 'alert',
          icon: <AlertCircle size={16} />,
          desc: 'Warning message',
          keywords: 'warning alert caution',
        },
        {
          label: 'Tip/Note',
          type: 'tip',
          icon: <Lightbulb size={16} />,
          desc: 'Helpful tip',
          keywords: 'tip note info hint',
        },
        {
          label: 'Highlight Box',
          type: 'highlight',
          icon: <Hash size={16} />,
          desc: 'Important info',
          keywords: 'highlight important notice',
        },
      ],
    },
    {
      group: 'Lists & Tables',
      icon: <List size={14} />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      borderColor: 'border-purple-200 dark:border-purple-900',
      items: [
        {
          label: 'Bullet List',
          type: 'list',
          icon: <List size={16} />,
          desc: 'Unordered list',
          keywords: 'list bullet items',
        },
        {
          label: 'Numbered List',
          type: 'numbered-list',
          icon: <List size={16} />,
          desc: 'Ordered list',
          keywords: 'numbered ordered list steps',
        },
        {
          label: 'Task Checklist',
          type: 'task',
          icon: <CheckSquare size={16} />,
          desc: 'Todo list',
          keywords: 'checklist todo tasks checkbox',
        },
        {
          label: 'Data Table',
          type: 'table',
          icon: <TableIcon size={16} />,
          desc: 'Structured data',
          keywords: 'table data grid',
        },
        {
          label: 'Comparison Table',
          type: 'comparison',
          icon: <TableIcon size={16} />,
          desc: 'Feature compare',
          keywords: 'comparison vs versus',
        },
        {
          label: 'Definition List',
          type: 'definition',
          icon: <BookOpen size={16} />,
          desc: 'Term definitions',
          keywords: 'glossary definitions terms',
        },
      ],
    },
    {
      group: 'Code & Technical',
      icon: <Code2 size={14} />,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-900',
      items: [
        {
          label: 'Code Block',
          type: 'code',
          icon: <Code2 size={16} />,
          desc: 'Multi-line code',
          keywords: 'code snippet programming',
        },
        {
          label: 'Inline Code',
          type: 'inline-code',
          icon: <Terminal size={16} />,
          desc: 'Code in text',
          keywords: 'inline code command',
        },
        {
          label: 'Terminal/Shell',
          type: 'terminal',
          icon: <Terminal size={16} />,
          desc: 'CLI commands',
          keywords: 'terminal shell bash command',
        },
        {
          label: 'File Tree',
          type: 'file-tree',
          icon: <FolderTree size={16} />,
          desc: 'Project structure',
          keywords: 'structure directory folder tree',
        },
        {
          label: 'API Endpoint',
          type: 'api',
          icon: <Cpu size={16} />,
          desc: 'API reference',
          keywords: 'api endpoint rest graphql',
        },
        {
          label: 'Configuration',
          type: 'config',
          icon: <Settings size={16} />,
          desc: 'Config file',
          keywords: 'config configuration settings json yaml',
        },
      ],
    },
    {
      group: 'Media & Assets',
      icon: <ImageIcon size={14} />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      borderColor: 'border-orange-200 dark:border-orange-900',
      items: [
        {
          label: 'Image',
          type: 'image',
          icon: <ImageIcon size={16} />,
          desc: 'Add image',
          keywords: 'image photo picture',
        },
        {
          label: 'Banner/Hero',
          type: 'banner',
          icon: <ImageIcon size={16} />,
          desc: 'Full-width banner',
          keywords: 'banner hero header image cover',
        },
        {
          label: 'GIF Animation',
          type: 'gif',
          icon: <Video size={16} />,
          desc: 'Animated GIF',
          keywords: 'gif animation demo video',
        },
        {
          label: 'Screenshot',
          type: 'screenshot',
          icon: <Eye size={16} />,
          desc: 'App screenshot',
          keywords: 'screenshot preview demo',
        },
        {
          label: 'Logo',
          type: 'logo',
          icon: <Sparkles size={16} />,
          desc: 'Project logo',
          keywords: 'logo brand icon',
        },
        {
          label: 'Video Embed',
          type: 'video',
          icon: <Video size={16} />,
          desc: 'Embed video',
          keywords: 'video youtube demo tutorial',
        },
      ],
    },
    {
      group: 'GitHub & Stats',
      icon: <Github size={14} />,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-950/30',
      borderColor: 'border-pink-200 dark:border-pink-900',
      items: [
        {
          label: 'GitHub Stats',
          type: 'stats',
          icon: <Github size={16} />,
          desc: 'Your stats card',
          keywords: 'github stats profile card',
        },
        {
          label: 'Top Languages',
          type: 'langs',
          icon: <BarChart3 size={16} />,
          desc: 'Language chart',
          keywords: 'languages stats chart graph',
        },
        {
          label: 'Streak Stats',
          type: 'streak',
          icon: <TrendingUp size={16} />,
          desc: 'Contribution streak',
          keywords: 'streak contributions activity',
        },
        {
          label: 'Trophy Showcase',
          type: 'trophy',
          icon: <Trophy size={16} />,
          desc: 'GitHub trophies',
          keywords: 'trophy achievements awards',
        },
        {
          label: 'Profile Views',
          type: 'views',
          icon: <Eye size={16} />,
          desc: 'Visitor counter',
          keywords: 'views visitors counter',
        },
        {
          label: 'Activity Graph',
          type: 'activity',
          icon: <GitBranch size={16} />,
          desc: 'Contribution graph',
          keywords: 'activity contributions graph',
        },
      ],
    },
    {
      group: 'Badges & Links',
      icon: <Award size={14} />,
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
      borderColor: 'border-cyan-200 dark:border-cyan-900',
      items: [
        {
          label: 'Social Badges',
          type: 'badges',
          icon: <LinkIcon size={16} />,
          desc: 'Social links',
          keywords: 'badges social media links',
        },
        {
          label: 'Tech Stack',
          type: 'tech-stack',
          icon: <Package size={16} />,
          desc: 'Technology badges',
          keywords: 'tech stack technologies tools',
        },
        {
          label: 'License Badge',
          type: 'license',
          icon: <Shield size={16} />,
          desc: 'License info',
          keywords: 'license copyright',
        },
        {
          label: 'Build Status',
          type: 'build',
          icon: <Cpu size={16} />,
          desc: 'CI/CD status',
          keywords: 'build status ci cd pipeline',
        },
        {
          label: 'Version Badge',
          type: 'version',
          icon: <Hash size={16} />,
          desc: 'Version number',
          keywords: 'version release tag',
        },
        {
          label: 'Coverage Badge',
          type: 'coverage',
          icon: <PieChart size={16} />,
          desc: 'Test coverage',
          keywords: 'coverage tests quality',
        },
      ],
    },
    {
      group: 'Project Info',
      icon: <Rocket size={14} />,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
      borderColor: 'border-indigo-200 dark:border-indigo-900',
      items: [
        {
          label: 'Features List',
          type: 'features',
          icon: <Zap size={16} />,
          desc: 'Key features',
          keywords: 'features highlights capabilities',
        },
        {
          label: 'Installation',
          type: 'installation',
          icon: <Wrench size={16} />,
          desc: 'Setup guide',
          keywords: 'install setup getting started',
        },
        {
          label: 'Quick Start',
          type: 'quickstart',
          icon: <Rocket size={16} />,
          desc: 'Quick guide',
          keywords: 'quickstart start guide tutorial',
        },
        {
          label: 'Usage Examples',
          type: 'usage',
          icon: <FileCode size={16} />,
          desc: 'How to use',
          keywords: 'usage examples documentation',
        },
        {
          label: 'API Docs',
          type: 'api-docs',
          icon: <BookOpen size={16} />,
          desc: 'API reference',
          keywords: 'api documentation reference',
        },
        {
          label: 'FAQ',
          type: 'faq',
          icon: <HelpCircle size={16} />,
          desc: 'Common questions',
          keywords: 'faq questions help support',
        },
      ],
    },
    {
      group: 'Community & Support',
      icon: <Users size={14} />,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/30',
      borderColor: 'border-rose-200 dark:border-rose-900',
      items: [
        {
          label: 'Contributing',
          type: 'contributing',
          icon: <Users size={16} />,
          desc: 'Contribution guide',
          keywords: 'contributing guidelines community',
        },
        {
          label: 'Code of Conduct',
          type: 'conduct',
          icon: <Heart size={16} />,
          desc: 'Community rules',
          keywords: 'conduct behavior rules community',
        },
        {
          label: 'Support',
          type: 'support',
          icon: <MessageSquare size={16} />,
          desc: 'Get help',
          keywords: 'support help contact assistance',
        },
        {
          label: 'Sponsors',
          type: 'sponsors',
          icon: <Heart size={16} />,
          desc: 'Project sponsors',
          keywords: 'sponsors funding donation',
        },
        {
          label: 'Authors/Credits',
          type: 'authors',
          icon: <Users size={16} />,
          desc: 'Contributors',
          keywords: 'authors credits contributors team',
        },
        {
          label: 'Acknowledgments',
          type: 'acknowledgments',
          icon: <Star size={16} />,
          desc: 'Thank you',
          keywords: 'acknowledgments thanks credits',
        },
      ],
    },
    {
      group: 'Documentation',
      icon: <BookOpen size={14} />,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      borderColor: 'border-amber-200 dark:border-amber-900',
      items: [
        {
          label: 'Demo Link',
          type: 'demo',
          icon: <ExternalLink size={16} />,
          desc: 'Live demo',
          keywords: 'demo live preview',
        },
        {
          label: 'Documentation',
          type: 'docs',
          icon: <FileText size={16} />,
          desc: 'Full docs link',
          keywords: 'documentation docs wiki',
        },
        {
          label: 'Roadmap',
          type: 'roadmap',
          icon: <Target size={16} />,
          desc: 'Future plans',
          keywords: 'roadmap plans future milestones',
        },
        {
          label: 'Changelog',
          type: 'changelog',
          icon: <GitBranch size={16} />,
          desc: 'Version history',
          keywords: 'changelog history updates releases',
        },
        {
          label: 'Security',
          type: 'security',
          icon: <Lock size={16} />,
          desc: 'Security info',
          keywords: 'security vulnerabilities policy',
        },
        {
          label: 'Testing',
          type: 'testing',
          icon: <CheckSquare size={16} />,
          desc: 'Testing info',
          keywords: 'testing tests qa',
        },
      ],
    },
    {
      group: 'Contact & Social',
      icon: <Mail size={14} />,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      borderColor: 'border-emerald-200 dark:border-emerald-900',
      items: [
        {
          label: 'Contact Info',
          type: 'contact',
          icon: <Mail size={16} />,
          desc: 'Email/contact',
          keywords: 'contact email reach',
        },
        {
          label: 'Social Links',
          type: 'social',
          icon: <Globe size={16} />,
          desc: 'Social profiles',
          keywords: 'social media links profiles',
        },
        {
          label: 'Website',
          type: 'website',
          icon: <Globe size={16} />,
          desc: 'Project website',
          keywords: 'website homepage url',
        },
        {
          label: 'Discord/Slack',
          type: 'chat',
          icon: <MessageSquare size={16} />,
          desc: 'Chat community',
          keywords: 'discord slack chat community',
        },
        {
          label: 'Newsletter',
          type: 'newsletter',
          icon: <Mail size={16} />,
          desc: 'Subscribe',
          keywords: 'newsletter subscribe updates',
        },
      ],
    },
    {
      group: 'Achievements',
      icon: <Trophy size={14} />,
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-50 dark:bg-violet-950/30',
      borderColor: 'border-violet-200 dark:border-violet-900',
      items: [
        {
          label: 'Achievements',
          type: 'achievements',
          icon: <Trophy size={16} />,
          desc: 'Awards/badges',
          keywords: 'achievements awards recognition',
        },
        {
          label: 'Metrics',
          type: 'metrics',
          icon: <BarChart3 size={16} />,
          desc: 'Project metrics',
          keywords: 'metrics statistics analytics',
        },
        {
          label: 'Testimonials',
          type: 'testimonials',
          icon: <Quote size={16} />,
          desc: 'User reviews',
          keywords: 'testimonials reviews feedback',
        },
        {
          label: 'Case Studies',
          type: 'casestudy',
          icon: <GraduationCap size={16} />,
          desc: 'Use cases',
          keywords: 'case study examples uses',
        },
      ],
    },
    {
      group: 'Structure & Layout',
      icon: <Layers size={14} />,
      color: 'text-slate-600 dark:text-slate-400',
      bgColor: 'bg-slate-50 dark:bg-slate-950/30',
      borderColor: 'border-slate-200 dark:border-slate-900',
      items: [
        {
          label: 'Horizontal Rule',
          type: 'divider',
          icon: <Layers size={16} />,
          desc: 'Section break',
          keywords: 'divider separator line break',
        },
        {
          label: 'Collapsible',
          type: 'details',
          icon: <Eye size={16} />,
          desc: 'Expandable',
          keywords: 'collapsible dropdown expand details',
        },
        {
          label: 'Two Column',
          type: 'columns',
          icon: <Layers size={16} />,
          desc: 'Side by side',
          keywords: 'columns layout grid',
        },
        {
          label: 'Callout Box',
          type: 'callout',
          icon: <AlertCircle size={16} />,
          desc: 'Attention box',
          keywords: 'callout box notice',
        },
      ],
    },
  ];

  // Handle button click and close sidebar (especially on mobile)
  const handleBlockAdd = (type: string) => {
    addBlock(type);

    // Close sidebar on mobile with a small delay
    if (isMobile) {
      setTimeout(() => {
        setOpen(false);
      }, 150); // 150ms delay (adjust as needed)
    }
  };

  // Filter elements based on search
  const filteredElements = elements
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.label.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.keywords.toLowerCase().includes(query)
        );
      }),
    }))
    .filter((section) => section.items.length > 0);

  const totalBlocks = elements.reduce(
    (acc, section) => acc + section.items.length,
    0
  );

  return (
    <Sidebar className="mt-17 flex h-screen flex-col border-r bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-zinc-900/50 dark:via-zinc-950 dark:to-zinc-900/50">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <SidebarContent className="px-2 py-4">
            {filteredElements.length === 0 ? (
              <div className="text-muted-foreground p-8 text-center">
                <p className="text-sm">No elements found</p>
                <p className="mt-1 text-xs">Try a different search</p>
              </div>
            ) : (
              filteredElements.map((section) => (
                <SidebarGroup key={section.group} className="mb-2">
                  <SidebarGroupLabel
                    className={`to-muted/30 mb-2 flex items-center gap-2 rounded-lg border-l-2 bg-gradient-to-r from-transparent px-2 py-2 ${section.borderColor}`}
                  >
                    <span
                      className={`${section.color} p-1 ${section.bgColor} rounded-md`}
                    >
                      {section.icon}
                    </span>
                    <span className="text-foreground flex-1 text-xs font-bold tracking-wider uppercase">
                      {section.group}
                    </span>
                    <span className="text-muted-foreground bg-muted rounded px-1.5 py-0.5 text-xs">
                      {section.items.length}
                    </span>
                  </SidebarGroupLabel>
                  <SidebarGroupContent className="flex flex-col gap-0.5">
                    {section.items.map((item) => (
                      <Button
                        key={item.type}
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start gap-3 px-3 py-6 hover:bg-gradient-to-r ${
                          section.group === 'Typography'
                            ? 'hover:from-blue-50 hover:to-blue-50/50 dark:hover:from-blue-950/30 dark:hover:to-blue-950/20'
                            : section.group === 'Lists & Tables'
                              ? 'hover:from-purple-50 hover:to-purple-50/50 dark:hover:from-purple-950/30 dark:hover:to-purple-950/20'
                              : section.group === 'Code & Technical'
                                ? 'hover:from-green-50 hover:to-green-50/50 dark:hover:from-green-950/30 dark:hover:to-green-950/20'
                                : section.group === 'Media & Assets'
                                  ? 'hover:from-orange-50 hover:to-orange-50/50 dark:hover:from-orange-950/30 dark:hover:to-orange-950/20'
                                  : section.group === 'GitHub & Stats'
                                    ? 'hover:from-pink-50 hover:to-pink-50/50 dark:hover:from-pink-950/30 dark:hover:to-pink-950/20'
                                    : section.group === 'Badges & Links'
                                      ? 'hover:from-cyan-50 hover:to-cyan-50/50 dark:hover:from-cyan-950/30 dark:hover:to-cyan-950/20'
                                      : section.group === 'Project Info'
                                        ? 'hover:from-indigo-50 hover:to-indigo-50/50 dark:hover:from-indigo-950/30 dark:hover:to-indigo-950/20'
                                        : section.group ===
                                            'Community & Support'
                                          ? 'hover:from-rose-50 hover:to-rose-50/50 dark:hover:from-rose-950/30 dark:hover:to-rose-950/20'
                                          : section.group === 'Documentation'
                                            ? 'hover:from-amber-50 hover:to-amber-50/50 dark:hover:from-amber-950/30 dark:hover:to-amber-950/20'
                                            : section.group ===
                                                'Contact & Social'
                                              ? 'hover:from-emerald-50 hover:to-emerald-50/50 dark:hover:from-emerald-950/30 dark:hover:to-emerald-950/20'
                                              : section.group === 'Achievements'
                                                ? 'hover:from-violet-50 hover:to-violet-50/50 dark:hover:from-violet-950/30 dark:hover:to-violet-950/20'
                                                : 'hover:from-slate-50 hover:to-slate-50/50 dark:hover:from-slate-950/30 dark:hover:to-slate-950/20'
                        } group rounded-lg border border-transparent transition-all duration-200 hover:shadow-sm`}
                        onClick={() => handleBlockAdd(item.type)}
                      >
                        <span
                          className={`${section.color} p-1.5 transition-transform group-hover:scale-110 ${section.bgColor} rounded-md`}
                        >
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1 text-left">
                          <div className="text-foreground truncate text-xs font-semibold">
                            {item.label}
                          </div>
                          <div className="text-muted-foreground truncate text-[10px]">
                            {item.desc}
                          </div>
                        </div>
                        <span className="text-muted-foreground text-xs font-bold opacity-0 transition-opacity group-hover:opacity-100">
                          +
                        </span>
                      </Button>
                    ))}
                  </SidebarGroupContent>
                </SidebarGroup>
              ))
            )}
          </SidebarContent>
        </ScrollArea>
      </div>
    </Sidebar>
  );
}
