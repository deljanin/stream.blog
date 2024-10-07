import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

// This generates the paths (slugs) at build time
export async function generateStaticParams() {
  const res = await client.getEntries({
    content_type: 'post',
  });

  return res.items.map((item) => ({
    slug: item.fields.slug,
  }));
}

// This component fetches and displays the blog post
export default async function Post({ params }) {
  const { slug } = params;

  let post = {};
  try {
    const res = await client.getEntries({
      content_type: 'post',
      'fields.slug': slug, // Fetching the specific post by slug
    });
    post = res.items[0];
  } catch (err) {
    console.error(err);
    post = null; // Fallback in case of error
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-sonoma p-10">{post.fields.title}</h1>
      <div className="prose dark:prose-invert xl:w-2/3 w-full px-5">
        {documentToReactComponents(post.fields.content)}
      </div>
      {/* Adjust field names based on your Contentful model */}
    </div>
  );
}
