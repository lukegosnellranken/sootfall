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

export { backendLink, token };
