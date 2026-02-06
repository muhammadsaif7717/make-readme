'use client';

import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, GripVertical, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReadme } from '@/providers/ReadmeProvider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function Editor() {
  const { blocks, updateBlock, removeBlock } = useReadme();

  return (
    <div className="min-h-screen w-full overflow-y-auto">
      <div className="mx-auto max-w-5xl p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 border-b pb-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              README Editor
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              আপনার ব্লকের ডাটাগুলো এখানে এডিট করুন
            </p>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {blocks.length} {blocks.length === 1 ? 'Block' : 'Blocks'}
            </span>
          </div>
        </div>

        {/* Blocks Container */}
        <div className="space-y-4 sm:space-y-6">
          {blocks.length === 0 ? (
            <div className="bg-muted/20 rounded-xl border-2 border-dashed p-12 text-center sm:p-20">
              <div className="mx-auto max-w-md">
                <p className="text-muted-foreground mb-2 text-base sm:text-lg">
                  সাইডবার থেকে এলিমেন্ট যোগ করে শুরু করুন
                </p>
                <p className="text-muted-foreground/70 text-xs sm:text-sm">
                  বাম পাশের মেনু থেকে যেকোনো এলিমেন্ট সিলেক্ট করুন
                </p>
              </div>
            </div>
          ) : (
            blocks.map((block) => (
              <BlockEditor
                key={block.id}
                block={block}
                onUpdate={updateBlock}
                onRemove={removeBlock}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Separate component for individual block editing
function BlockEditor({
  block,
  onUpdate,
  onRemove,
}: {
  block: any;
  onUpdate: (id: string, content: string) => void;
  onRemove: (id: string) => void;
}) {
  const [listItems, setListItems] = useState<string[]>(
    block.content ? block.content.split('\n').filter(Boolean) : ['']
  );

  const updateListItems = (items: string[]) => {
    setListItems(items);
    onUpdate(block.id, items.filter(Boolean).join('\n'));
  };

  const addListItem = () => {
    updateListItems([...listItems, '']);
  };

  const removeListItem = (index: number) => {
    const newItems = listItems.filter((_, i) => i !== index);
    updateListItems(newItems.length ? newItems : ['']);
  };

  const updateListItem = (index: number, value: string) => {
    const newItems = [...listItems];
    newItems[index] = value;
    updateListItems(newItems);
  };

  return (
    <Card className="group relative overflow-hidden transition-shadow hover:shadow-md">
      {/* Drag handle */}
      <div className="text-muted-foreground absolute top-1/2 left-2 hidden -translate-y-1/2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing sm:block">
        <GripVertical size={20} />
      </div>

      <CardContent className="p-4 sm:ml-4 sm:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <span className="w-fit rounded bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700 uppercase dark:bg-blue-900/30 dark:text-blue-400">
            {block.type}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/10 h-8 w-8 self-end sm:self-auto"
            onClick={() => onRemove(block.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>

        {/* Dynamic Input Fields */}
        <div className="space-y-4">
          {/* Headings */}
          {(block.type === 'heading' ||
            block.type === 'heading2' ||
            block.type === 'heading3') && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium">
                {block.type === 'heading'
                  ? 'Main Heading (H1)'
                  : block.type === 'heading2'
                    ? 'Sub Heading (H2)'
                    : 'Small Heading (H3)'}
              </Label>
              <Input
                className={`w-full ${
                  block.type === 'heading'
                    ? 'text-2xl font-bold sm:text-3xl'
                    : block.type === 'heading2'
                      ? 'text-xl font-semibold sm:text-2xl'
                      : 'text-lg font-medium sm:text-xl'
                }`}
                value={block.content}
                placeholder="Enter heading text..."
                onChange={(e) => onUpdate(block.id, e.target.value)}
              />
            </div>
          )}

          {/* Text/Description */}
          {(block.type === 'text' || block.type === 'quote') && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium">
                {block.type === 'quote' ? 'Quote Text' : 'Description'}
              </Label>
              <Textarea
                className="min-h-[120px] w-full resize-y"
                value={block.content}
                placeholder={
                  block.type === 'quote'
                    ? 'Enter quote...'
                    : 'Enter description...'
                }
                onChange={(e) => onUpdate(block.id, e.target.value)}
              />
            </div>
          )}

          {/* GitHub Stats */}
          {(block.type === 'stats' ||
            block.type === 'langs' ||
            block.type === 'streak' ||
            block.type === 'trophy' ||
            block.type === 'activity') && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium">GitHub Username</Label>
              <Input
                className="w-full"
                value={block.content}
                placeholder="e.g. mrhidoy"
                onChange={(e) => onUpdate(block.id, e.target.value)}
              />
              <p className="text-muted-foreground text-xs italic">
                এই ইউজারনেমের ওপর ভিত্তি করে কার্ড জেনারেট হবে
              </p>
            </div>
          )}

          {/* Images/Media */}
          {(block.type === 'image' ||
            block.type === 'banner' ||
            block.type === 'gif' ||
            block.type === 'screenshot' ||
            block.type === 'logo') && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Image URL</Label>
              <Input
                className="w-full"
                value={block.content}
                placeholder="https://example.com/image.png"
                onChange={(e) => onUpdate(block.id, e.target.value)}
              />
              {block.content && (
                <div className="mt-2 overflow-hidden rounded-lg border">
                  <img
                    src={block.content}
                    alt="Preview"
                    className="bg-muted h-auto max-h-64 w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Code Block */}
          {(block.type === 'code' ||
            block.type === 'terminal' ||
            block.type === 'inline-code') && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Code Snippet</Label>
              <Textarea
                className="min-h-[150px] w-full bg-zinc-950 font-mono text-sm text-zinc-100 dark:bg-zinc-900"
                value={block.content}
                placeholder="Enter code here..."
                onChange={(e) => onUpdate(block.id, e.target.value)}
              />
            </div>
          )}

          {/* Lists */}
          {(block.type === 'list' ||
            block.type === 'numbered-list' ||
            block.type === 'features') && (
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  {block.type === 'features' ? 'Features' : 'List Items'}
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addListItem}
                  className="h-7 text-xs"
                >
                  <Plus size={14} className="mr-1" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-2">
                {listItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-muted-foreground mt-2 w-6 flex-shrink-0 text-sm">
                      {block.type === 'numbered-list' ? `${index + 1}.` : '•'}
                    </span>
                    <Input
                      className="flex-1"
                      value={item}
                      placeholder={`Item ${index + 1}`}
                      onChange={(e) => updateListItem(index, e.target.value)}
                    />
                    {listItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeListItem(index)}
                        className="h-9 w-9 flex-shrink-0"
                      >
                        <Minus size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Task Checklist */}
          {block.type === 'task' && (
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Task Items</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addListItem}
                  className="h-7 text-xs"
                >
                  <Plus size={14} className="mr-1" />
                  Add Task
                </Button>
              </div>
              <div className="space-y-2">
                {listItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex flex-1 items-center gap-2">
                      <input
                        type="checkbox"
                        className="mt-2 flex-shrink-0"
                        onChange={(e) => {
                          const checked = e.target.checked ? '[x]' : '[ ]';
                          const text = item.replace(/^\[[ x]\]\s*/, '');
                          updateListItem(index, `${checked} ${text}`);
                        }}
                        checked={item.startsWith('[x]')}
                      />
                      <Input
                        className="flex-1"
                        value={item.replace(/^\[[ x]\]\s*/, '')}
                        placeholder={`Task ${index + 1}`}
                        onChange={(e) => {
                          const checked = item.startsWith('[x]')
                            ? '[x]'
                            : '[ ]';
                          updateListItem(index, `${checked} ${e.target.value}`);
                        }}
                      />
                    </div>
                    {listItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeListItem(index)}
                        className="h-9 w-9 flex-shrink-0"
                      >
                        <Minus size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tables */}
          {(block.type === 'table' || block.type === 'comparison') && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium">
                Table Data (Markdown)
              </Label>
              <Textarea
                className="min-h-[150px] w-full font-mono text-sm"
                value={block.content}
                placeholder="| Header 1 | Header 2 |\n|----------|----------|\n| Data 1   | Data 2   |"
                onChange={(e) => onUpdate(block.id, e.target.value)}
              />
              <p className="text-muted-foreground text-xs">
                Markdown table format ব্যবহার করুন
              </p>
            </div>
          )}

          {/* Social/Contact */}
          {(block.type === 'badges' ||
            block.type === 'social' ||
            block.type === 'contact') && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium">
                Links (one per line)
              </Label>
              <Textarea
                className="min-h-[100px] w-full"
                value={block.content}
                placeholder="https://twitter.com/username\nhttps://linkedin.com/in/username"
                onChange={(e) => onUpdate(block.id, e.target.value)}
              />
            </div>
          )}

          {/* Alert/Tip/Warning */}
          {(block.type === 'alert' ||
            block.type === 'tip' ||
            block.type === 'highlight' ||
            block.type === 'callout') && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Message</Label>
              <Textarea
                className="min-h-[100px] w-full"
                value={block.content}
                placeholder="Enter your message..."
                onChange={(e) => onUpdate(block.id, e.target.value)}
              />
            </div>
          )}

          {/* Generic fallback for other types */}
          {![
            'heading',
            'heading2',
            'heading3',
            'text',
            'quote',
            'stats',
            'langs',
            'streak',
            'trophy',
            'activity',
            'image',
            'banner',
            'gif',
            'screenshot',
            'logo',
            'code',
            'terminal',
            'inline-code',
            'list',
            'numbered-list',
            'features',
            'task',
            'table',
            'comparison',
            'badges',
            'social',
            'contact',
            'alert',
            'tip',
            'highlight',
            'callout',
          ].includes(block.type) && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium capitalize">
                {block.type} Content
              </Label>
              <Textarea
                className="min-h-[120px] w-full"
                value={block.content}
                placeholder={`Enter ${block.type} content...`}
                onChange={(e) => onUpdate(block.id, e.target.value)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
