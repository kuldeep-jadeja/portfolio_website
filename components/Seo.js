import Head from "next/head";
import { SITE_NAME, TWITTER_HANDLE, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/seo";

// One place for every page's title, description, canonical, Open Graph,
// Twitter card and JSON-LD. Pass `canonical` as a path or absolute URL.
export default function Seo({
    title,
    description,
    path = "/",
    canonical,
    image = DEFAULT_OG_IMAGE,
    imageAlt,
    type = "website",
    noindex = false,
    article,
    jsonLd,
}) {
    const url = absoluteUrl(path);
    const canonicalUrl = canonical ? absoluteUrl(canonical) : url;
    const imageUrl = absoluteUrl(image);
    const alt = imageAlt || title;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            <meta
                name="robots"
                content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}
            />
            <meta name="author" content="Kuldeepsinh Jadeja" />

            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:alt" content={alt} />
            {image === DEFAULT_OG_IMAGE || image.startsWith("/og/") ? (
                <>
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                </>
            ) : null}
            {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
            {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
            {article?.tags?.map((tag) => (
                <meta key={tag} property="article:tag" content={tag} />
            ))}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={TWITTER_HANDLE} />
            <meta name="twitter:creator" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:image:alt" content={alt} />

            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
        </Head>
    );
}
