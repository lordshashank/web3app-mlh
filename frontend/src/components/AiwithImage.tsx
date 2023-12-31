import React, { useState, ChangeEvent } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from '../helpers/imageHelper';

const AiwithImage: React.FC = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyBGiiz7at5TYix-VPrKeCtjLB_WJtqHMO0');

    const [image, setImage] = useState<string>('');
    const [imageInineData, setImageInlineData] = useState<string>('');
    const [aiResponse, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Generative AI Call to fetch image insights
     */
    async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
            "What's in this photo?", imageInineData
        ]);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleClick = () => {
        aiImageRun();
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            // getting base64 from file to render in DOM
            getBase64(file)
                .then((result) => {
                    setImage(result);
                })
                .catch((e) => console.log(e));

            // generating content model for Gemini Google AI
            fileToGenerativePart(file).then((image) => {
                setImageInlineData(image.inlineData.data);
            });
        }
    }

    // Converts a File object to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
        const base64EncodedDataPromise = new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result?.toString().split(',')[1] || '');
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type || '' },
        };
    }

    return (
        <div>
            <div>
                <div style={{ display: 'flex' }}>
                    <input type='file' onChange={(e) => handleImageChange(e)} />
                    <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
                </div>
                <img src={image} style={{ width: '30%', marginTop: 30 }} alt="Preview" />
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

export default AiwithImage;
