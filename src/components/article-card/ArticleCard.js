"use client";

import React from "react";
import { useSettings } from '../../config/Settings';
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown'
import {
  InstagramEmbed,
  XEmbed,
  TikTokEmbed,
  YouTubeEmbed,
} from 'react-social-media-embed';
import './ArticleCard.scss';

function ArticleCard({ article }) {
    const { readAloud, voices, voicesAvailable } = useSettings();
    const [selectedVoice, setSelectedVoice] = useState("");
    const [isReading, setIsReading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [authorDateAlignmentClass, setAuthorDateAlignmentClass] = useState('');
    let speechMethodSupport = useRef(false);
    
    // Get data from ~/.env, set API_URL
    const env = process.env.NEXT_PUBLIC_ENV;
    let API_URL;
    if (env === 'local') {
        API_URL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
    }
    else if (env === 'cloud') {
        API_URL = process.env.NEXT_PUBLIC_API_URL_CLOUD;
    }

    const router = useRouter();
    
    const handleNavigation = (path) => {
        router.push(path);
    };

    // Process the article data passed in as a prop
    const articleData = (() => {
        if (!article) return null;
        let title = article.title;
        let author = article.author.name;
        let dateString = article.date;
        dateString = dateString.slice(5) + "-" + dateString.slice(2,4);
        let image;
        if (env === 'local') {
            // Does not contain the API URL, need to concatenate
            image = API_URL + article.image.formats.medium.url;
            // image = API_URL + image.formats.medium.url;
        } else if (env === 'cloud') {
            // Already contains the API URL, no concatenation necessary
            image = article.image.formats.medium.url;
        }

        let tags = article.tags;
        if (tags != null) {
            tags = tags.split(",").map(item => item.trim());
        }

        // Should not have to do this...
        // const content = article.content.replaceAll(/https?:\/\/[^/]+/g, API_URL);

        const content = article.content;

        return {
            title: title,
            date: dateString,
            image: image,
            content: content,
            tags: tags,
            author: author
        };
    })();

    const calculateAlignment = useCallback(() => {
        if (articleData && articleData.author) {
            if (articleData.author.length < 12) {
                setAuthorDateAlignmentClass('split-align-author-date');
            } else {
                setAuthorDateAlignmentClass('center-align-author-date');
            }
        }
    }, [articleData]);

    useEffect(() => {
        calculateAlignment();
    }, [calculateAlignment]);

    // Check for support of speechSynthesis methods
    useEffect(() => {
        const isAndroid = /Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent);
        const pauseSupport =  typeof window.speechSynthesis?.pause;
        const resumeSupport =  typeof window.speechSynthesis?.resume;
        if (pauseSupport === 'function' && resumeSupport === 'function' && !isAndroid) {
            speechMethodSupport.current = true;
        } else {
            speechMethodSupport.current = false;
        }
    }, []);

    function readArticle(content) {
        if (!isReading) {
            let synth = window.speechSynthesis;
            const allVoices = synth.getVoices();
            if (allVoices.length > 0) {
                let speech = new SpeechSynthesisUtterance();
                let voice = allVoices.find(v => v.name === selectedVoice);
                if (voice) {
                    speech.voice = voice;
                }
                speech.text = content;
                speech.volume = 1;
                speech.rate = .75;
                speech.pitch = 1;
                synth.speak(speech);
                setIsReading(true);
            } else {
                setTimeout(() => readArticle(content), 100);
            }
        } else if (isReading) {
            window.speechSynthesis.cancel();
            setIsReading(false);
            setIsPaused(false);
        }
    }

    function removeImagesAndLinks(content) {
        while (content.indexOf('[') > -1 && (content.indexOf(')') > -1 && content.indexOf(')') > content.indexOf('['))) {
            let startIndex = content.indexOf('[');
            let endIndex = content.indexOf(')');
            let imageIndex = content.indexOf('!');
            if (imageIndex > -1 && imageIndex === startIndex - 1) {
                content = content.slice(0, imageIndex) + content.slice(endIndex + 1);
            } else {
                content = content.slice(0, startIndex) + content.slice(endIndex + 1);
            }
        }
        return content;
    }

    function pauseArticle() {
        if (!isPaused) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        } else if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    }

    // Cleanup speech synthesis on component unmount or navigation
    useEffect(() => {
        if (readAloud) {
            const cancelSpeech = () => window.speechSynthesis.cancel();
            router.events?.on('routeChangeStart', cancelSpeech);
            window.addEventListener("beforeunload", cancelSpeech);
            
            return () => {
                cancelSpeech();
                router.events?.off('routeChangeStart', cancelSpeech);
                window.removeEventListener("beforeunload", cancelSpeech);
            };
        }
    }, [readAloud, router.events]);

    if (!articleData) {
        return <div>Loading...</div>;
    }

    function mediaChecks(text) {
        switch (true) {
            case text.startsWith("https://www.instagram.com/p/"):
                return (
                    <div className="embed instagram-embed">
                        <InstagramEmbed url={text} />
                    </div>
                );
            
            case text.startsWith("https://x.com/"):
                return (
                    <div className="embed x-embed">
                        <XEmbed url={text} />
                    </div>
                );

            case text.startsWith("https://www.tiktok.com/"):
                return (
                    <div className="embed tiktok-embed">
                        <TikTokEmbed url={text} />
                    </div>
                );

            case text.startsWith("https://www.youtube.com/") || text.startsWith("https://youtu.be/"):
                return (
                    <div className="embed youtube-embed">
                        <YouTubeEmbed url={text} />
                    </div>
                );
            
            default:
                return (
                    <div className="text-line">
                        <p>{text}</p>
                    </div>
                );
        }
    }

    return (
        <div id="div-articlecard-full-article-card">
            <div id="div-articlecard-stitch">
                <div id="div-articlecard-back-link">
                    <p id="p-articlecard-back-link" onClick={() => router.back()}>
                        Return
                    </p>
                </div>
                <div id="div-articlecard-image-title-date">
                    <div id="div-articlecard-image">
                        <img src={articleData.image} alt="" id="img-articlecard-image" draggable="false"/>
                    </div>
                    <div id="div-articlecard-title-date-tags">
                        <div id="div-articlecard-title">
                            <p id="p-articlecard-title">{articleData.title}</p>
                        </div>
                        <div id="div-articlecard-author-date-container">
                            <div id="div-articlecard-author-date" className={authorDateAlignmentClass}>
                                <p id="p-articlecard-author">
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleNavigation(`/authors/${articleData.author.toLowerCase()}`);
                                        }}
                                    >
                                        {articleData.author}
                                    </span>
                                </p>
                                <p id="p-articlecard-separator">⋅─⊱༺♰༻⊰─⋅</p>
                                <p id="p-articlecard-date">{articleData.date}</p>
                            </div>
                        </div>
                        <div id="div-tag-stitch"></div>
                        <div id="div-article-tags-container">
                            <div id="div-articlecard-tags">
                                {
                                    articleData.tags ?
                                    articleData.tags.map((item => (
                                        <p
                                            key={item}
                                            className="p-articlecard-tags"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNavigation(`/tags/${item}`);
                                            }}
                                        >
                                            {item}
                                        </p>
                                    )))
                                    : <p className="p-articlecard-tags" style={{ visibility: "hidden" }}>|</p>
                                }
                            </div>
                        </div>
                        {readAloud && voicesAvailable &&
                            <div id="div-readAloud">
                                <div id="div-articlecard-voicesynthesis">
                                    <select
                                        id="select-voice"
                                        className={isReading ? "select-disable" : ""}
                                        disabled={isReading}
                                        value={selectedVoice}
                                        onChange={e => setSelectedVoice(e.target.value)}
                                    >
                                        {voices.map((voice, index) => (
                                            <option key={voice.name} className="option-voice" value={voice.name}>
                                                Read Aloud with Voice #{index + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button id="btn-read" onClick={() => readArticle(removeImagesAndLinks(articleData.content))}>
                                        <i id="i-btn-read" className="material-icons">
                                            {isReading ? "stop" : "play_arrow"}
                                        </i>
                                    </button>
                                    {speechMethodSupport.current &&
                                        <button 
                                            id="btn-pause"
                                            className={isReading ? "" : "btn-disable"}
                                            disabled={!isReading}
                                            onClick={() => pauseArticle()}
                                        >
                                            <i id="i-btn-pause" className="material-icons">
                                                {isPaused ? "play_circle_outline" : "pause_circle_outline"}
                                            </i>
                                        </button>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="separator"></div>
                <div id="div-articlecard-main-content">
                    <div id="p-articlecard-main-content">
                        <ReactMarkdown
                            components={{
                                a: ({node, ...props}) => (
                                <a {...props} target="_blank" rel="noopener noreferrer" className="content-link" />
                                ),
                                p: ({ node, children }) => {
                                    // Check if the paragraph starts with an image and is followed by " | "
                                    // ReactMarkdown processes images into an <img> JSX element within the children array.
                                    // The text content after the image will be in the next child.
                                    if (
                                        children.length >= 2 &&
                                        typeof children[0] === 'object' && children[0] !== null &&
                                        children[0].type === 'img' && // This checks if the first child is an <img> element
                                        typeof children[1] === 'string' &&
                                        children[1].startsWith(" | ")
                                    ) {
                                        const imageElement = children[0]; // The <img> JSX element
                                        const textContent = children[1].substring(3).trim(); // Text after " | "

                                        return (
                                            <div className="div-side-by-side">
                                                <div className="div-side-1">
                                                    {imageElement}
                                                </div>
                                                <div className="div-side-2">
                                                    {mediaChecks(textContent)}
                                                </div>
                                            </div>
                                        );

                                    // Check if the paragraph starts with text and is followed by an image after the " | "
                                    } else if (
                                        children.length >= 2 &&
                                        typeof children[0] === 'string' &&
                                        children[0].includes(" | ") &&
                                        typeof children[1] === 'object' &&
                                        children[1] !== null &&
                                        children[1].type === 'img'
                                        ) {
                                        const textContent = children[0].split(" | ")[0].trim(); // text before the pipe
                                        const imageElement = children[1];

                                        return (
                                            <div className="div-side-by-side">
                                            <div className="div-side-1">{mediaChecks(textContent)}</div>
                                            <div className="div-side-2">{imageElement}</div>
                                            </div>
                                        );
                                    }

                                    // Original logic for handling text content and embedded media.
                                    // This applies for paragraphs without an image on either/both sides of the " | ".
                                    let text = children[0];
                                    if (typeof text === "string") {
                                        const firstPipeIndex = text.indexOf(" | ");
                                        let left, right;
                                        if (firstPipeIndex === -1) {
                                            // No pipe found: everything goes into "left"
                                            left = text;
                                            right = "";
                                            return (mediaChecks(left))
                                        } else {
                                            left = text.substring(0, firstPipeIndex);
                                            right = text.substring(firstPipeIndex + 3);
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

                                    // Default rendering for any other complex paragraph structures or if children[0] is not a string
                                    return <p>{children}</p>;
                                },
                            }}
                        >
                            {articleData.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard;
