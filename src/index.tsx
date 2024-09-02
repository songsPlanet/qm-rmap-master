import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/mock/mock';
import './index.less';
import React from 'react';

const root: any = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
