const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modelsToTest = [
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
];

async function testModels() {
    console.log('Testing models performance...');
    for (const modelName of modelsToTest) {
        try {
            console.log(`\nTesting model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const start = Date.now();
            const result = await model.generateContent('Say hello in Somali.');
            const response = await result.response;
            const duration = Date.now() - start;
            console.log(`Success! Time taken: ${duration}ms | Response: "${response.text().trim()}"`);
        } catch (error) {
            console.log(`Failed! Error: ${error.message}`);
        }
    }
}

testModels();
