# Website Content Management Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Why This Platform](#why-this-platform)
3. [Site Settings](#site-settings)
4. [Navigation](#navigation)
5. [Pages & Content](#pages--content)
6. [Component Library](#component-library)
7. [Blog Management](#blog-management)
8. [Events Management](#events-management)
9. [Team Members](#team-members)
10. [SEO & Meta Settings](#seo--meta-settings)
11. [Advanced Features](#advanced-features)

---

## Getting Started

### Accessing Sanity Studio

Your website content is managed through **Sanity Studio**, a powerful content management system. To access it:

1. Navigate to your Sanity Studio URL (typically `yoursite.com/admin`)
2. Log in with your credentials
3. You'll see the main navigation on the left side

### Understanding the Interface

The Sanity Studio interface consists of:

- **Left Sidebar**: Main navigation to different content types
- **Center Panel**: List of documents or the document editor
- **Right Panel**: Document actions (Publish, Unpublish, Delete)

### Publishing Changes

After editing any content:

1. Click the **Publish** button in the bottom right
2. Changes will appear on your live website within seconds
3. You can also **Unpublish** to remove content temporarily

---

## Why This Platform

Your website is built on a modern, enterprise-grade technology stack designed for performance, scalability, and search engine success. Here's what makes this platform exceptional:

### 🚀 Built with Next.js

**Next.js** is a cutting-edge React framework that powers some of the world's most successful websites, including Netflix, Uber, and Nike.

**Benefits for your website**:

- **Lightning-Fast Performance**: Pages load almost instantly thanks to server-side rendering and automatic code splitting
- **Better SEO Out of the Box**: Search engines can fully crawl and index your content, unlike traditional React apps
- **Automatic Optimization**: Images, fonts, and code are automatically optimized without any manual effort
- **Future-Proof Technology**: Built on modern web standards that will remain relevant for years to come
- **Progressive Enhancement**: Works even with JavaScript disabled, ensuring maximum accessibility

**What this means for you**:

- Happier visitors who don't wait for slow pages
- Higher search engine rankings
- Lower bounce rates
- Better mobile experience
- Professional, enterprise-level website infrastructure

### ☁️ Hosted on Vercel

Your website is hosted on **Vercel**, the platform created by the makers of Next.js, ensuring optimal performance and reliability.

**Hosting advantages**:

- **Global CDN**: Your website is served from 100+ locations worldwide, meaning fast load times everywhere
- **99.99% Uptime**: Enterprise-grade reliability with minimal downtime
- **Automatic SSL**: Your site is always secure with HTTPS, required for modern SEO
- **Instant Deployments**: Content changes appear live within seconds, not minutes or hours
- **Automatic Scaling**: Handles traffic spikes effortlessly, from 10 to 10,000 visitors
- **DDoS Protection**: Built-in security against malicious attacks
- **Edge Network**: Content delivered from the server closest to each visitor
- **Zero Configuration**: No server maintenance, security patches, or technical overhead

**What this means for you**:

- Your website is always fast, regardless of visitor location
- No worrying about server crashes or downtime
- Secure by default with automatic updates
- Can handle viral traffic without breaking
- Focus on content, not infrastructure

### 🔍 SEO-Optimized Architecture

This platform is engineered for search engine success from the ground up.

**Built-in SEO features**:

- **Server-Side Rendering (SSR)**: Search engines see fully-rendered HTML, not empty JavaScript shells
- **Automatic Sitemap Generation**: Search engines automatically discover all your pages
- **Structured Data / Schema Markup**: Rich snippets in search results (star ratings, event dates, breadcrumbs)
- **Meta Tag Management**: Complete control over titles, descriptions, and Open Graph tags for social sharing
- **Semantic HTML**: Proper heading hierarchy and semantic tags that search engines understand
- **Clean URL Structure**: SEO-friendly URLs without query parameters or hashes
- **Canonical URLs**: Prevents duplicate content issues
- **Robots.txt & Meta Robots**: Fine-grained control over what gets indexed
- **Image Optimization**: Automatic lazy loading, responsive images, and next-gen formats (WebP)
- **Core Web Vitals Optimization**: Meets Google's performance standards for ranking

**Structured Data Implementation**:

Your website automatically generates JSON-LD structured data for:

- **Organization Schema**: Company information, logo, social profiles
- **Breadcrumbs**: Navigation trails in search results
- **Blog Posts**: Article schema with author, publish date, and images
- **Events**: Event schema with dates, locations, and ticket information
- **Team Members**: Person schema with roles and contact information
- **FAQ Sections**: FAQ schema for rich snippets in search results

**What this means for you**:

- Better search engine rankings
- Higher click-through rates from search results
- Rich snippets (star ratings, breadcrumbs, event details)
- Increased organic traffic
- Better visibility in Google, Bing, and other search engines

### ♿ Accessibility Compliance (WCAG 2.1)

Built with accessibility best practices to ensure your website is usable by everyone, including people with disabilities.

**Accessibility features**:

- **Semantic HTML5**: Proper use of headings, landmarks, and ARIA labels
- **Keyboard Navigation**: Full site navigation without a mouse
- **Screen Reader Compatible**: Optimized for JAWS, NVDA, and VoiceOver
- **Focus Indicators**: Clear visual feedback for keyboard users
- **Color Contrast**: Text meets WCAG AA standards for readability
- **Alt Text Support**: Built-in fields for image descriptions
- **Form Labels**: Proper labeling and error messaging
- **Skip Links**: Quick navigation to main content
- **Responsive Typography**: Text scales properly for vision impairments
- **No Motion Preferences**: Respects user settings for reduced motion

**ARIA Implementation**:

- Proper roles, states, and properties
- Live regions for dynamic content updates
- Accessible modals and pop-ups
- Clear button and link labeling

**What this means for you**:

- Reaches a wider audience (15% of the world has a disability)
- Legal compliance with ADA and Section 508
- Better SEO (Google considers accessibility in rankings)
- Improved user experience for all visitors
- Corporate responsibility and inclusivity

### ⚡ Performance & Speed

Optimized for lightning-fast loading and excellent user experience.

**Performance features**:

- **Automatic Code Splitting**: Only loads JavaScript needed for current page
- **Lazy Loading**: Images load as you scroll, not all at once
- **Image Optimization**: Automatic resizing, compression, and format conversion
- **Font Optimization**: Self-hosted fonts with automatic subsetting
- **Prefetching**: Next pages load in background before you click
- **Compression**: Gzip/Brotli compression for smaller file sizes
- **Caching Strategy**: Smart caching for instant repeat visits
- **Minimal JavaScript**: Only essential code is loaded

**Performance metrics**:

- **Lighthouse Score**: Typically 90-100/100
- **First Contentful Paint**: Under 1.5 seconds
- **Time to Interactive**: Under 3 seconds
- **Largest Contentful Paint**: Under 2.5 seconds

**What this means for you**:

- Better Google rankings (speed is a ranking factor)
- Lower bounce rates
- Higher conversion rates
- Better mobile experience
- Reduced server costs

### 🛡️ Security & Reliability

Enterprise-grade security built into every layer.

**Security features**:

- **Automatic HTTPS**: All traffic encrypted with SSL/TLS
- **Content Security Policy**: Protection against XSS attacks
- **CORS Protection**: Prevents unauthorized data access
- **Sanitized Inputs**: Protection against code injection
- **Secure Headers**: HSTS, X-Frame-Options, and more
- **DDoS Mitigation**: Built-in protection against attacks
- **Regular Updates**: Automatic security patches
- **ISO 27001 Compliance**: Enterprise security standards

**What this means for you**:

- Protected user data
- Safe from common web vulnerabilities
- Trust signals for visitors (padlock icon)
- PCI compliance ready for e-commerce
- Peace of mind

### 📱 Mobile-First & Responsive

Designed for the mobile-first world where 60%+ of traffic comes from phones and tablets.

**Mobile features**:

- **Responsive Design**: Perfect display on any screen size
- **Touch-Optimized**: Tap targets sized for fingers, not mouse cursors
- **Fast Mobile Loading**: Optimized for 3G/4G connections
- **Mobile Gestures**: Swipe navigation where appropriate
- **Progressive Web App Ready**: Can be installed like a native app
- **Offline Support**: Content caching for unreliable connections

**What this means for you**:

- Better mobile SEO (Google uses mobile-first indexing)
- Higher conversion rates on mobile devices
- Competitive advantage over non-responsive sites
- Future-ready for new devices

### 📊 Analytics & Insights Ready

Easy integration with analytics and tracking tools.

**Supported integrations**:

- **Google Analytics 4**: Built-in support for GA4
- **Google Tag Manager**: Full GTM integration
- **Facebook Pixel**: Social media tracking
- **Event Tracking**: Custom conversion tracking
- **Heatmaps**: Compatible with tools like Hotjar
- **A/B Testing**: Ready for optimization tools

**What this means for you**:

- Understand your audience
- Track conversions and goals
- Make data-driven decisions
- Measure marketing ROI

### 🎨 Sanity CMS - Best-in-Class Content Management

Your content is managed through **Sanity.io**, a modern headless CMS used by companies like Figma, Sonos, and Spotify.

**Sanity advantages**:

- **Real-Time Collaboration**: Multiple editors can work simultaneously
- **Revision History**: Restore previous versions of any content
- **Scheduled Publishing**: Schedule content to go live automatically
- **Content Portability**: Your content can be used anywhere (web, mobile apps, displays)
- **Flexible Content Modeling**: Adapts to your needs, not the other way around
- **Image Pipeline**: Automatic image optimization and transformation
- **Localization Ready**: Multi-language support built-in
- **Custom Workflows**: Approval processes and content governance
- **API-First**: Content accessible via API for future projects

**What this means for you**:

- Intuitive, user-friendly editing experience
- No technical knowledge required
- Safe content with backups and version control
- Fast, responsive admin interface
- Investment protection (your content isn't locked in)

### 🔄 Headless Architecture Benefits

This website uses a "headless" architecture, separating content management from presentation.

**Headless advantages**:

- **Omnichannel Ready**: Same content can power website, mobile apps, digital signage, etc.
- **Future-Proof**: Frontend can be updated without touching content
- **Better Security**: Admin panel separated from public website
- **Performance**: Content delivered through ultra-fast APIs
- **Developer Friendly**: Easy to add new features and integrations
- **Content Reusability**: Create once, publish everywhere

**What this means for you**:

- Technology that evolves with your business
- Easy to add new channels (apps, kiosks, etc.)
- More secure admin access
- Lower long-term costs

### 💰 Cost Efficiency

Modern infrastructure that's more economical than traditional hosting.

**Cost savings**:

- **No Server Management**: No need for dedicated DevOps team
- **Automatic Scaling**: Pay only for what you use
- **Reduced Bandwidth**: CDN and optimization reduce data transfer
- **Lower Maintenance**: Automatic updates and patches
- **Better Conversion Rates**: Fast sites convert better, increasing ROI

**What this means for you**:

- Lower total cost of ownership
- Predictable monthly costs
- Better return on marketing spend
- No surprise hosting bills

### 🌱 Environmentally Friendly

Built on infrastructure committed to sustainability.

**Green benefits**:

- **Carbon-Neutral Hosting**: Vercel runs on renewable energy
- **Efficient Code**: Optimized to use minimal server resources
- **CDN Efficiency**: Serving content from nearest location reduces energy use
- **Image Optimization**: Smaller files mean less data transfer and energy

**What this means for you**:

- Corporate sustainability goals
- Reduced carbon footprint
- Alignment with environmental values

---

## Why Choose This Over WordPress or Other Platforms?

### vs. WordPress

| Feature         | This Platform                   | WordPress                          |
| --------------- | ------------------------------- | ---------------------------------- |
| **Speed**       | Lightning fast (90+ Lighthouse) | Often slow (60-70 Lighthouse)      |
| **Security**    | Automatic, built-in             | Requires constant updates, plugins |
| **Maintenance** | Zero maintenance                | Regular updates, plugin conflicts  |
| **Scalability** | Infinite, automatic             | Requires server upgrades           |
| **SEO**         | Optimized by default            | Requires plugins, configuration    |
| **Mobile**      | Perfect on all devices          | Theme-dependent, often issues      |
| **Editor**      | Modern, intuitive               | Can be clunky, overwhelming        |
| **Updates**     | Publish in seconds              | Can take minutes, caching issues   |

### vs. Wix/Squarespace

| Feature           | This Platform                | Wix/Squarespace             |
| ----------------- | ---------------------------- | --------------------------- |
| **Performance**   | Optimized for speed          | Often bloated and slow      |
| **SEO**           | Full control, best practices | Limited control             |
| **Customization** | Fully custom design          | Template-based limitations  |
| **Ownership**     | You own your content         | Locked into platform        |
| **Scalability**   | Enterprise-grade             | Limited                     |
| **Code Quality**  | Clean, semantic HTML         | Often messy, redundant code |

### vs. Traditional Custom Development

| Feature            | This Platform       | Custom Build            |
| ------------------ | ------------------- | ----------------------- |
| **Time to Launch** | Weeks               | Months                  |
| **Cost**           | Moderate            | Very High               |
| **Maintenance**    | Automatic           | Ongoing developer costs |
| **Updates**        | Easy, non-technical | Requires developers     |
| **Technology**     | Cutting-edge        | Often outdated quickly  |
| **Support**        | Platform-backed     | Developer-dependent     |

---

## The Bottom Line

This platform represents the future of web development: fast, secure, accessible, and built for growth. You get enterprise-level technology without enterprise-level complexity or cost.

**Your benefits summarized**:

- ✅ Top search engine rankings
- ✅ Lightning-fast performance
- ✅ Accessible to all users
- ✅ Secure by default
- ✅ Easy to manage
- ✅ Scalable to any size
- ✅ Future-proof technology
- ✅ Cost-effective
- ✅ Professional appearance
- ✅ Mobile-optimized

You're not just getting a website—you're getting a competitive advantage.

---

## Site Settings

Site Settings control global features of your website. Access them through **Site Settings** in the left sidebar.

### 404 Page

**What it is**: The page visitors see when they access a non-existent URL

**How to edit**:

1. Go to Site Settings → 404 Page
2. Add a title and body content explaining the error
3. Optionally add an image
4. Include helpful navigation links or a button
5. Publish

### Breadcrumbs

**What it is**: Navigation trail showing the user's location (e.g., Home > About > Team)

**How to edit**:

1. Go to Site Settings → Breadcrumbs
2. Choose which pages should display breadcrumbs
3. Customize the appearance
4. Publish

### Cookie Pop Up

**What it is**: GDPR/privacy notification that appears to visitors

**How to edit**:

1. Go to Site Settings → Cookie Pop Up
2. Write your cookie policy message
3. Add Accept/Decline buttons with links to your privacy policy
4. Customize colors and timing
5. Publish

### Google Analytics & Tracking

**What it is**: Connects your Google Analytics account to track website visitors

**How to set up**:

1. Go to Site Settings → Google Analytics & Tracking
2. Enter your Google Analytics Measurement ID (starts with "G-")
3. Optionally add Google Tag Manager ID
4. Publish

### Google Translate

**What it is**: Automatic translation widget for multilingual visitors

**How to enable**:

1. Go to Site Settings → Google Translate
2. Toggle "Enable Google Translate" on
3. Select default language
4. Publish

### Meta Settings (Global)

**What it is**: Default SEO settings that apply across your entire website

**How to configure**:

1. Go to Site Settings → Meta Settings (Global)
2. **Global Meta Title**: Your site name (e.g., "Acme Corporation")
   - This gets appended to every page: "About Us | Acme Corporation"
3. **Global Meta Description**: Default description for search engines (70-160 characters)
   - Used when individual pages don't have their own description
4. **Meta Image**: Default social sharing image (1200x630px recommended)
   - Appears when your site is shared on Facebook, Twitter, etc.
5. Publish

### URL Redirects

**What it is**: Redirect old URLs to new ones (useful when restructuring your site)

**How to add redirects**:

1. Go to Site Settings → URL Redirects
2. Click "Add Redirect"
3. **Source**: Old URL path (e.g., `/old-page`)
4. **Destination**: New URL path (e.g., `/new-page`)
5. **Permanent**: Choose "Yes" for 301 redirects (recommended)
6. Add as many redirects as needed
7. Publish

---

## Navigation

### Header

**What it is**: The top navigation bar of your website

**How to edit**:

1. Go to **Header** in the left sidebar
2. **Header Banner**: Optional announcement bar above main header
   - Click "Add Banner" to create one
   - Enter text and optionally link to a page
3. **Page Layout**: Your navigation menu
   - Click "+ Add" to add navigation items
   - Choose from:
     - **Page**: Link to an existing page
     - **Link**: Link to external site or file
     - **Header Dropdown**: Multi-level menu
4. **Button**: Optional CTA button in header
5. **Header Type**: Choose navigation behavior:
   - **Disappearing Header**: Hides on scroll down, appears on scroll up (default)
   - **Sticky Header**: Always visible at top
   - **Sticky Dynamic Header**: Stays visible but shrinks when scrolling
6. Publish

**Adding a Dropdown Menu**:

1. In Page Layout, click "+ Add" → Header Dropdown
2. Give it a name (e.g., "Services")
3. In "Dropdown Items", add pages or links
4. Publish

### Footer

**What it is**: The bottom section of your website

**How to edit**:

1. Go to **Footer** in the left sidebar
2. **Contact Phone**: Your business phone number
3. **Address**: Multi-line address field
4. **Address Map Link**: Google Maps URL
5. **Social Icons**: Add social media links
   - Click "+ Add" and select platform
   - Enter the URL to your profile
6. **Page Layout**: Footer navigation links
   - Add pages or external links
7. Publish

---

## Pages & Content

### Home Page

**What it is**: Your website's main landing page

**How to edit**:

1. Go to **Home Page** in the left sidebar
2. **Page Layout**: Add and arrange components
3. **Meta Tab**: SEO settings for homepage
4. Publish

### Creating a New Page

1. Go to **Pages** in the left sidebar
2. Click the "+" button to create new
3. Fill in required fields:
   - **Page Name**: Internal reference (not visible on site)
   - **Navigation Name**: Display name in menus
   - **URL Slug**: URL path (e.g., "about-us" becomes yoursite.com/about-us)

### Building Page Content

Click into the **Page Layout** field and click "+ Add" to add components:

#### Sorting Components

- **Drag and drop** components using the handle icon (⋮⋮) to reorder
- Components appear on the page in the order listed

#### Duplicating Components

1. Click the three dots (•••) on any component
2. Select "Duplicate"
3. Edit the duplicated content

#### Deleting Components

1. Click the three dots (•••) on any component
2. Select "Delete"
3. Confirm deletion

### Page Privacy Settings

**Password Protection**:

1. Open any page
2. Scroll to **Privacy** section
3. Toggle "Password Protected" on
4. Enter a password
5. Publish
6. Visitors must enter this password to view the page

**Hide from Search Engines**:

1. In Privacy section
2. Toggle "No Index" on
3. Search engines won't index this page

---

## Component Library

Each component has **Section Styles** with these options:

### Section Styles (Available on Most Components)

**Colors**:

- Background Color
- Overlay Color (for images)
- Title Text Color
- Subtitle Text Color
- Body Text Color

**Text Sizes**:

- Title Text Size
- Subtitle Text Size
- Body Text Size

**Alignment**:

- Text Alignment: Left, Center, Right
- Column Alignment: Top, Center, Bottom

**Spacing**:

- Padding Top: None, Small, Medium, Large, Extra Large
- Padding Bottom: None, Small, Medium, Large, Extra Large

### Advanced Options (Most Components)

Most components have an **Advanced** section with:

**Hide Section**: Temporarily hide without deleting

- Toggle on to hide from website
- Component shows "**_ HIDDEN _**" label in Sanity

**Expiration Date**: Auto-hide after a date

- Component disappears from site after this date
- Shows "**_ EXPIRED _**" label in Sanity

**Scheduled Release Date**: Auto-show after a date

- Component hidden until this date
- Shows "**_ SCHEDULED _**" label in Sanity

**Anchor Tag Link**: Create in-page links

- Assign an ID (e.g., "pricing")
- Link to it using #pricing anywhere on site

---

## Component Reference

### 1. Audio Player

**Purpose**: Embed audio files with play controls

**How to add**:

1. Add "Audio Player" component
2. **Section Name**: Internal reference
3. **Audio Title**: Displayed on the player
4. **Audio File**: Upload your audio file (MP3, WAV, etc.)
5. **Allow Download**: Toggle to let visitors download the file
6. Configure Section Styles
7. Save

**Best practices**:

- Keep audio files under 10MB for faster loading
- Use descriptive titles

---

### 2. Blog Post Grid

**Purpose**: Display blog posts in a grid layout

**How to add**:

1. Add "Blog Post Grid" component
2. **Title**: Grid heading
3. Choose population method:
   - **Auto Populate**: Shows all blog posts automatically
   - **Auto Populate by Tag**: Filter by specific category
   - **Manual Selection**: Choose specific posts
4. **Show Featured Post**: Display first post larger
5. **Limit to 3 Posts**: Show only 3 posts
6. **Show Filter**: Enable category filtering for visitors
7. **Button**: Optional "View All Blogs" button
8. Configure Section Styles
9. Save

**Best practices**:

- Use auto-populate for dynamic, always-updated grids
- Use manual selection for curated content

---

### 3. Card Grid

**Purpose**: Display information in card layouts

**How to add**:

1. Add "Card Grid" component
2. **Title**: Grid heading
3. **Card Type**: Choose style:
   - **Standard Card**: Image + text + button (3:2 image ratio)
   - **Background Image Card**: Text overlays image
   - **Expandable Card**: Click to reveal more content (1:1 image ratio)
4. **Grid Columns**: 2, 3, or 4 columns
5. Click "+ Add Card" to add cards:
   - Upload image
   - Enter title and description
   - Add optional button
6. Configure Section Styles and Card Styles separately
7. Save

**Image requirements**:

- Standard Card: 3:2 ratio (e.g., 1200x800px)
- Expandable Card: 1:1 ratio (e.g., 800x800px)

---

### 4. Code Embed

**Purpose**: Embed third-party widgets, iframes, or custom HTML

**How to add**:

1. Add "Code Embed" component
2. **Embed Type**: Choose "iframe" or "other"
3. **Iframe Size** (if iframe selected):
   - Width: e.g., 1526
   - Height: e.g., 1080
   - Creates aspect ratio for responsive scaling
4. **Code**: Paste your embed code
5. Configure Section Styles
6. Save

**Examples**:

- Google Maps iframes
- Calendar widgets
- Social media feeds
- Form embeds

---

### 5. Contact Form

**Purpose**: Formspree-powered contact form

**How to set up**:

1. Create account at formspree.io
2. Create a form and copy the endpoint URL
3. Add "Contact Form" component in Sanity
4. **Title** and **Body**: Form introduction
5. **Social Icons**: Optional social media links
6. **Formspree Endpoint**: Paste your endpoint URL
7. **Contact Fields**: Pre-populated with Name, Email, Message
   - Click "+ Add Field" to add more:
     - **Field Type**: Text, Email, Phone, Textarea, Dropdown, Checkbox
     - **Label**: Field name
     - **Is Required**: Toggle for required fields
     - **Options**: For dropdown/checkbox, add choices
8. **On Form Submit Link**: Select thank you page (recommended)
9. Configure Section Styles
10. Save and Publish

**Best practices**:

- Always set a thank you page
- Mark email and name as required
- Keep forms short for better completion rates

---

### 6. Event Calendar

**Purpose**: Display events in calendar view

**How to add**:

1. Add "Event Calendar" component
2. **Title** and **Body**: Calendar introduction
3. Configure Section Styles
4. Save

**Note**: Events are added separately in the Events section (see Events Management below)

---

### 7. Flex Columns

**Purpose**: Two-column flexible layout with mixed content

**How to add**:

1. Add "Flex Columns" component
2. **Column 1 Width**: Adjust slider (50% = equal columns)
3. **Vertical Alignment**: Top or Center
4. **Column 1**: Click "+ Add" to add content:
   - Card
   - Image
   - Rich Text
   - Text Section
   - Text Accordion
5. **Column 2**: Add content the same way
6. Configure Section Styles
7. Save

**Use cases**:

- Image beside text
- Two text columns
- Card beside accordion
- Any combination of content types

---

### 8. Hero Image

**Purpose**: Large banner image with optional text overlay

**How to add**:

1. Add "Hero Image" component
2. **Title**: Main hero text (displays over image)
3. **Image**: Upload hero image
4. **Selected Layout**:
   - **Default Height**: Full viewport height with button option
   - **Condensed Height**: Half viewport height
   - **Banner Height**: Quarter viewport height
5. **Button**: CTA button (only for Default Height)
6. **Enable Parallax**: Toggle parallax scroll effect
7. Configure Section Styles for:
   - Overlay color (darken/lighten image)
   - Text color
   - Text alignment
8. Save

**Image requirements**:

- Minimum 1526px wide
- Landscape orientation
- Place important content center-frame (safe for text overlay)

---

### 9. Image & Text

**Purpose**: Image alongside or above/below text content

**How to add**:

1. Add "Image & Text" component
2. **Title** and **Body**: Text content (supports rich text)
3. **Button**: Optional CTA
4. **Image**: Upload image
5. **Selected Layout**:
   - **Full Bleed Image**: Image spans full width
   - **Row**: Side-by-side (default)
   - **Column**: Stacked vertically
6. **Photo Side**: Left or Right (for Row layout)
7. **Full Background Color**: Full width or half width background
8. Configure Section Styles
9. Save

**Best practices**:

- Use square or portrait images for Row layout
- Use landscape images for Column layout

---

### 10. Image Carousel

**Purpose**: Scrollable image slider

**How to add**:

1. Add "Image Carousel" component
2. **Images**: Add minimum 3 images
   - Click "+ Add Image"
   - Upload each image
   - Add alt text for accessibility
   - Optionally link images to pages or URLs
3. **Component Width**: Default or Full Width
4. **Aspect Ratio**: 16x9, 6x4, 4x3, or 1x1
5. **Image Margin**: No Space or Add Space between images
6. **Auto Play Options**:
   - **Disabled**: Manual navigation only
   - **Auto Play**: Automatic progression
   - **Auto Scroll**: Continuous scroll effect
7. **Scroll Direction**: Forward or Backward (for Auto Scroll)
8. **Speed**: Slow (6s), Medium (4s), Fast (2s)
9. **Show Controls**: Toggle navigation arrows/dots
10. Configure Section Styles
11. Save

**Image requirements**:

- All images should match the selected aspect ratio
- Minimum 1200px wide recommended

---

### 11. Image Section

**Purpose**: Single image or interactive hotspot image

**How to add**:

1. Add "Image Section" component
2. **Image Type**:
   - **Standard Image**: Regular image
   - **Hotspot Image**: Interactive image with clickable points
3. **Selected Layout**: Inset or Full Width
4. For Standard Image:
   - Upload image
   - Optionally link or add modal
5. For Hotspot Image:
   - Select or create hotspot image (see Hotspot Images section)
6. Configure Section Styles (background, overlay, padding)
7. Save

**Creating Hotspot Images**:

1. Go to Content → Hotspot Images
2. Click "+" to create new
3. Upload your base image
4. **Background Color**: Color for hotspot dots
5. Click "+ Add Hotspot"
6. Click on image to place hotspot (draggable)
7. Enter details that appear on click
8. Add multiple hotspots as needed
9. Publish

**Use cases**:

- Product features
- Office floor plans
- Interactive infographics
- Annotated screenshots

---

### 12. Logo Grid

**Purpose**: Display partner/client logos or brand images

**How to add**:

1. Add "Logo Grid" component
2. **Title** and **Body**: Grid introduction
3. **Grid Layout**: Add logo images
   - Click "+ Add Image"
   - Upload logo (PNG with transparency recommended)
   - Add alt text
   - Optionally link to company website
4. **Selected Layout**:
   - **Same Width**: All logos same width
   - **Same Height**: All logos same height (recommended)
5. Configure Section Styles
6. Save

**Best practices**:

- Use consistent logo formats (all color or all monochrome)
- PNG format with transparent background
- Similar dimensions for uniformity

---

### 13. Newsletter Form

**Purpose**: Email newsletter signup

**How to add**:

1. Add "Newsletter Form" component
2. **Title** and **Body**: Form introduction
3. **Image**: Optional image (for Layout 2)
4. **On Form Submit Link**: Required thank you page
5. **Selected Layout**:
   - **Newsletter Form**: Simple email input
   - **Newsletter Form with Image**: Email input with side image
6. Configure Section Styles
7. Save

**Note**: Requires form backend integration (Formspree or similar)

---

### 14. Pop Up

**Purpose**: Modal window that appears when section scrolls into view

**How to add**:

1. Add "Pop Up" component
2. **Delay Time**: 0s, 1s, or 2s after scrolling into view
3. **Body**: Pop-up content (rich text with images, videos, buttons)
4. Configure Section Styles (text alignment)
5. Save

**Best practices**:

- Keep content concise
- Use sparingly (1 per page maximum)
- Include clear close button message
- Don't overuse pop-ups as they can frustrate visitors

**How it works**:

- Invisible trigger placed in page flow
- When user scrolls to trigger, pop-up appears after delay
- Click outside or close button to dismiss

---

### 15. Rich Text Section

**Purpose**: WYSIWYG editor for complex text formatting

**How to add**:

1. Add "Rich Text Section" component
2. **Body**: Use the rich text editor
   - **Bold**, _italic_, underline text
   - Headings (H2-H5)
   - Bulleted and numbered lists
   - Links (internal pages or external URLs)
   - Text color
   - Insert images
   - Embed videos (YouTube)
   - Add buttons
   - Insert social media icons
3. **Section Width**: Adjust text column width
4. Configure Section Styles
5. Save

**Text editor features**:

- Drag and drop to rearrange content
- Click "+" to add new blocks
- Use toolbar for formatting
- Preview changes in real-time

---

### 16. Team Grid

**Purpose**: Display team member profiles in grid

**How to add**:

1. Add "Team Grid" component
2. **Title**: Grid heading
3. **Grid Layout**: Select team members
   - Click to select from existing team members
   - Must create team members first (see Team Members section)
4. Configure Section Styles
5. Save

---

### 17. Text Accordion

**Purpose**: Expandable/collapsible text sections

**How to add**:

1. Add "Text Accordion" component
2. **Title** and **Subtitle**: Accordion introduction
3. **Accordion Items**: Click "+ Add Accordion Item"
   - **Title**: Clickable header
   - **Body**: Hidden content (rich text)
   - Add multiple items
4. **Selected Layout**:
   - **One Column**: Vertical stack (default)
   - **Two Column**: Side by side
   - **Two Column - Alt**: Alternate style with button option
5. **Button**: Optional CTA (Layout 3 only)
6. **FAQ**: Toggle if this is FAQ content (helps SEO)
7. Configure Section Styles
8. Save

**Best practices**:

- Use descriptive titles
- Keep individual items concise
- Great for FAQs, product specs, or lengthy content

---

### 18. Text Section

**Purpose**: Multi-column text layout

**How to add**:

1. Add "Text Section" component
2. **Number of Columns**: 1, 2, or 3
3. For each column:
   - **Title**: Column heading
   - **Subtitle**: Optional subheading
   - **Body**: Text content (rich text)
   - **Button**: Optional CTA
4. **Column Width**: Adjust for 1-column layout
5. Configure Section Styles
6. Save

**Use cases**:

- Features overview
- Service descriptions
- Multi-point content
- Comparison layouts

---

### 19. Video & Text

**Purpose**: Video player with optional text content

**How to add**:

1. Add "Video & Text" component
2. **Title** and **Subtitle**: Optional text above video
3. **Button**: Optional CTA
4. **Selected Layout**:
   - **Background Video**: Auto-plays with no sound (ambient)
   - **Standard Video**: Click-to-play with controls
5. **Video Type**: Vimeo or YouTube
6. For Background Video (Vimeo only):
   - Enter Vimeo ID or share URL
   - Toggle "Darken Video" for text readability overlay
7. For Standard Video:
   - **Vimeo**: Enter Vimeo ID or URL
   - **YouTube**: Enter full YouTube URL
   - **Video Thumbnail**: Upload custom 16:9 thumbnail image
8. Configure Section Styles
9. Save

**Video requirements**:

- Background videos: Must be Vimeo, keep under 1 minute, optimize for auto-play
- Standard videos: Any platform, add engaging thumbnail
- Thumbnail: 1526x1080px recommended

---

### 20. Video - Mux Plugin

**Purpose**: Advanced video hosting with Mux (self-hosted alternative)

**How to add**:

1. Add "Video - Mux Plugin" component
2. **Video**: Upload video file (Mux processes automatically)
3. **Mux Options**:
   - **Autoplay**: Start playing on page load
   - **Loop**: Replay when finished
   - **Downloadable**: Allow video download
   - **Hide Controls**: Remove player controls
4. **Title** and **Subtitle**: Optional text content
5. Configure Section Styles
6. Save

**When to use Mux**:

- Need full control over video hosting
- Want download protection
- Require detailed analytics
- Need faster loading than YouTube/Vimeo

---

## Blog Management

### Creating Blog Posts

1. Go to **Blogs** in left sidebar
2. Click "+" to create new post
3. **Title**: Post title (required)
4. **URL Slug**: Automatically generated from title
   - All blog URLs start with `/blog/`
   - Example: `blog/our-latest-news`
5. **Page Layout**: Add components to build your post
   - Use Image & Text, Rich Text Section, etc.
   - Same components as regular pages
6. **Tags**: Select categories (create in Blog Tags if needed)
7. **Author**: Select blog author (create in Blog Authors if needed)
8. **Date Published**: Post date (required)
9. **Thumbnail Image**: Square image for grid view (1:1 ratio)
10. **Featured Image**: Hero image for post page (16:9 ratio)

### Managing Blog Authors

1. Go to **Blog Authors** (if available in sidebar)
2. Create author profiles with:
   - Name
   - Photo
   - Bio
   - Social links

### Managing Blog Tags/Categories

1. Go to **Blog Tags** (if available in sidebar)
2. Create category tags:
   - Tag name (e.g., "Company News", "Product Updates")
3. Use these tags when creating posts

### Blog Best Practices

- **Images**: Always add alt text for accessibility
- **Thumbnails**: Use consistent dimensions (800x800px recommended)
- **Featured Images**: Eye-catching, relevant images (1526x1080px)
- **Length**: Aim for 800-1500 words for SEO
- **Tags**: Use consistently (max 3-4 per post)
- **Publishing**: Set accurate publish dates for chronological sorting

---

## Events Management

### Creating Events

1. Go to **Events** in left sidebar
2. Click "+" to create new event
3. **Title**: Event name (required)
4. **URL Slug**: Auto-generated URL
   - All event URLs start with `/events/`
5. **Page Layout**: Build event page with components
6. **Event Image**: 16:9 ratio image for calendar and page
7. **Event Date & Time**: When event starts (required)
8. **All Day Event**: Toggle if no specific time
9. **Duration**: Event length in hours
10. **Location**: Event venue or address
11. **Location URL**: Google Maps link
12. **Event Description**: Brief description for calendar view
13. **Meta Settings**: SEO for event page

### Event Calendar Display

Events automatically appear in:

- Event Calendar component (on pages where you add it)
- Events listing page
- Chronologically sorted by date

### Event Best Practices

- **Dates**: Set accurate date/time for calendar accuracy
- **Images**: Use consistent aspect ratio (16:9)
- **Descriptions**: Brief (2-3 sentences) for calendar, detailed in Page Layout
- **Location URLs**: Always include for easy navigation

---

## Team Members

### Creating Team Members

1. Go to **Team Members** in left sidebar
2. Click "+" to create new member
3. **Image**: Profile photo (3:4 aspect ratio portrait recommended)
4. **Person Name**: Full name
5. **Position**: Job title or role
6. **URL Slug**: Auto-generated profile URL
   - All team URLs start with `/our-team/`
7. **Bio**: Rich text biography
8. **Email Address**: Contact email
9. **Phone**: Phone number in format (###) ###-####
10. **Social Icons**: Add social media profiles
11. Publish

### Adding Team Members to Pages

1. Add "Team Grid" component to any page
2. Select team members from the list
3. They display as clickable cards linking to profiles

### Team Member Best Practices

- **Photos**: Professional headshots, consistent style
- **Aspect Ratio**: 3:4 portrait (e.g., 800x1067px)
- **Bios**: 2-3 paragraphs, professional but personable
- **Consistency**: Use same photo style for all team members

---

## SEO & Meta Settings

### Page-Level SEO

Every page and blog post has a **Meta** tab:

1. **Meta Title**:
   - Page-specific SEO title
   - Appears in search results and browser tabs
   - Recommended: 50-60 characters
   - Gets appended with Global Meta Title
   - Example: "About Us" becomes "About Us | Acme Corporation"

2. **Meta Description**:
   - Brief page summary for search engines
   - Appears in search results
   - Recommended: 70-160 characters
   - Be descriptive and include keywords

3. **Meta Image**:
   - Image shown when page shared on social media
   - Recommended: 1200x630px
   - Shows in Facebook, Twitter, LinkedIn shares
   - Fallbacks to Global Meta Image if not set

### SEO Best Practices

**Titles**:

- Include primary keyword
- Be specific and descriptive
- Don't stuff keywords
- Make it compelling to click

**Descriptions**:

- Write for humans, not just search engines
- Include call-to-action
- Accurately describe page content
- Include 1-2 keywords naturally

**Images**:

- Use high-quality images
- Include relevant imagery
- Add text overlay for clarity
- Test preview on social media

### URL Slugs

- Automatically generated from titles
- Can be manually edited
- Should be:
  - Short and descriptive
  - Lowercase
  - Use hyphens (not underscores)
  - Include keywords
  - Avoid special characters

**Examples**:

- Good: `/about-our-company`
- Bad: `/about_Our_Company!`

---

## Advanced Features

### Buttons

Buttons appear in many components. When adding a button:

1. **Text**: Button label
2. **Button Color**: Select from theme colors
3. **Button Style**: Solid or Outline
4. **Link Type**: Choose destination:
   - **Internal Link**: Link to a page on your site
   - **Internal Link with Anchor**: Jump to section on a page
   - **External Link**: Link to another website
   - **Download**: File download
   - **Email**: Opens email client
5. Configure based on link type selected
6. **Target**: New Tab or Same Tab (for external links)
7. **Tracking ID**: Optional analytics identifier

### Links

Similar to buttons but text-based:

1. **Link Text**: Display text
2. **Link Type**: Same options as buttons
3. Configure destination
4. **Tracking ID**: Optional

### Internal Links with Anchors

Create jump links to specific sections:

1. On target component, scroll to **Advanced**
2. Enter **Anchor Tag Link** ID (e.g., "pricing")
3. Publish page
4. In button/link, select "Internal Link with Anchor"
5. Select the page
6. Select the anchor tag
7. Link will jump to that section

**Example**: "Learn More" button jumps to pricing section on same page

### Scheduling Content

Automatically show/hide components:

**Scheduled Release**:

1. Scroll to component's **Advanced** section
2. Set **Scheduled Release Date**
3. Component hidden until that date/time
4. Shows "**_ SCHEDULED _**" label in Sanity
5. Publish

**Expiration**:

1. In **Advanced** section
2. Set **Expiration Date**
3. Component automatically hides after that date/time
4. Shows "**_ EXPIRED _**" label in Sanity
5. Publish

**Use cases**:

- Holiday promotions
- Event announcements
- Seasonal content
- Time-sensitive offers

### Hiding Components

Temporarily hide without deleting:

1. Scroll to component's **Advanced** section
2. Toggle **Hide Section** on
3. Component disappears from website
4. Shows "**_ HIDDEN _**" label in Sanity
5. Publish
6. Toggle off and republish to restore

**Use cases**:

- Test content before going live
- Temporarily remove without losing work
- Seasonal content to reuse

### Working with Images

**Upload Best Practices**:

- **Maximum size**: 5-10MB per image
- **Format**: JPG for photos, PNG for graphics/logos
- **Dimensions**: At least 1526px wide for full-width images
- **Optimization**: Compress before upload using TinyPNG or similar

**Alt Text**:

- Always add alt text for accessibility
- Describe what's in the image
- Be concise (1-2 sentences)
- Include keywords naturally
- Required for screen readers

**Hotspot & Crop**:

- Click image to set focal point
- Drag rectangle to crop
- Ensures important content visible at all sizes
- Especially important for hero images

### Rich Text Features

The rich text editor supports:

**Formatting**:

- Bold, italic, underline
- Headings (H2-H5)
- Bulleted lists
- Numbered lists
- Alignment (left, center, right)

**Media**:

- Insert images (click + → Image)
- Embed YouTube videos (click + → YouTube Insert)
- Add buttons (click + → Button)

**Links**:

- Highlight text
- Click link icon
- Choose internal page or external URL
- Set to open in new tab if needed

**Colors**:

- Highlight text
- Click color icon
- Select from theme colors
- Use sparingly for emphasis

**Social Icons**:

- Click + → Social Icons
- Add multiple platforms
- Displays as row of clickable icons

### Forms

**Contact Form Setup**:

1. Sign up at formspree.io (free for up to 50 submissions/month)
2. Create a new form
3. Copy the endpoint URL (looks like `https://formspree.io/f/abc123`)
4. Paste in Sanity Contact Form component
5. Formspree handles all form submissions
6. You'll receive email notifications

**Customizing Forms**:

- Add custom fields (dropdowns, checkboxes)
- Mark fields as required/optional
- Reorder fields by dragging
- Set field types for validation

**Form Thank You Pages**:

- Always create a thank you page
- Keep it simple and confirmatory
- Include next steps or additional links
- Select it in "On Form Submit Link"

### Password Protection

Protect sensitive pages:

1. Open page to protect
2. Scroll to **Privacy** section
3. Toggle **Password Protected** on
4. Enter strong password
5. Publish
6. Share password securely with authorized users

**Note**: Passwords are case-sensitive

**Cannot password protect**:

- Home page
- 404 page
- Global settings

---

## Tips & Troubleshooting

### Saving Work

- Sanity auto-saves drafts
- Changes aren't live until you **Publish**
- Can see draft changes in preview mode
- **Unpublish** to temporarily remove from site

### Undoing Changes

- Click "Review Changes" to see what changed
- Can restore to previous versions
- Click three dots (•••) → Document History

### Previewing Changes

- Save as draft (don't publish)
- Open preview window to see how it looks
- Make adjustments
- Publish when satisfied

### Publishing Issues

If changes don't appear on site:

1. Ensure you clicked Publish (not just save)
2. Clear browser cache
3. Wait 30-60 seconds for changes to propagate
4. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Image Issues

**Image not showing**:

- Check file size (under 10MB)
- Verify format (JPG, PNG, GIF, WebP)
- Ensure image uploaded successfully
- Add alt text (sometimes required)

**Image too large/small**:

- Check component's aspect ratio requirements
- Use hotspot tool to adjust framing
- Re-upload at correct dimensions

### Content Not Appearing

**Component hidden checklist**:

- Check if "Hide Section" is toggled on
- Verify not expired (check Expiration Date)
- Ensure not scheduled for future (check Scheduled Release Date)
- Confirm published (not just draft)

### Validation Errors

Red warnings indicate:

- Required fields missing
- Format issues (email, phone, URL)
- Character limits exceeded (meta titles/descriptions)
- Missing dependencies (e.g., password field when protection enabled)

Fix all errors before publishing.

---

## Getting Help

### Documentation

- Keep this guide handy
- Review component descriptions in Sanity
- Hover over field labels for tooltips

### Support

Contact your website administrator or developer for:

- Technical issues
- Custom functionality
- Design changes
- Advanced features
- Bug reports

### Best Practices Summary

✅ **DO**:

- Always add alt text to images
- Optimize images before uploading
- Use descriptive URLs
- Fill in meta descriptions
- Test on mobile devices
- Publish regularly
- Keep backups of important content

❌ **DON'T**:

- Upload massive images (>10MB)
- Leave alt text blank
- Use all caps in titles
- Keyword stuff
- Forget to publish changes
- Delete components you might need later (hide instead)
- Password protect the homepage

---

## Glossary

**Anchor Link**: Jump link to specific section on a page

**Aspect Ratio**: Proportional relationship between image width and height (e.g., 16:9)

**CTA**: Call to Action - button or link prompting user action

**Hotspot**: Clickable point on an interactive image

**LQIP**: Low Quality Image Placeholder - blurred preview while image loads

**Meta Data**: Information about your page for search engines and social media

**Rich Text**: Text editor with formatting options (bold, italic, links, images)

**Schema**: Structure defining what fields a component has

**Slug**: URL-friendly version of a title (e.g., "about-us")

**SEO**: Search Engine Optimization - improving search result rankings

---

**Last Updated**: December 2025
**Version**: 1.0

---

For additional support or questions about using your website CMS, please contact your website administrator.
