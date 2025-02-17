import { useState, useEffect } from 'react';

interface AppInfo {
  version: string;
  name: string;
  electron: string;
  chrome: string;
  node: string;
}

export function ElectronInfo() {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        if (window.electron) {
          const info = await window.electron.getAppInfo();
          setAppInfo(info);
        }
      } catch (err) {
        console.error('Failed to get app info:', err);
      }
    };

    getInfo();
  }, []);

  if (!appInfo) {
    return null;
  }

  return (
    <div className="electron-info">
      <h2>Electron App Info</h2>
      <div className="info-grid">
        <div className="info-item">
          <strong>App Name:</strong>
          <span>{appInfo.name}</span>
        </div>
        <div className="info-item">
          <strong>Version:</strong>
          <span>{appInfo.version}</span>
        </div>
        <div className="info-item">
          <strong>Electron:</strong>
          <span>{appInfo.electron}</span>
        </div>
        <div className="info-item">
          <strong>Chrome:</strong>
          <span>{appInfo.chrome}</span>
        </div>
        <div className="info-item">
          <strong>Node:</strong>
          <span>{appInfo.node}</span>
        </div>
        <div className="info-item">
          <strong>Platform:</strong>
          <span>{window.electron?.platform}</span>
        </div>
      </div>

      <style>{`
        .electron-info {
          padding: 20px;
          border-radius: 8px;
          background-color: #f5f5f5;
          margin: 20px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-item strong {
          color: #666;
        }

        .info-item span {
          font-size: 1.1em;
          color: #333;
        }
      `}</style>
    </div>
  );
};
