'use client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchDialog({ topics }) {
  console.log('Hellol');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const postsByTopic = topics.reduce((acc, topic) => {
    const topicTitle = topic.fields.title;

    // Initialize the topic in the accumulator if it doesn't exist
    if (!acc[topicTitle]) {
      acc[topicTitle] = [];
    }

    // If the topic has posts, spread the posts into the corresponding topic group
    if (topic.fields.posts) {
      acc[topicTitle].push(...topic.fields.posts);
    }

    return acc;
  }, {});

  // Output grouped posts by topic
  console.log(postsByTopic);

  const handleKeyDown = (event, url) => {
    if (event.key === 'Enter') {
      setOpen(false);
      router.push(url);
    }
  };

  return (
    <div className="w-full flex flex-auto relative">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full outline-none">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="cursor-pointer w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Search</DialogTitle>
          <Command>
            <CommandInput placeholder="Search for posts" />
            <CommandList>
              <CommandEmpty>No posts found.</CommandEmpty>
              {Object.entries(postsByTopic).map(([threadTitle, posts]) => (
                <div key={threadTitle}>
                  <CommandGroup heading={threadTitle}>
                    {posts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/posts/${post.fields.slug}`}
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                        onKeyDown={(e) =>
                          handleKeyDown(e, `/posts/${post.fields.slug}`)
                        }>
                        <CommandItem>{post.fields.title}</CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </div>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}
