import React from 'react';
import ReactDOM from 'react-dom/client';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from "react-query";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {worker} from "./api/browser";

(async () => {
    if (process.env.REACT_APP_MSW) {
        await worker.start({
            serviceWorker: {
                url: '/mockServiceWorker.js',
            },
        });
    }
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );

    const queryClient = new QueryClient();

    root.render(
        <React.StrictMode>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </RecoilRoot>
        </React.StrictMode>
    );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
