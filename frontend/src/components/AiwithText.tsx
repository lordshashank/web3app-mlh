import React, { useState, ChangeEvent } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText: React.FC = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyDtiBA7Z3cIgjqzSktQUm0zGj3uQBAWuso');

    const [search, setSearch] = useState<string>('');
    const [aiResponse, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Generative AI Call to fetch text insights
     */
    async function aiRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `${search}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <input
                    placeholder='Type Something'
                    onChange={(e) => handleChangeSearch(e)}
                />
                <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
            </div>

            {
                loading && (aiResponse === '') ?
                    <p style={{ margin: '30px 0' }}>Loading ...</p>
                    :
                    <div style={{ margin: '30px 0' }}>
                        <p>{aiResponse}</p>
                    </div>
            }
        </div>
    );
};

export default AiwithText;
