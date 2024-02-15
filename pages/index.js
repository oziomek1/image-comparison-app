import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { ImgComparisonSlider } from '@img-comparison-slider/react';


export default function Home() {
  const [value, setValue] = useState(10);
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    // Create an interval to update the value between 10 and 90 every half second wih a step of 10
    const interval = setInterval(() => {
      setValue((prevValue) => {
        if (direction === 'up') {
          return prevValue >= 90 ? prevValue : prevValue + 10;
        } else {
          return prevValue <= 10 ? prevValue : prevValue - 10;
        }
      });

      // Check if we need to change direction
      setDirection((prevDirection) => {
        if ((value >= 90 && prevDirection === 'up') || (value <= 10 && prevDirection === 'down')) {
          return prevDirection === 'up' ? 'down' : 'up';
        }
        return prevDirection;
      });
    }, 500); // Every 0.5s

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [value, direction]); // Dependencies array, re-run effect when `value` or `direction` changes


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>


        <ImgComparisonSlider value={value}>
          <img slot="first" src="https://img-comparison-slider.sneas.io/demo/images/before.webp" />
          <img slot="second" src="https://img-comparison-slider.sneas.io/demo/images/after.webp" />
        </ImgComparisonSlider>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
