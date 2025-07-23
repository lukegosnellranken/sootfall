import React from "react";
import { useSettings } from '../../Settings';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import './ArticleCard.scss';

function ArticleCard() {
    let [initDataArray, setInitDataArray] = useState([]);
    let [articleDataArray, setArticleDataArray] = useState([[]]);
    const { readAloud } = useSettings();
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState("");
    let { id } = useParams();
    // Remove all special characters from the id
    id = id.replace(/[^a-zA-Z0-9-_]/g, "");
    const API_URL = process.env.REACT_APP_API_URL; // Get domain from .env
    const token = 'ff75d12ddbfa3b18817eacba0f70b6fc3ef76c0d2e13da25468bfa16a6deaffd1f071ccc5ef1cff42ce2d2618ec6f457da47f6eceede245b00c59711b268482613864751271af51baf71109535b1bb87eff397e4193ffef7d08300aaa4e685792c019da43d928a18fff82ed34920c0aabfbdfc0fa2b22bd7379fb264eaebf0f4';
    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path);
    };
    
    // Fetch data for all articles on mount and convert to JSON if res is ok
    useEffect(() => {
        let iArray = [];
        const fetchData = async () => {
            await fetch(`${API_URL}/api/articles?populate=*`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('Articles res error');
                }
            })
            .then(data => {
                // Dynamically push data of each article as an array to iArray
                for (let i = 0; i < data.data.length; i++) {
                    let title = data.data[i].title;
                    let dateString = data.data[i].date;
                    dateString = dateString.slice(5) + "-" + dateString.slice(2,4);
                    let image = API_URL + data.data[i].image.formats.medium.url;
                    let content = data.data[i].content;
                    let tags = data.data[i].tags;
                    let author = data.data[i].author.name;
                    iArray.push([title, dateString, image, content, tags, author]);
                }
            })
            .catch(error => {console.log(error)});
            // set initDataArray to iArray (order of iArray is reversed)
            setInitDataArray(iArray.reverse());
        }
        fetchData();
    }, [API_URL]);

    // All articles are now in initDataArray. When initDataArray or id updates, run through initDataArray to find the correct article (title === id)
    // Push the correct article's items to iArray, set ArticleDataArray to iArray
    useEffect(() => {
        // Return on initial call since setInitDataArray will not yet have been called in above useEffect
        if (initDataArray === 0) { return; }
        let iArray = [];
        for (let i = 0; i < initDataArray.length; i++) {
            // First replace dashes with spaces, set string to lowercase, then remove all special characters to compare to the santized id
            if (initDataArray[i][0].replace(/\s+/g, '-').toLowerCase().replace(/[^a-zA-Z0-9-_]/g, "") === id) {
                let title = initDataArray[i][0];
                let dateString = initDataArray[i][1];
                let image = initDataArray[i][2];
                let content = initDataArray[i][3];
                let tags = initDataArray[i][4];
                let author = initDataArray[i][5];
                if (tags != null) {
                    tags = tags.split(",").map(item => item.trim());
                }
                iArray.push([title, dateString, image, content, tags, author]);
            }
        }
        // Only set articleDataArray if iArray is populated so that it is not set to an empty array, causing an unnecessary
        // re-render and an error in the return, which would call a non-existent object in articleDataArray
        if (iArray.length > 0) {
            // Replace base URL in images to env-defined URL
            iArray[0][3] = iArray[0][3].replaceAll(/https?:\/\/[^/]+/g, API_URL);
            setArticleDataArray(iArray);
        }
    }, [initDataArray, id, API_URL]);

    useEffect(() => {
        if (readAloud) {
            setVoiceStyles();
            function loadVoices() {
                const allVoices = window.speechSynthesis.getVoices();
                setVoices(allVoices);
                if (allVoices.length > 0 && !selectedVoice) {
                    setSelectedVoice(allVoices[0].name);
                }
            }
            loadVoices();
            // Rerun loadVoices if voice data changes
            window.speechSynthesis.onvoiceschanged = loadVoices;
            // Reset to null on unmount to prevent event triggers
            return () => {
                window.speechSynthesis.onvoiceschanged = null;
            }
        }
    }, [readAloud, selectedVoice]);

    function setVoiceStyles() {
        const readButton = document.getElementById("i-btn-read");
        const pauseButtonParent = document.getElementById("btn-pause");
        const selectDropdown = document.getElementById("select-voice");
        if (readButton.innerText === "play_arrow") {
            pauseButtonParent.classList.add("btn-disable");
        } else {
            if (pauseButtonParent.classList.contains("btn-disable")) {
                pauseButtonParent.classList.remove("btn-disable");
            }
        }
        if (readButton.innerText === "stop") {
            selectDropdown.classList.add("btn-disable");
            selectDropdown.setAttribute("disabled", "")
        } else {
            if (selectDropdown.classList.contains("btn-disable")) {
                selectDropdown.classList.remove("btn-disable");
            }
            if (selectDropdown.hasAttribute("disabled")) {
                selectDropdown.removeAttribute("disabled");
            }
        }
    }

    function readArticle(content) {
        // Uses Google fonts in header of index.html
        const readButton = document.getElementById("i-btn-read");
        const pauseButton = document.getElementById("i-btn-pause");
        if (readButton.innerText === "play_arrow") {
            let synth = window.speechSynthesis;
            let allVoices = synth.getVoices();
            if (voices.length > 0) {
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
                readButton.innerText = "stop";
            } else {
                setTimeout(() => readArticle(content), 100);
            }
        } else if (readButton.innerText === "stop") {
            window.speechSynthesis.cancel();
            readButton.innerText = "play_arrow";
            pauseButton.innerText = "pause_circle_outline";
        }
        setVoiceStyles();
    }

    // We do not want to read allowed the image data in an article
    // Images and links in strapi data always start with "[" and end with ")"
    // Also account for "!" which appears before "[" for images
    function removeImagesAndLinks(content) {
        // While there still exists both of the offending characters (and ")" comes after "["), remove said characters
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
        const readButton = document.getElementById("i-btn-read");
        const pauseButton = document.getElementById("i-btn-pause");
        if (pauseButton.innerText === "pause_circle_outline") {
            if (readButton.innerText === "stop") {
                window.speechSynthesis.pause();
                pauseButton.innerText = "play_circle_outline";
            }
        } else if (pauseButton.innerText === "play_circle_outline") {
            window.speechSynthesis.resume();
            pauseButton.innerText = "pause_circle_outline";
        }
        setVoiceStyles();
    }

    useEffect(() => {
        if (readAloud) {
            // Cleanup: stop speech when unmounting or navigating away
            setTimeout(100);
            return () => {
                window.speechSynthesis.cancel();
            };
        }
    }, [readAloud]);

    useEffect(() => {
        if (readAloud) {
            // Stop speechSynthesis when the user refreshes the page
            const handleUnload = () => {
                window.speechSynthesis.cancel();
            };
            window.addEventListener("beforeunload", handleUnload);
            return () => {
                window.removeEventListener("beforeunload", handleUnload);
            };
        }
    }, [readAloud]);

    return (
        <div id="div-articlecard-full-article-card">
            <div id="div-articlecard-stitch">
                <div id="div-articlecard-back-link">
                    {/* <p id="p-articlecard-back-link"><a href="http://localhost:3000/">Return</a></p> */}
                    <p id="p-articlecard-back-link" onClick={() => navigate(-1)}>
                        Return
                    </p>
                </div>
                <div id="div-articlecard-image-title-date">
                    <div id="div-articlecard-image">
                        <img src={articleDataArray[0][2]} alt="" id="img-articlecard-image" draggable="false"/>
                    </div>
                    <div id="div-articlecard-title-date-tags">
                        <div id="div-articlecard-title">
                            <p id="p-articlecard-title">{articleDataArray[0][0]}</p>
                        </div>
                        <div id="div-articlecard-author-date">
                            {
                                <p id="p-articlecard-author"
                                    onClick={(e) => {
                                            e.stopPropagation(); // Prevent parent div click event
                                            handleNavigation(`/authors/${articleDataArray[0][5].toLowerCase()}`);
                                    }}
                                >
                                    {articleDataArray[0][5]}
                                </p>
                            }
                            <p id="p-articlecard-separator">___ . ___</p>
                            <p id="p-articlecard-date">{articleDataArray[0][1]}</p>
                        </div>
                        <div id="div-tag-stitch"></div>
                        <div id="div-articlecard-tags">
                            {
                                articleDataArray[0][4] ?
                                articleDataArray[0][4].map((item => (
                                    <p
                                        key={item}
                                        className="p-articlecard-tags"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent parent div click event
                                            handleNavigation(`/tags/${item}`);
                                        }}
                                    >
                                        {item}
                                    </p>
                                )))
                                // invisible text to keep height consistent
                                : <p className="p-articlecard-tags" style={{ visibility: "hidden" }}>|</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="separator"></div>
                {readAloud &&
                    <div id="div-readAloud">
                        <div id="div-articlecard-voicesynthesis">
                            <select
                                id="select-voice"
                                value={selectedVoice}
                                onChange={e => setSelectedVoice(e.target.value)}
                            >
                                {voices.map((voice, index) => (
                                    <option key={voice.name} className="option-voice" value={voice.name}>
                                        Read Aloud with Voice #{index + 1}
                                    </option>
                                ))}
                            </select>
                            <button id="btn-read" onClick={() => readArticle(removeImagesAndLinks(articleDataArray[0][3]))}>
                                <i id="i-btn-read" className="material-icons">play_arrow</i>
                            </button>
                            <button id="btn-pause" onClick={() => pauseArticle()}>
                                <i id="i-btn-pause" className="material-icons">pause_circle_outline</i>
                            </button>
                        </div>
                        <div className="separator"></div>
                    </div>
                }
                <div id="div-articlecard-main-content">
                    <div id="p-articlecard-main-content"><ReactMarkdown>{articleDataArray[0][3]}</ReactMarkdown></div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard;