import { useState, useEffect } from 'react';
import type { AppInfo } from '../electron';

function ElectronInfo() {
  const [isElectron, setIsElectron] = useState(false);
  const [info, setInfo] = useState<AppInfo>({
    platform: 'web',
    versions: {
      node: '-',
      chrome: '-',
      electron: '-'
    }
  });

  useEffect(() => {
    const loadInfo = async () => {
      try {
        if (window.electron?.isElectron) {
          setIsElectron(true);
          const appInfo = await window.electron.getAppInfo();
          setInfo(appInfo);
        }
      } catch (error) {
        console.error('Failed to load electron info:', error);
      }
    };

    loadInfo();
  }, []);

  return (
    <div className="electron-info">
      <h2>App Info</h2>
      <p>Electron + Vite + React</p>
      <div className="info-grid">
        {isElectron ? (
          <>
            <div className="info-item">
              <strong>Platform:</strong>
              <span>{info.platform}</span>
            </div>
            <div className="info-item">
              <strong>Electron:</strong>
              <span>{info.versions.electron}</span>
            </div>
            <div className="info-item">
              <strong>Chrome:</strong>
              <span>{info.versions.chrome}</span>
            </div>
            <div className="info-item">
              <strong>Node:</strong>
              <span>{info.versions.node}</span>
            </div>
          </>
        ) : (
          <div className="info-item web-mode">
            <strong>Mode:</strong>
            <span>Web Browser</span>
            <p className="web-note">Note: Some features are only available in desktop app mode</p>
          </div>
        )}
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

        .web-mode {
          grid-column: 1 / -1;
          text-align: center;
          background-color: #e8e8e8;
          padding: 16px;
          border-radius: 6px;
        }

        .web-note {
          margin-top: 8px;
          font-size: 0.9em;
          color: #666;
        }
      `}</style>
    </div>
  );
}

export default ElectronInfo;
