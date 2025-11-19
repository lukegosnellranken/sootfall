import AuthorComponent from '../../../components/author-component/AuthorComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';
import { getArticles } from '../../../config/getArticles.ts';

// This function tells Next.js which author pages to build at export time
export async function generateStaticParams() {
  try {
    // Fetch the list of all authors from your API
    const res = await fetch(`${backendLink}/api/authors?populate=*`, {headers: {'Authorization': `Bearer ${token}`}});
    const authors = await res.json();
   
    // Return an array of objects, where each object has an `authorName` property
    // This should match the name of your dynamic segment folder: [authorName]
    return authors.data.map((author: any) => ({
      authorName: encodeURIComponent(author.name.toLowerCase()),
    }));
  } catch (error) {
    console.error('Failed to fetch authors:', error);
    return [];
  }
}

// Fetches a single author by its slug
async function getAuthor(authorName: string) {
    // Fetch the specific author from your API using a filter on the slug
    const res = await fetch(`${backendLink}/api/authors?filters[name][$eqi]=${authorName}&populate=*`, {
        headers: {'Authorization': `Bearer ${token}`}
    });
    const authors = await res.json();

    // If no author is found, return null
    if (!authors.data || authors.data.length === 0) {
        return null;
    }

    return authors.data[0];
}

type Props = {
    params: Promise<{ authorName: string }>;
};

async function Author({ params }: Props) {
    const { authorName } = await params;
    const decodedAuthorName = decodeURIComponent(authorName);
    const author = await getAuthor(decodedAuthorName);

    // If no author is found, render the 404 page
    if (!author) {
        notFound();
    }

    // If author exists, fetch all articles written by the author
    const fetchEndpoint = `${backendLink}/api/articles?filters[author][name][$eqi]=${decodedAuthorName}&populate=*&sort=date:desc`;
    const articles = await getArticles(fetchEndpoint);

    return(
        <div id='div-author-component'>
            {/* Pass the full author object to your component */}
            <AuthorComponent author={author} articles={articles} />
        </div>
    );
}

export default Author;
