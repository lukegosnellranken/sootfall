// This line marks the component as a Client Component in Next.js.
// Client Components run on the user's browser, allowing for interactive features like
// button clicks, state management, and effects that interact with the browser's environment.
"use client";

// We're bringing in essential tools from React and Next.js, along with other utilities.
import React from "react"; // The core library for building user interfaces.
import { useSettings } from '../../config/Settings'; // Custom hook to access global site settings (like read-aloud preferences).
import { useState, useEffect, useRef, useCallback } from "react"; // React hooks for managing component state, side effects, references, and memoized functions.
import { useRouter } from "next/navigation"; // Hook from Next.js for programmatically navigating between pages.
import ReactMarkdown from 'react-markdown' // A library to parse and render Markdown content into React components.
import './ArticleCard.scss'; // Imports the SCSS (Sass) stylesheet for this component, defining its visual styles.


// These lines dynamically import components for embedding content from various social media platforms.
// 'dynamic' from 'next/dynamic' is used to load these components only when needed, which helps
// improve the initial loading speed of the page. 'ssr: false' means these components will
// only be rendered on the client-side (in the browser), as social media embeds often rely
// on browser-specific APIs and might not work correctly during server-side rendering.
// This approach ensures that the page loads quickly and efficiently, even with many embeds.
import dynamic from 'next/dynamic';

const InstagramEmbed = dynamic(
  () => import('react-social-media-embed').then(mod => mod.InstagramEmbed),
  { ssr: false }
);

const XEmbed = dynamic(
  () => import('react-social-media-embed').then(mod => mod.XEmbed),
  { ssr: false }
);

const TikTokEmbed = dynamic(
  () => import('react-social-media-embed').then(mod => mod.TikTokEmbed),
  { ssr: false }
);

const YouTubeEmbed = dynamic(
  () => import('react-social-media-embed').then(mod => mod.YouTubeEmbed),
  { ssr: false }
);

// This is the main React functional component called ArticleCard.
// It receives an 'article' object as a 'prop', which contains all the data for the article to be displayed.
function ArticleCard({ article }) {
    // 'useSettings' is a custom hook that allows this component to access global settings.
    // Here, we're extracting 'readAloud' (a boolean indicating if text-to-speech is enabled),
    // 'voices' (a list of available speech synthesis voices), and 'voicesAvailable' (a boolean).
    const { readAloud, voices, voicesAvailable } = useSettings();
    // 'useState' hooks are used to manage the component's internal state.
    // 'selectedVoice' stores the name of the voice chosen for read-aloud functionality.
    const [selectedVoice, setSelectedVoice] = useState("");
    // 'isReading' tracks whether the text-to-speech is currently active.
    const [isReading, setIsReading] = useState(false);
    // 'isPaused' tracks whether the text-to-speech is currently paused.
    const [isPaused, setIsPaused] = useState(false);
    // 'authorDateAlignmentClass' stores a CSS class name to control the layout of the author and date.
    const [authorDateAlignmentClass, setAuthorDateAlignmentClass] = useState('');
    // 'useRef' creates a mutable ref object that can hold a value (here, a boolean).
    // 'speechMethodSupport' will check if the browser supports pausing/resuming speech synthesis.
    let speechMethodSupport = useRef(false);
    
    // This section determines the correct API URL based on the current environment (local or cloud).
    // It reads the 'NEXT_PUBLIC_ENV' variable, which should be set in a '.env' file.
    const env = process.env.NEXT_PUBLIC_ENV;
    let API_URL;
    if (env === 'local') {
        // If the environment is 'local', it uses the local API URL.
        API_URL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
    }
    else if (env === 'cloud') {
        // If the environment is 'cloud', it uses the cloud API URL.
        API_URL = process.env.NEXT_PUBLIC_API_URL_CLOUD;
    }

    // 'useRouter' hook provides access to the router object, allowing for navigation.
    const router = useRouter();
    
    // This function is a helper for navigating to different paths using the Next.js router.
    const handleNavigation = (path) => {
        router.push(path);
    };

    // This self-executing function processes the raw 'article' prop into a more usable format.
    // It extracts and formats various pieces of information about the article.
    const articleData = (() => {
        // If no article data is provided, it returns null.
        if (!article) return null;
        // Extracts the article's title.
        let title = article.title;
        // Extracts the author's name.
        let author = article.author.name;
        // Extracts and formats the article's publication date.
        let dateString = article.date;
        dateString = dateString.slice(5) + "-" + dateString.slice(2,4);
        let image;
        // Determines the correct image URL based on the environment.
        if (env === 'local') {
            // For local environment, it concatenates the API URL with the image path.
            image = API_URL + article.image.formats.medium.url;
        } else if (env === 'cloud') {
            // For cloud environment, the image URL is already complete.
            image = article.image.formats.medium.url;
        }

        // Processes article tags: if tags exist, it splits the string into an array and trims whitespace.
        let tags = article.tags;
        if (tags != null) {
            tags = tags.split(",").map(item => item.trim());
        }

        // Extracts the main content of the article.
        const content = article.content;

        // Returns an object containing all the processed article data.
        return {
            title: title,
            date: dateString,
            image: image,
            content: content,
            tags: tags,
            author: author
        };
    })();

    // 'useCallback' memoizes the 'calculateAlignment' function, preventing unnecessary re-creations.
    // This function determines how the author's name and date should be aligned based on the author's name length.
    const calculateAlignment = useCallback(() => {
        if (articleData && articleData.author) {
            // If the author's name is short (less than 12 characters), it uses a 'split-align' class.
            if (articleData.author.length < 12) {
                setAuthorDateAlignmentClass('split-align-author-date');
            } else {
                // Otherwise, it uses a 'center-align' class.
                setAuthorDateAlignmentClass('center-align-author-date');
            }
        }
    }, [articleData]); // This function only re-creates if 'articleData' changes.

    // 'useEffect' hook runs 'calculateAlignment' when the component mounts or when 'calculateAlignment' itself changes.
    useEffect(() => {
        calculateAlignment();
    }, [calculateAlignment]);

    // This 'useEffect' hook runs once when the component mounts to check for browser support
    // for speech synthesis pause and resume methods. This is important because some browsers
    // (like certain Android browsers) might not fully support these features.
    useEffect(() => {
        // Checks if the user agent string indicates an Android mobile device.
        const isAndroid = /Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent);
        // Checks if the 'pause' method exists on the 'speechSynthesis' object.
        const pauseSupport =  typeof window.speechSynthesis?.pause;
        // Checks if the 'resume' method exists on the 'speechSynthesis' object.
        const resumeSupport =  typeof window.speechSynthesis?.resume;
        // If both pause and resume methods are functions and it's not an Android device,
        // then speech method support is considered true.
        if (pauseSupport === 'function' && resumeSupport === 'function' && !isAndroid) {
            speechMethodSupport.current = true;
        } else {
            // Otherwise, it's false.
            speechMethodSupport.current = false;
        }
    }, []); // The empty dependency array ensures this effect runs only once after the initial render.

    // This function handles the text-to-speech functionality for the article content.
    function readArticle(content) {
        // If the article is not currently being read...
        if (!isReading) {
            // Access the browser's speech synthesis interface.
            let synth = window.speechSynthesis;
            // Get all available voices on the user's system.
            const allVoices = synth.getVoices();
            // If voices are available...
            if (allVoices.length > 0) {
                // Create a new speech utterance object.
                let speech = new SpeechSynthesisUtterance();
                // Find the selected voice from the list of all voices.
                let voice = allVoices.find(v => v.name === selectedVoice);
                // If a selected voice is found, assign it to the utterance.
                if (voice) {
                    speech.voice = voice;
                }
                // Set the text to be spoken, volume, rate, and pitch.
                speech.text = content;
                speech.volume = 1;
                speech.rate = .75;
                speech.pitch = 1;
                // Start speaking the text.
                synth.speak(speech);
                // Update the state to indicate that reading has started.
                setIsReading(true);
            } else {
                // If voices are not yet loaded, try again after a short delay.
                setTimeout(() => readArticle(content), 100);
            }
        // If the article is currently being read (and this function is called again)...
        } else if (isReading) {
            // Cancel any ongoing speech synthesis.
            window.speechSynthesis.cancel();
            // Reset reading and paused states.
            setIsReading(false);
            setIsPaused(false);
        }
    }

    function removeImagesAndLinks(content) {
        // This function prepares the article's text content for the text-to-speech feature.
        // It's designed to strip out any Markdown formatting for images and links,
        // so that the screen reader doesn't read out the raw Markdown syntax (like "![alt text](url)").
        // It repeatedly searches for the opening bracket '[' of a link or image.
        while (content.indexOf('[') > -1 && (content.indexOf(')') > -1 && content.indexOf(')') > content.indexOf('['))) {
            // It finds the start and end of the Markdown syntax.
            let startIndex = content.indexOf('[');
            let endIndex = content.indexOf(')');
            // It specifically checks if it's an image by looking for a '!' just before the opening bracket.
            let imageIndex = content.indexOf('!');
            if (imageIndex > -1 && imageIndex === startIndex - 1) {
                // If it's an image, it removes the entire '![...](...)' block.
                content = content.slice(0, imageIndex) + content.slice(endIndex + 1);
            } else {
                // If it's a link, it removes the '[...](...)' block.
                content = content.slice(0, startIndex) + content.slice(endIndex + 1);
            }
        }
        // After removing all images and links, it returns the cleaned-up text.
        return content;
    }

    // This function handles pausing and resuming the text-to-speech functionality.
    function pauseArticle() {
        // If the speech is not currently paused...
        if (!isPaused) {
            // It pauses the speech synthesis.
            window.speechSynthesis.pause();
            // And updates the state to reflect that it's now paused.
            setIsPaused(true);
        // If the speech is already paused...
        } else if (isPaused) {
            // It resumes the speech synthesis from where it left off.
            window.speechSynthesis.resume();
            // And updates the state to reflect that it's no longer paused.
            setIsPaused(false);
        }
    }

    // This 'useEffect' hook is for cleaning up the speech synthesis when the user navigates away.
    // It prevents the audio from continuing to play in the background after leaving the page.
    useEffect(() => {
        // This effect only runs if the 'readAloud' feature is enabled in the settings.
        if (readAloud) {
            // A helper function to immediately stop any active speech synthesis.
            const cancelSpeech = () => window.speechSynthesis.cancel();
            // It attaches an event listener to the Next.js router. When a route change starts, it cancels the speech.
            // The optional chaining `?.` is used to safely access `events` which might not exist in all router versions.
            router.events?.on('routeChangeStart', cancelSpeech);
            // It also attaches a 'beforeunload' event listener to the window, which fires when the user
            // is about to close the tab or navigate to a different website, ensuring speech is stopped.
            window.addEventListener("beforeunload", cancelSpeech);
            
            // The return function from 'useEffect' is a cleanup function. React runs this when the
            // component is "unmounted" (removed from the screen) or before the effect runs again.
            return () => {
                // It cancels any ongoing speech.
                cancelSpeech();
                // It removes the event listeners to prevent memory leaks and errors.
                router.events?.off('routeChangeStart', cancelSpeech);
                window.removeEventListener("beforeunload", cancelSpeech);
            };
        }
    }, [readAloud, router.events]); // The effect depends on 'readAloud' and 'router.events'.

    // This is a conditional rendering check. If 'articleData' has not been loaded yet,
    // it displays a simple "Loading..." message to the user.
    if (!articleData) {
        return <div>Loading...</div>;
    }

    // This function checks if a line of text is a URL for a social media embed.
    // If it matches a known platform (Instagram, X, TikTok, YouTube), it renders a special
    // embed component for it. Otherwise, it just renders the text as a normal paragraph.
    function mediaChecks(text) {
        // The 'switch (true)' pattern allows us to check multiple cases.
        switch (true) {
            // Case 1: The text is an Instagram URL.
            case text.startsWith("https://www.instagram.com/p/"):
                return (
                    <div className="embed instagram-embed">
                        {/* Renders the InstagramEmbed component with the URL. */}
                        <InstagramEmbed url={text} />
                    </div>
                );
            
            // Case 2: The text is an X (formerly Twitter) URL.
            case text.startsWith("https://x.com/"):
                return (
                    <div className="embed x-embed">
                        {/* Renders the XEmbed component. */}
                        <XEmbed url={text} />
                    </div>
                );

            // Case 3: The text is a TikTok URL.
            case text.startsWith("https://www.tiktok.com/"):
                return (
                    <div className="embed tiktok-embed">
                        {/* Renders the TikTokEmbed component. */}
                        <TikTokEmbed url={text} />
                    </div>
                );

            // Case 4: The text is a YouTube URL (both standard and shortened formats).
            case text.startsWith("https://www.youtube.com/") || text.startsWith("https://youtu.be/"):
                return (
                    <div className="embed youtube-embed">
                        {/* Renders the YouTubeEmbed component. */}
                        <YouTubeEmbed url={text} />
                    </div>
                );
            
            // Default Case: If none of the above match, treat it as regular text.
            default:
                return (
                    <div className="text-line">
                        <p>{text}</p>
                    </div>
                );
        }
    }

    // This is the main return statement that defines the component's HTML-like structure (JSX).
    // It lays out the entire visual representation of the article card.
    return (
        // The outermost container for the entire article card.
        <div id="div-articlecard-full-article-card">
            {/* A wrapper for the main content area. */}
            <div id="div-articlecard-stitch">
                {/* Contains the 'Return' link to go back to the previous page. */}
                <div id="div-articlecard-back-link">
                    <p id="p-articlecard-back-link" onClick={() => router.back()}>
                        Return
                    </p>
                </div>
                {/* A container for the article's header section: image, title, and date. */}
                <div id="div-articlecard-image-title-date">
                    {/* The article's main image. */}
                    <div id="div-articlecard-image">
                        <img src={articleData.image} alt="" id="img-articlecard-image" draggable="false"/>
                    </div>
                    {/* A container for the title, author, date, and tags. */}
                    <div id="div-articlecard-title-date-tags">
                        {/* The article title. */}
                        <div id="div-articlecard-title">
                            <p id="p-articlecard-title">{articleData.title}</p>
                        </div>
                        {/* A container for the author and date information. */}
                        <div id="div-articlecard-author-date-container">
                             {/* The 'className' is dynamically set to control alignment based on author name length. */}
                            <div id="div-articlecard-author-date" className={authorDateAlignmentClass}>
                                <p id="p-articlecard-author">
                                    {/* The author's name, which is clickable and navigates to the author's page. */}
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents clicks from bubbling up to parent elements.
                                            handleNavigation(`/authors/${articleData.author.toLowerCase()}`);
                                        }}
                                    >
                                        {articleData.author}
                                    </span>
                                </p>
                                {/* A decorative separator. */}
                                <p id="p-articlecard-separator">⋅─⊱༺♰༻⊰─⋅</p>
                                {/* The formatted publication date. */}
                                <p id="p-articlecard-date">{articleData.date}</p>
                            </div>
                        </div>
                        {/* Another decorative separator. */}
                        <div id="div-tag-stitch"></div>
                        {/* Container for the article's tags. */}
                        <div id="div-article-tags-container">
                            <div id="div-articlecard-tags">
                                {
                                    // If there are tags, it maps over them to create a clickable <p> for each.
                                    articleData.tags ?
                                    articleData.tags.map((item => (
                                        <p
                                            key={item} // A unique key for each tag, important for React's rendering.
                                            className="p-articlecard-tags"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNavigation(`/tags/${item}`); // Navigates to the tag's page.
                                            }}
                                        >
                                            {item}
                                        </p>
                                    )))
                                    // If there are no tags, it renders an invisible placeholder to maintain layout.
                                    : <p className="p-articlecard-tags" style={{ visibility: "hidden" }}>|</p>
                                }
                            </div>
                        </div>
                        {/* This section for the read-aloud feature is only rendered if it's enabled and voices are available. */}
                        {readAloud && voicesAvailable &&
                            <div id="div-readAloud">
                                <div id="div-articlecard-voicesynthesis">
                                    {/* A dropdown menu to select a voice for the text-to-speech. */}
                                    <select
                                        id="select-voice"
                                        className={isReading ? "select-disable" : ""} // Disables the dropdown while reading.
                                        disabled={isReading}
                                        value={selectedVoice} // The currently selected voice.
                                        onChange={e => setSelectedVoice(e.target.value)} // Updates the selected voice.
                                    >
                                        {/* Maps over the available voices to create an <option> for each one. */}
                                        {voices.map((voice, index) => (
                                            <option key={voice.name} className="option-voice" value={voice.name}>
                                                Read Aloud with Voice #{index + 1}
                                            </option>
                                        ))}
                                    </select>
                                    {/* The play/stop button for the text-to-speech. */}
                                    <button id="btn-read" onClick={() => readArticle(removeImagesAndLinks(articleData.content))}>
                                        <i id="i-btn-read" className="material-icons">
                                            {/* The icon changes based on whether it's currently reading or not. */}
                                            {isReading ? "stop" : "play_arrow"}
                                        </i>
                                    </button>
                                    {/* The pause/resume button is only shown if the browser supports it. */}
                                    {speechMethodSupport.current &&
                                        <button 
                                            id="btn-pause"
                                            className={isReading ? "" : "btn-disable"} // Disables the button when not reading.
                                            disabled={!isReading}
                                            onClick={() => pauseArticle()}
                                        >
                                            <i id="i-btn-pause" className="material-icons">
                                                {/* The icon changes based on whether the speech is paused or not. */}
                                                {isPaused ? "play_circle_outline" : "pause_circle_outline"}
                                            </i>
                                        </button>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/* A final decorative separator before the main content. */}
                <div className="separator"></div>
                {/* The main container for the article's body content. */}
                <div id="div-articlecard-main-content">
                    <div id="p-articlecard-main-content">
                        {/* 'ReactMarkdown' is the component that parses and renders the Markdown content. */}
                        <ReactMarkdown
                            // The 'components' prop allows us to override how standard Markdown elements are rendered.
                            components={{
                                // Overrides the default <a> tag (link) to add 'target="_blank"' which opens links in a new tab.
                                a: ({node, ...props}) => (
                                <a {...props} target="_blank" rel="noopener noreferrer" className="content-link" />
                                ),
                                // This provides custom logic for rendering paragraphs (<p> tags).
                                // It's used to create the side-by-side layouts with images and text/embeds.
                                p: ({ node, children }) => {
                                    // This block handles a specific layout: IMAGE | TEXT/EMBED
                                    if (
                                        children.length >= 2 &&
                                        typeof children[0] === 'object' && children[0] !== null &&
                                        children[0].type === 'img' && // Checks if the first child is an image.
                                        typeof children[1] === 'string' &&
                                        children[1].startsWith(" | ") // Checks if the text after the image starts with " | ".
                                    ) {
                                        const imageElement = children[0]; // The image.
                                        const textContent = children[1].substring(3).trim(); // The text/URL after the separator.

                                        return (
                                            <div className="div-side-by-side">
                                                <div className="div-side-1">{imageElement}</div>
                                                <div className="div-side-2">{mediaChecks(textContent)}</div>
                                            </div>
                                        );

                                    // This block handles the reverse layout: TEXT/EMBED | IMAGE
                                    } else if (
                                        children.length >= 2 &&
                                        typeof children[0] === 'string' &&
                                        children[0].includes(" | ") && // Checks if the first child is text containing the separator.
                                        typeof children[1] === 'object' &&
                                        children[1] !== null &&
                                        children[1].type === 'img' // Checks if the second child is an image.
                                        ) {
                                        const textContent = children[0].split(" | ")[0].trim(); // The text before the separator.
                                        const imageElement = children[1]; // The image.

                                        return (
                                            <div className="div-side-by-side">
                                                <div className="div-side-1">{mediaChecks(textContent)}</div>
                                                <div className="div-side-2">{imageElement}</div>
                                            </div>
                                        );
                                    }

                                    // This is the original logic for handling text that may contain a ' | ' separator
                                    // to create a two-column layout for text or embeds (but not involving images directly in this block).
                                    let text = children[0];
                                    if (typeof text === "string") {
                                        const firstPipeIndex = text.indexOf(" | ");
                                        let left, right;
                                        if (firstPipeIndex === -1) {
                                            // If no separator is found, it renders the content as a single block.
                                            left = text;
                                            right = "";
                                            return (mediaChecks(left))
                                        } else {
                                            // If a separator is found, it splits the content into two columns.
                                            left = text.substring(0, firstPipeIndex);
                                            right = text.substring(firstPipeIndex + 3);
                                            // Each side is passed through 'mediaChecks' to handle potential embeds.
                                            left = mediaChecks(left);
                                            right = mediaChecks(right);
                                            return (
                                                <div className="div-side-by-side">
                                                    <div className="div-side-1">{left}</div>
                                                    <div className="div-side-2">{right}</div>
                                                </div>
                                            )
                                        }
                                    }

                                    // If none of the custom logic matches, it renders a standard paragraph.
                                    return <p>{children}</p>;
                                },
                            }}
                        >
                            {/* This is where the raw Markdown content of the article is passed to ReactMarkdown. */}
                            {articleData.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Exports the ArticleCard component to be used in other parts of the application.
export default ArticleCard;
