import * as React from 'react';
import { ElectronInfo } from './components/ElectronInfo';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Electron + Vite + React</h1>
      <p>Welcome to your application!</p>
      <ElectronInfo />

      <style>{`
        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        h1 {
          color: #2c3e50;
          margin-bottom: 16px;
        }

        p {
          color: #34495e;
          font-size: 1.2em;
          margin-bottom: 24px;
        }
      `}</style>
    </div>
  );
};

export default App;
