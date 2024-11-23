// TODO: Pull information from DB rather than using this default data
const sampleData = require('../sample-response.json');

async function getUserData() {
    try {
        let wellnessData = await sampleData;
        return wellnessData;
    } catch (err) {
        console.log(err);
    }
}

async function getCircle() {
    try {
        let wellnessData = await getUserData();
        wellnessData = wellnessData.recoveryWheel;

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

async function getPlan() {
    try {
        let wellnessData = await getUserData();
        wellnessData = wellnessData.dashboard;

        // Have Goals be the first element in the array
        wellnessData = {
            "goals": {
                "My goals for the recovery process:": wellnessData.goals
            },
            "motivation:": {
                "Motivation:": wellnessData.motivation
            },
            "challenges:": {
                "Challenges:": wellnessData.challenges
            },
            "consequencesOfAccomplishing": {
                "Consequences of accomplishing goals:": wellnessData.consequencesOfAccomplishing
            },
            "consequencesOfNotAccomplishing": {
                "Consequences of NOT accomplishing goals:": wellnessData.consequencesOfNotAccomplishing
            },
            "values": {
                "What values are my recovery goals built on?": wellnessData.values
            }
        };

        // Process the data to match the expected structure
        const structuredData = Object.keys(wellnessData).map(type => {
            const content = wellnessData[type];
            return {
                type: type,
                title: Object.keys(content)[0],
                content: content[Object.keys(content)[0]]
            };
        })

        return structuredData;
    } catch (err) {
        console.log(err);
        return []; // Return an empty array in case of an error
    }
}

module.exports = { getCircle, getPlan };