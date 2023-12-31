// components/Gemini.tsx
import React, { useState, ChangeEvent } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the functional component using `React.FC`
const Gemini: React.FC = () => {
    // Declare state variables with their types
    const [search, setSearch] = useState<string>('');

    // Function to handle search input changes
    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    // Initialize the Google Generative AI model
    const genAI = new GoogleGenerativeAI('AIzaSyBGiiz7at5TYix-VPrKeCtjLB_WJtqHMO0');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Function to handle the search button click
    const handleClick = () => {
        // Implement your search functionality here using the `search` state
    };

    return (
        <div>
            <h1>Generative AI Restaurant App!</h1>
            <p>Built with ❤️ using ReactJS + Redux + Google Gemini</p>
            <div style={{ display: 'flex' }}>
                <input
                    placeholder='Search Food with Category using Generative AI'
                    onChange={(e) => handleChangeSearch(e)}
                />
                <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
            </div>
        </div>
    );
};

export default Gemini;

