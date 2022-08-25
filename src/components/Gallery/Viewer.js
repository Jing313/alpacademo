import React from 'react';

import styles from '../../styles/modules/Gallery/Gallery.module.scss';

export default function Viewer(props) {
  return (
    <div
      id="viewer"
      className={styles.viewer}
      style={{
        visibility: props.visibility,
      }}
      onClick={(e) => {
        if (e.currentTarget === e.target) props.onClose();
      }}
    >
      <div
        className={styles.close}
        onClick={() => props.onClose()}
      >
        <img width="48px" src="/images/close.svg" alt="close" />
      </div>
      <div className={styles.viewer__content}>
        <iframe
          className={styles.embedded}
          src={`https://pacaviewer.com/?id=${props.model}`}
        />
      </div>
    </div>
  );
}
