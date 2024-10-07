import Image from 'next/image';
import Link from 'next/link';
import { createClient } from 'contentful';
import trimString from '@/lib/trimString';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export default async function Home() {
  let latestPosts = [];
  try {
    const res = await client.getEntries({
      content_type: 'post',
    });
    latestPosts = res.items;
    latestPosts.sort(
      (a, b) => new Date(a.sys.createdAt) - new Date(b.sys.createdAt)
    );
    latestPosts = latestPosts.slice(0, 5);
  } catch (err) {
    console.error(err);
    latestPosts = []; // Fallback in case of error
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-sonoma p-10">Latest posts</h1>
      <div className="flex flex-wrap justify-center gap-4 align-center w-full h-full">
        {latestPosts.map((post, index) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
}
