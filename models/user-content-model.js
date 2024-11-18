// TODO: Pull information from DB rather than using this default data
const sampleData = require('../sample-response.json');

async function getUserData() {
    try {
        let wellnessData = await sampleData.recoveryWheel;
        return wellnessData;
    } catch (err) {
        console.log(err);
    }
}

async function getCircle() {
    try {
        let wellnessData = await getUserData();

        // Process the data to match the expected structure
        const structuredData = Object.keys(wellnessData).map(topic => {
            const questions = wellnessData[topic].map(item => item.rating); // Extract ratings
            return {
                topic: topic.charAt(0).toUpperCase() + topic.slice(1), // Capitalize topic names
                questions: questions
            };
        });

        return structuredData;

    } catch (err) {
        console.log(err);
        return []; // Return an empty array in case of an error
    }
}

module.exports = { getCircle };