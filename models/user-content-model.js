// TODO: Pull information from DB rather than using this default data

async function getCircle() {
    try {
        let wellnessData = await new Promise(resolve => {
            setTimeout(() => {
                // Sample response structure
                resolve([{
                    "Recovery Wheel": {
                        'occupational': [{ rating: 2 }, { rating: 4 }, { rating: 3 }, { rating: 2 }, { rating: 1 }, { rating: 2 }, { rating: 1 }, { rating: 3 }],
                        'physical': [{ rating: 3 }, { rating: 4 }, { rating: 3 }, { rating: 2 }, { rating: 1 }, { rating: 2 }, { rating: 1 }, { rating: 3 }],
                        'social': [{ rating: 3 }, { rating: 4 }, { rating: 3 }, { rating: 2 }, { rating: 1 }, { rating: 2 }, { rating: 1 }, { rating: 3 }],
                        'spiritual': [{ rating: 1 }, { rating: 4 }, { rating: 3 }, { rating: 2 }, { rating: 1 }, { rating: 2 }, { rating: 1 }, { rating: 3 }],
                        'financial': [{ rating: 3 }, { rating: 4 }, { rating: 3 }, { rating: 2 }, { rating: 1 }, { rating: 2 }, { rating: 1 }, { rating: 3 }],
                        'emotional': [{ rating: 3 }, { rating: 4 }, { rating: 3 }, { rating: 2 }, { rating: 1 }, { rating: 2 }, { rating: 1 }, { rating: 3 }],
                        'environmental': [{ rating: 3 }, { rating: 4 }, { rating: 3 }, { rating: 2 }, { rating: 1 }, { rating: 2 }, { rating: 1 }, { rating: 3 }],
                        'intellectual': [{ rating: 3 }, { rating: 4 }, { rating: 3 }, { rating: 2 }, { rating: 1 }, { rating: 2 }, { rating: 1 }, { rating: 3 }],
                    }
                }]);
            }, 100);
        });

        // Process wellness data to create structured output
        const structuredData = [];
        wellnessData.forEach(item => {
            Object.keys(item["Recovery Wheel"]).forEach(key => {
                const ratings = item["Recovery Wheel"][key].map(r => r.rating);
                structuredData.push({
                    topic: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize topic names
                    questions: ratings // Keep the individual ratings
                });
            });
        });

        return structuredData;

    } catch (err) {
        console.log(err);
        return []; // Return an empty array in case of an error
    }
}

module.exports = { getCircle };