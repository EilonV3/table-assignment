import React from 'react';
import styles from './Title.module.css';

interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
    return <h1 className={styles.title}>{text}</h1>;
};

export default Title;