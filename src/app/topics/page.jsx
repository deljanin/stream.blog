import { createClient } from 'contentful';
import CollapsibleTopic from '@/components/ui/collapsible-topic';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});
export default async function Topics() {
  let topics = [];
  try {
    const res = await client.getEntries({
      content_type: 'topic',
    });
    topics = res.items;
    topics.sort(
      (a, b) => new Date(a.sys.createdAt) - new Date(b.sys.createdAt)
    );
  } catch (err) {
    console.error(err);
    topics = []; // Fallback in case of error
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-sonoma p-10">Topics</h1>
      {topics.map((topic, index) => (
        <CollapsibleTopic
          key={topic.sys.id}
          topic={topic}
          initialAnimationDelay={index * 0.4}
        />
      ))}
    </div>
  );
}
