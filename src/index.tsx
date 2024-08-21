import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/mock/mock';
import './index.less';

const root: any = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
