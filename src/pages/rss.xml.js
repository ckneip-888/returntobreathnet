import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: 'Return to Breath',
    description:
      'Foundational essays on breath, coherence, and the practice of return. By Christoph Kneip.',
    site: context.site ?? 'https://returntobreath.net',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/en/writing/${post.id}/`,
      author: 'Christoph Kneip',
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
