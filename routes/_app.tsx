/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import {tw } from 'twind';

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,300;0,400;0,700;1,400&family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body class={tw`font-sans`}>
      <Component />
      </body>
    </>
  );
}
