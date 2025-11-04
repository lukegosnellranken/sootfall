import AuthorComponent from '../../../components/author-component/AuthorComponent.js';
import { notFound } from 'next/navigation.js';

// Centralized API configuration
const env = process.env.NEXT_PUBLIC_ENV;
let backendLink: string;
let token: string;

if (env === 'local') {
    backendLink = process.env.NEXT_PUBLIC_API_URL_LOCAL || '';
    token = process.env.NEXT_PUBLIC_API_TOKEN_LOCAL || '';
} else if (env === 'cloud') {
    backendLink = process.env.NEXT_PUBLIC_API_URL_CLOUD || '';
    token = process.env.NEXT_PUBLIC_API_TOKEN_CLOUD || '';
} else {
    throw new Error("NEXT_PUBLIC_ENV is not set or invalid. Check your .env file.");
}

if (!backendLink || !token) {
    throw new Error("API URL or Token is not configured. Check your .env file.");
}

// This function tells Next.js which author pages to build at export time
export async function generateStaticParams() {
  try {
    // Fetch the list of all authors from your API
    const res = await fetch(`${backendLink}/api/authors?populate=*`, {headers: {'Authorization': `Bearer ${token}`}});
    const authors = await res.json();
    console.log('Authors data:', JSON.stringify(authors, null, 2));
   
    // Return an array of objects, where each object has an `authorName` property
    // This should match the name of your dynamic segment folder: [authorName]
    return authors.data.map((author: any) => ({
      authorName: author.slug,
    }));
  } catch (error) {
    console.error('Failed to fetch authors:', error);
    return [];
  }
}

// Fetches a single author by its slug
async function getAuthor(authorName: string) {
    // Fetch the specific author from your API using a filter on the slug
    const res = await fetch(`${backendLink}/api/authors?filters[slug][$eq]=${authorName}&populate=*`, {
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
    const author = await getAuthor(authorName);

    // If no author is found, render the 404 page
    if (!author) {
        notFound();
    }

    return(
        <div id='div-author-component'>
            {/* Pass the full author object to your component */}
            <AuthorComponent author={author} />
        </div>
    );
}

export default Author;
