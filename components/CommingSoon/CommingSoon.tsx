import React from 'react';
import styles from './CommingSoon.module.css';
import comingSoonImage from '../../public/assets/coming-soon-placeholder.svg';

const ComingSoon: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={comingSoonImage} alt="Coming Soon" className={styles.image} />
      <h1 className={styles.title}>Coming Soon</h1>
      <p className={styles.message}>
        We're working hard to bring you something amazing. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;