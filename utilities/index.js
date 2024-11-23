const contentModel = require('../models/user-content-model');
// const { auth, requiresAuth } = require('express-openid-connect');
// const dotenv = require('dotenv');
// dotenv.config();
const Util = {};

Util.buildCircle = async () => {
    let wellnessData = await contentModel.getCircle();

    // Flatten data for D3 processing
    const radialData = [];

    wellnessData.forEach(topicData => {
        const { topic, questions } = topicData;
        questions.forEach((score, index) => {
            radialData.push({
                topic,
                question: index + 1,
                score: score
            });
        });
    });

    let circle = `
    <div id="radialChart"></div>
    <script>
        const data = ${JSON.stringify(radialData)};

        const width = 600;  // Reduced width for a tighter fit
        const height = 600; // Reduced height for a tighter fit
        const innerRadius = 25;
        const outerRadius = 225;
        const numTopics = ${wellnessData.length};
        const numQuestions = ${wellnessData[0].questions.length};

        const gap = 0.025;

        const svg = d3.select("#radialChart")
            .append("svg")
            .attr("viewBox", \`0 0 \${width} \${height}\`) // Adjust viewBox for a more compact fit
            .attr("preserveAspectRatio", "xMidYMid meet")
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Scales for angle and radius
        const angleScale = d3.scaleBand()
            .domain(d3.range(numTopics * numQuestions))
            .range([0, 2 * Math.PI]);

        const radiusScale = d3.scaleLinear()
            .domain([0, 4])
            .range([innerRadius, outerRadius]);

        const colorScale = d3.scaleOrdinal(d3.schemeBrBG[numTopics]);

        // Draw concentric circles for each score level
        for (let i = 1; i <= 4; i++) {
            svg.append("circle")
                .attr("class", "range-circle")
                .attr("r", radiusScale(i))
                .attr("fill", "none")
                .attr("stroke", "#aaa")
                .attr("stroke-width", "1px");
        }

        // Draw radial bars with slight separation
        svg.selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("d", d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(d => radiusScale(d.score))
                .startAngle((d, i) => angleScale(i) + gap / 2)
                .endAngle((d, i) => angleScale(i) + angleScale.bandwidth() - gap / 2)
            )
            .attr("fill", d => colorScale(d.topic))
            .attr("stroke", "#fff")
            .attr("stroke-width", "1px");

        // Add question number labels just outside each bar
        const labelRadius = outerRadius + 7; // Position labels outside the bars
        svg.selectAll(".question-label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "question-label")
            .attr("text-anchor", "middle")
            .attr("x", (d, i) => {
                const angle = (angleScale(i) + angleScale.bandwidth() / 2) - Math.PI / 2;
                return labelRadius * Math.cos(angle);
            })
            .attr("y", (d, i) => {
                const angle = (angleScale(i) + angleScale.bandwidth() / 2) - Math.PI / 2;
                return labelRadius * Math.sin(angle);
            })
            .text(d => \`Q\${d.question}\`)
            .style("font-size", ".5em")
            .style("fill", "#333");

        function getLuminance(color) { 
            const rgb = d3.color(color).rgb(); 
            const r = rgb.r / 255; 
            const g = rgb.g / 255; 
            const b = rgb.b / 255;
            
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b; 
            return lum; 
        }

        // Add topic labels with background color
        // Calculate topic label positions
const topicLabelRadius = outerRadius + 60;
svg.selectAll(".topic-label")
    .data(${JSON.stringify(wellnessData.map(d => d.topic))})
    .enter()
    .append("g")
    .attr("transform", (d, i) => {
        // Calculate the angle for the center of each topic's section
        const angle = ((i * numQuestions + numQuestions / 2) * (2 * Math.PI)) / (numTopics * numQuestions) - Math.PI / 2;
        const x = topicLabelRadius * Math.cos(angle);
        const y = topicLabelRadius * Math.sin(angle);
        return \`translate(\${x}, \${y})\`;
    })
    .each(function(d, i) {
        const g = d3.select(this);
        const backgroundColor = colorScale(d);
        const textColor = getLuminance(backgroundColor) > 0.6 ? "#000" : "#fff";

        const text = g.append("text")
            .attr("class", "topic-label")
            .attr("text-anchor", "middle")
            .text(d)
            .style("font-size", "1em")
            .style("fill", textColor)
            .style("alignment-baseline", "middle");

        const bbox = text.node().getBBox();
        g.insert("rect", "text")
            .attr("x", bbox.x - 2.5)
            .attr("y", bbox.y - 1)
            .attr("width", bbox.width + 5)
            .attr("height", bbox.height + 2)
            .attr("rx", "3")
            .attr("fill", backgroundColor);
    });


    </script>
    `;
    return circle;
};

Util.buildPlan = async () => {
    let planList = await contentModel.getPlan();

    let planHTML = '';

    planList.forEach(plan => {
        if (plan.type == 'goals') {
            planHTML += `
        <div class="plan_${plan.type}">
            <h3>${plan.title}</h3>
            <p>${plan.content}</p>
        </div>
        `
        } else {
            planHTML += `
        <div class="plan_${plan.type}">
            <h4>${plan.title}</h4>
            <p>${plan.content}</p>
        </div>
        `
        }
    });

    return planHTML;
}

/*****************************************
* Middleware For Handling Errors
* Wrap other functions in this for
* General Error Handling
****************************************/
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// // Authentication utility
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: process.env.ISSUER_BASE_URL
//   };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// Util.use(auth(config));

module.exports = Util