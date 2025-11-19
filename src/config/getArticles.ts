import { backendLink, token, envName } from './api.ts';

interface Article {
  title: string;
  dateString: string;
  image: string;
  tags: any; 
  author: string;
}

async function getArticles(fetchEndpoint: string) {
    let articles: Article[] = [];
    try {
        const res = await fetch(fetchEndpoint, { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
            const data = await res.json();
            articles = data.data.map((item: any) => {
                let dateString = item.date.slice(5) + "-" + item.date.slice(2, 4);
                let image;
                if (envName === 'cloud') {
                    image = item.image.formats.medium.url;
                } else {
                    image = backendLink + item.image.formats.medium.url;
                }
                let tagsArray: string[] = [];
                if (item.tags != null) {
                    tagsArray = item.tags.split(",").map((tag: string) => tag.trim());
                }
                return {
                    title: item.title,
                    dateString: dateString,
                    image: image,
                    tags: tagsArray,
                    author: item.author.name
                };
            });
        } else {
            console.log('Articles res error');
        }
    } catch (error) {
        console.log(error);
    }
    return articles;
}

export { getArticles };