import Head from 'next/head'

const Title = 'YGO Decks Prices'
const Description = 'Get prices for your YuGiOh deck in a few clicks.'

export default function Header() {
    return (
    <Head>
        <title>{Title}</title>
        <meta charSet='utf-8' />
        <meta name='description' content={Description} />
        <meta name='theme-color' content='#272744' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary' />

        {/* Open Graph */}
        <meta name='og:title' content={Title} />
        <meta name='og:description' content={Description} />
    </Head>)
}