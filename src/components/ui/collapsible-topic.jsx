'use client';

import { ChevronsUpDown, ChevronsDownUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import trimString from '@/lib/trimString';
import Image from 'next/image';

export default function CollapsibleTopic({ topic, initialAnimationDelay = 0 }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpenChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Collapsible
      open={isOpen}
      key={topic.sys.id}
      onOpenChange={handleOpenChange}
      id={topic.fields.slug}
      className="xl:w-3/4 p-4 space-y-2 xl:mx-auto">
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex justify-between mb-2">
            <h4 className="text-md font-semibold">{topic.fields.title}</h4>
            {isOpen ? (
              <ChevronsDownUp className="h-4 w-4" />
            ) : (
              <ChevronsUpDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex flex-wrap gap-3">
        {topic.fields.posts?.length > 0 ? (
          topic.fields.posts.map((post, index) => (
            <div
              key={post.sys.id}
              className="max-w-[430px] mx-3 sm:mx-0 opacity-0 animate-slide-in-right"
              style={{
                '--custom-delay': 0.2 * index + 's',
              }}>
              <Link href={`/posts/${post.fields.slug}`}>
                <Card className=" flex flex-col sm:aspect-square overflow-hidden p-2 hover:scale-105 transition-all hover:border-primary">
                  <CardHeader>
                    <Image
                      alt={post.fields.title}
                      src={'https:' + post.fields.thumbnail.fields.file.url}
                      width={500}
                      height={300}
                    />
                    <h1 className="text-2xl font-sonoma">
                      {post.fields.title}
                    </h1>
                  </CardHeader>
                  <CardContent>
                    <p className="text-wrap ">
                      {trimString(post.fields.description, 195)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))
        ) : (
          <p className="w-full px-8 sm:mx-0 opacity-0 animate-slide-in-right">
            No posts yet...
          </p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
