import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div data-theme="autumn">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
