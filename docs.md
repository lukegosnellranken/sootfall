
## Introduction

Welcome to Horseman -- the headless, lightweight, and non-proprietary content management and hosting solution.

Horseman is built to give you a simple, reliable way to manage your blog content without worrying about the technical details. The front end runs on **Next.js**, so your site is fast, modern, and responsive. Your content lives in **Strapi Cloud**, where you’ll have direct access to the admin panel to create and edit posts whenever you need.

For deeper customization—like layout changes, new features, or integrations—we’ll handle the code side for you. That way, you can focus entirely on your content while we ensure the technical foundation stays stable and scalable.

Your blog is deployed through **AWS Amplify**, which provides secure, automated hosting with built‑in scalability. This means every blog powered by Horseman is lightweight, maintainable, and ready to grow with your needs.

## How Horseman Works

- **You add content in Strapi Cloud**
    - Log in to the Strapi admin panel.
    - Create or edit blog posts.
    - Save your changes — Strapi stores everything securely in the cloud.
        
- **Next.js renders the front end**
    - Horseman’s Next.js application pulls your content from Strapi.
    - Pages are generated with modern, responsive layouts.
    - Any deeper design or feature changes are handled by me in the codebase.
        
- **AWS Amplify deploys and hosts your site**
    - Every update triggers a build and deployment.
    - Amplify serves your blog quickly and reliably, with built‑in scalability.
    - Your site stays lightweight, secure, and always available.

## Roles & Responsibilities

Horseman is designed so you can focus on content while we manage the technical foundation. Here’s how responsibilities are divided:

You (Content Creator)
    - Log in to Strapi Cloud and manage your blog posts, categories, and media
    - Create, edit, and publish content
    - Organize your content structure (tags, authors, etc.)
    - Upload images or media through Strapi
    - Focus on writing and publishing

Horseman (Developer Platform)
    - Configure and maintain the Next.js front end
    - Implement deeper code changes (layouts, features, integrations)
    - Troubleshoot and refine workflows between Strapi, Next.js, and AWS Amplify
    - Handle deployment, hosting, and scalability through AWS Amplify
    - Ensure performance, security, and long-term maintainability

## Cutting Costs

Horseman was created with the intent to make a simple blog site powered by open-source technologies in the most cost-effective way possible short of self-hosting. Here is how you save money without compromising quality and performance with Horseman.

- **Next.js (Front End)**
    - Next.js is open‑source, meaning there are no licensing fees.
    - Its built‑in optimizations (static generation, server‑side rendering, and incremental static regeneration) reduce server load and bandwidth costs.
    - Performance improvements like image optimization and caching lower hosting expenses by serving content more efficiently.
        
- **Strapi Cloud (Content Management)**
    - Strapi itself is open‑source, so you’re not locked into expensive proprietary CMS platforms.
    - Strapi Cloud provides hosting and scaling at predictable, affordable rates compared to managing your own servers.
    - You only pay for what you need, avoiding the overhead of enterprise CMS solutions.
    - Strapi Cloud's generous free-tier offers 10,000 API requests per month. For smaller content sites, this may fully suffice, cutting content-hosting costs altogether.
        
- **AWS Amplify (Hosting & Deployment)**
    - Amplify offers a pay‑as‑you‑go model, so you’re only charged for actual usage.
    - Automatic scaling means you don’t need to over‑provision servers “just in case.”
    - Built‑in CI/CD reduces the need for separate deployment tools or infrastructure, cutting down on operational costs.

By combining **open‑source flexibility** with **cloud efficiency**, Horseman avoids the hidden costs of proprietary software, over‑engineered hosting, and manual maintenance. You get a professional, scalable blog platform at a fraction of the typical price — without sacrificing speed, reliability, or user experience.


## Getting Started

Follow these steps to set up and publish your first blog post with Horseman:

1. **Log in to Strapi Cloud**
    - Use the credentials provided to access the Strapi admin panel.
    - Once logged in, you’ll see the dashboard where all your content is managed.

2. **Create a new author**
    - Navigate to the _Content Manager_.
    - Select **Author** and click the "Create new entry" button.
    - Fill in the name, image, and description.

3. **Create a new post**
    - Navigate to the _Content Manager_.
    - Select **Article** and click the "Create new entry" button.
    - Fill in the title, author, image, date, tags, and content.

4. **Save and publish**
    - Click **Save** to store your draft.
    - When ready, click **Publish** to make the post live.
        
5. **See your changes on the site**
    - Horseman’s Next.js front end automatically pulls your published content.
    - Within moments, your new post will appear on your live blog.
        
6. **Iterate and refine**
    - You can edit posts at any time in Strapi.
    - Updates will flow through to the front end automatically.