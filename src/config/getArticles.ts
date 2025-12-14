import { backendLink, token, envName } from './api.ts';

interface Article {
  title: string;
  dateString: string;
  image: string;
  tags: string[];
  author: string;
}

async function getArticles(fetchEndpoint: string) {
  let articles: Article[] = [];
  try {
    const res = await fetch(fetchEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Let Next.js cache and revalidate this fetch every 60 seconds
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      articles = data.data.map((item: any) => {
        const dateString = item.date.slice(5) + '-' + item.date.slice(2, 4);

        const image =
          envName === 'cloud'
            ? item.image.formats.medium.url
            : backendLink + item.image.formats.medium.url;

        const tagsArray =
          item.tags != null
            ? item.tags.split(',').map((tag: string) => tag.trim())
            : [];

        return {
          title: item.title,
          dateString,
          image,
          tags: tagsArray,
          author: item.author.name,
        };
      });
    } else {
      console.error('Articles res error');
    }
  } catch (error) {
    console.error(error);
  }
  return articles;
}

export { getArticles };