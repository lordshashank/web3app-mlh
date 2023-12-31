// components/Gemini.tsx
import React, { useState } from 'react';
import AiwithText from '../components/AiwithText';
import AiwithImage from '../components/AiwithImage';

const Gemini: React.FC = () => {
    const [aiWith, setAiWith] = useState<'text' | 'image'>('text');

    const handleAiWith = (value: 'text' | 'image') => {
        setAiWith(value);
    };

    return (
        <div>
            <h1>Gemini Ai</h1>
            <p>Built with using ReactJS + Redux + Google Gemini</p>

            <div style={{ margin: '30px 0' }}>
                <button
                    onClick={() => handleAiWith('text')}
                    className={aiWith == 'text' ? 'aiWithActive' : ''}
                >
                    AI with Text
                </button>

                <button
                    style={{ marginLeft: '20px' }}
                    className={aiWith == 'image' ? 'aiWithActive' : ''}
                    onClick={() => handleAiWith('image')}
                >
                    AI with Image
                </button>
            </div>

            {aiWith == 'text' ? <AiwithText /> : <AiwithImage />}
        </div>
    );
};

export default Gemini;


