import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/mock/mock-map';
import '@/mock/mock';
import './index.less';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
