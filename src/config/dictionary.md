# Settings Dictionary

This document provides a summary of the settings used in the Sootfall project.

## Themes (`themes.json`)

This file defines the color schemes and font properties for different themes that can be applied to the application. The theme settings are applied to the application through CSS custom properties, which are defined in `src/config/Settings.js` and then used in the SCSS files.

### Theme Fields

*   **id**: A unique identifier for the theme.
*   **title**: The display name of the theme (e.g., "Dark", "Light").
*   **backgroundImage**: The primary background image for the entire site. This is a linear gradient that provides the base background color.
*   **backgroundImageGradient**: A secondary background image gradient that is layered on top of the primary background image.
*   **backgroundImageBanner**: A background image gradient specifically for banner elements.
*   **backgroundColorInput**: The background color for input elements, suchs as text boxes and enabled pagination buttons.
*   **backgroundColorInputAlt**: An alternative background color for input elements, used for disabled pagination buttons.
*   **backgroundColorSwitchItem**: The background color for switch items. *(Note: This property is defined but not currently used in the application's styling.)*
*   **backgroundColorSwitchItemToggle**: The background color for the toggle part of a switch item. *(Note: This property is defined but not currently used in the application's styling.)*
*   **backgroundColorSwitchItemToggleAlt**: An alternative background color for the toggle part of a switch item. *(Note: This property is defined but not currently used in the application's styling.)*
*   **hoverColor**: The background color that appears when hovering over interactive elements like links in the `HomeCard`, `AuthorCard`, and `ArticleSideCard`.
*   **boxShadow**: A box shadow effect. *(Note: This property is defined but not currently used in the application's styling.)*
*   **boxShadowTop**: A box shadow effect specifically for the top of an element. *(Note: This property is defined but not currently used in the application's styling.)*
*   **textColor**: The primary text color used for main text, as well as for the settings gear icon and hamburger menu icon when they are active.
*   **textColorAlt**: An alternative text color. *(Note: This property is defined but not currently used in the application's styling.)*
*   **textColorTitleGradient**: A linear gradient used for the color of title text.
*   **textShadow**: A shadow effect for text. *(Note: This property is defined but not currently used in the application's styling.)*
*   **elementColorDormant**: The color for elements that are in a "dormant" or inactive state. This is used for the settings gear and hamburger menu icons when they are off, the border of dormant input fields, placeholder text in the search input, and the magnifying glass icon in the search input.

## Fonts (`fonts.json`)

This file defines a list of available fonts for the application. The selected font is applied globally to most text elements through the `common-text` mixin in `src/config/_variables.scss`.

### Font Fields

*   **id**: A unique identifier for the font.
*   **title**: The display name of the font (e.g., "Sooty", "Print").
*   **value**: The `font-family` CSS value (e.g., "Source Serif 4, sans-serif"). This is the primary value that determines the font used.
*   **letterSpacing**: The letter-spacing CSS value. This is applied globally to the `html` element.
*   **fontSizeAdjust**: The font-size-adjust CSS value. This is applied globally to the `html` element, and it is used to normalize the size of different fonts.

## Sizes (`sizes.json`)

This file defines various size properties for different elements across the application, often categorized by breakpoints (e.g., `Full`, `1400`, `800`, `400`). These sizes are applied to the application through CSS custom properties, which are defined in `src/config/Settings.js` and then utilized in the SCSS files.

### Size Fields

*   **id**: A unique identifier for the size setting.
*   **title**: The display name of the size preset (e.g., "Medium", "Small", "Large").

**Navigation & Dropdown Sizes:**
These properties control the font sizes, widths, and heights of navigation items and dropdown elements, adapting to different screen widths.
*   **navFull**: Font size for navigation items at full screen width.
*   **nav1400**: Font size for navigation items at 1400px screen width.
*   **nav800**: Font size for navigation items at 800px screen width.
*   **nav400**: Font size for navigation items at 400px screen width.
*   **dropdownFull**: Font size for dropdown items at full screen width.
*   **dropdown1400**: Font size for dropdown items at 1400px screen width.
*   **dropdown800**: Font size for dropdown items at 800px screen width.
*   **dropdown400**: Font size for dropdown items at 400px screen width.
*   **ddWidthFull**: Width of dropdown elements at full screen width.
*   **ddWidth1400**: Width of dropdown elements at 1400px screen width.
*   **ddWidth800**: Width of dropdown elements at 800px screen width.
*   **ddWidth400**: Width of dropdown elements at 400px screen width.
*   **ddHeightFull**: Height of dropdown elements at full screen width.
*   **ddHeight1400**: Height of dropdown elements at 1400px screen width.
*   **ddHeight800**: Height of dropdown elements at 800px screen width.
*   **ddHeight400**: Height of dropdown elements at 400px screen width.

**Header & Footer Sizes:**
These properties manage the font sizes of elements within the header and footer sections.
*   **headerFull**: Font size for header elements at full screen width.
*   **header1400**: Font size for header elements at 1400px screen width.
*   **header800**: Font size for header elements at 800px screen width.
*   **footerFull**: Font size for footer elements at full screen width.
*   **footer1400**: Font size for footer elements at 1400px screen width.
*   **footer800**: Font size for footer elements at 800px screen width.

**Home Card Content Sizes:**
These properties control the font sizes of titles, dates, and tags displayed within home cards.
*   **hccTitleFull**: Font size for home card titles at full screen width.
*   **hccTitle1400**: Font size for home card titles at 1400px screen width.
*   **hccTitle800**: Font size for home card titles at 800px screen width.
*   **hccDateFull**: Font size for home card dates at full screen width.
*   **hccDate1400**: Font size for home card dates at 1400px screen width.
*   **hccDate800**: Font size for home card dates at 800px screen width.
*   **hccTagsFull**: Font size for home card tags at full screen width.
*   **hccTags1400**: Font size for home card tags at 1400px screen width.
*   **hccTags800**: Font size for home card tags at 800px screen width.

**Home Side Card Content Sizes:**
These properties control the font sizes of content within home side cards and home mobile cards.
*   **hscContentFull**: Font size for home side card content at full screen width.
*   **hscContent1400**: Font size for home side card content at 1400px screen width.
*   **hscContent800**: Font size for home side card content at 800px screen width.

**Author Card Sizes:**
These properties manage the font sizes of author names and descriptions within author cards.
*   **acNameFull**: Font size for author names at full screen width.
*   **acName1400**: Font size for author names at 1400px screen width.
*   **acName800**: Font size for author names at 800px screen width.
*   **acDescFull**: Font size for author descriptions at full screen width.
*   **acDesc1400**: Font size for author descriptions at 1400px screen width.
*   **acDesc800**: Font size for author descriptions at 800px screen width.

**Article Content Sizes:**
These properties dictate the font sizes for article titles, author/date information, tags, and general content within article cards.
*   **artTitleFull**: Font size for article titles at full screen width.
*   **artTitle1400**: Font size for article titles at 1400px screen width.
*   **artTitle800**: Font size for article titles at 800px screen width.
*   **artAuthDateFull**: Font size for article author and date at full screen width.
*   **artAuthDate1400**: Font size for article author and date at 1400px screen width.
*   **artAuthDate800**: Font size for article author and date at 800px screen width.
*   **artTagsFull**: Font size for article tags at full screen width.
*   **artTags1400**: Font size for article tags at 1400px screen width.
*   **artTags800**: Font size for article tags at 800px screen width.
*   **artContentFull**: Font size for general article content at full screen width.
*   **artContent1400**: Font size for general article content at 1400px screen width.
*   **artContent800**: Font size for general article content at 800px screen width.

**Article Side Card Sizes:**
These properties control the font sizes of titles and author information within article side cards.
*   **ascTitleFull**: Font size for article side card titles at full screen width.
*   **ascTitle1400**: Font size for article side card titles at 1400px screen width.
*   **ascTitle800**: Font size for article side card titles at 800px screen width.
*   **ascAuthFull**: Font size for article side card author information at full screen width.
*   **ascAuth1400**: Font size for article side card author information at 1400px screen width.
*   **ascAuth800**: Font size for article side card author information at 800px screen width.