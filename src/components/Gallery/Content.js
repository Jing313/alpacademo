import { useState, useEffect} from 'react';
import { useWeb3React } from '@web3-react/core'
import { motion } from 'framer-motion'

import styles from '../../styles/modules/Gallery/Gallery.module.scss';
import { injected } from '../../store/connectors';
import { fetchUserAssets } from '../../utils/nft';

import Viewer from './Viewer';

function random(max) {
  return Math.floor(Math.random() * max);
}

function randomPacas(amount, maxId) {
  const pacas = [];

  for (let i = 0; i < amount; i += 1) {
    pacas.push(random(maxId));
  }

  return pacas;
}

function returnPacas(filter, assets, userAssets, onlyOwned, openViewer, setModel) {
  let assetsToDisplay = [];

  if (filter.length > 0) {
    assetsToDisplay = onlyOwned ?
      userAssets.filter((id) => id.toString() === filter.toString())
      : [filter.toString()];
  } else {
    assetsToDisplay = onlyOwned ? userAssets : assets;
  }

  if (assetsToDisplay.length === 0) {
    return (
      <div className={styles.empty}>
        <p>
          No matching results!
        </p>
      </div>
    )
  }

  const pacas = [];

  console.log(assetsToDisplay);

  for (let i = 0; i < assetsToDisplay.length; i += 1) {
    pacas.push(
      <motion.div
        key={assetsToDisplay[i]}
        className={styles.box}
        style={{
          position: 'relative',
        }}
      >
        <div className={styles.cover}>
          <button
            className="btn primary"
            onClick={() => {
              setModel(assetsToDisplay[i]);
              document.body.style.overflow = 'hidden';
              openViewer();
            }}
          >
            <img className={styles.icon} alt="View" src="/images/eye.svg" />
            View
          </button>
          {onlyOwned && (
            <>
              <a
                className="btn primary"
                href={`https://pacaviewer.fra1.cdn.digitaloceanspaces.com/models_prod/ALPACADABRAZ_3D_${assetsToDisplay[i]}.gltf`}
                target="_blank"
                rel="noreferrer"
              >
                <img className={styles.icon} alt="Download" src="/images/download.svg" />
                .gltf
              </a>
              <a
                className="btn primary"
                href={`https://pacaviewer.fra1.cdn.digitaloceanspaces.com/renders_prod/ALPACADABRAZ_3D_${assetsToDisplay[i]}.png`}
                target="_blank"
                rel="noreferrer"
              >
                <img className={styles.icon} alt="Download" src="/images/download.svg" />
                .png
              </a>
            </>
          )}
        </div>
        <img
          src={`https://pacaviewer.fra1.cdn.digitaloceanspaces.com/renders_prod/ALPACADABRAZ_3D_${assetsToDisplay[i]}.png`}
          alt={assetsToDisplay[i]}
        />
        <h3>PACA #{assetsToDisplay[i]}</h3>
      </motion.div>
    )
  }

  return (
    <div className={styles.selector}>
      {pacas}
    </div>
  );
}

function returnTitle(filter, onlyOwned) {
  if (onlyOwned) {
    return 'DISPLAYING YOUR PACAS';
  }

  return filter.length > 0 ? `DISPLAYING PACA #${filter}` : 'DISPLAYING RANDOM PACAS';
}

export default function Content() {
  const {
    library,
    activate,
    account,
  } = useWeb3React();

  const [filter, setFilter] = useState('');
  const [assets, setAssets] = useState([]);
  const [userAssets, setUserAssets] = useState([]);
  const [onlyOwned, toggleOnlyOwned] = useState(false);

  const [viewerVisibility, setViewerVisibility] = useState('hidden');
  const [model, setModel] = useState('0');

  useEffect(() => {
    setAssets(randomPacas(4, 19968));
  }, []);

  useEffect(() => {
    async function fetchAssets() {
      if (account && library) {
        const res = await fetchUserAssets(
          library,
          '0xe39fb076bd6be0bbf400db0dfad28104fdc5ff46',
          account
        );

        setUserAssets(res);
      }
    }

    fetchAssets();
  }, [account, library]);

  return (
    <section className={styles.content}>
      {model > 0 && (
        <Viewer
          visibility={viewerVisibility}
          model={model}
          onClose={() => {
            setViewerVisibility('hidden');
            document.body.style.overflow = 'initial';
          }}
        />
      )}
      <div className={styles.inner}>
        <div className={styles.title}>
          <h3>{returnTitle(filter, onlyOwned)}</h3>
          <div className={styles.oneonetrait}>
            <div
              className={styles.title}
              style={{
                gridGap: '16px',
              }}
            >
              <input
                type="text"
                className={styles.search}
                placeholder="Filter by token id"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              {account ? (
                <button
                  className={onlyOwned ? styles.filtered : styles.filter}
                  onClick={() => toggleOnlyOwned(!onlyOwned)}
                >
                  Filter by owned
                </button>
              ) : (
                <button
                  className="btn primary"
                  onClick={async () => {
                    await activate(injected, null, false);
                  }}
                >
                  Connect wallet
                </button>
              )}
            </div>
          </div>
        </div>
        {returnPacas(
          filter,
          assets,
          userAssets,
          onlyOwned,
          setViewerVisibility,
          setModel,
        )}
        {!onlyOwned && filter.length === 0 && (
          <div className={styles.shuffle}>
            <button
              className="btn primary"
              onClick={() => setAssets(randomPacas(4, 200))}
            >
              SHUFFLE
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
