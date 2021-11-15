import React from 'react';

type Props = {
    type?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    name: string,
    className?: string,
}

function Icon({type, name, className}: Props) {
    return (
        <span className={`material-icons material-icons${type ? `-${type}` : ''} ${className ?? ''}`}>{name}</span>
    );
}

export default Icon;
