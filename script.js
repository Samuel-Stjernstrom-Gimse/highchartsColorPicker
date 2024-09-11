// Predefined color schemes
let colors = [
    { color: '#058dc7' },
    { color: '#50b432' },
    { color: '#00ffb2' },
    { color: '#f8f402' },
    { color: '#b91bed' },
    { color: '#ff4702' },
];

let bgColor = '#ffffff';
let titleColor = '#000000'; // Default title color
let gridLineColor = '#e6e6e6'; // Default grid line color
let regressionLineColor = '#000000'; // Default regression line color
let labelColor = '#000000'; // Default series label color
let labelOutlineColor = '#ffffff'; // Default label outline color

const target = document.getElementById('color-pickers');

// Function to generate random titles for each series
const getRandomTitle = () => {
    const titles = ['Growth Trend', 'Sales Analysis', 'Market Insight', 'Revenue Forecast', 'Data Summary', 'Profit Evaluation'];
    return titles[Math.floor(Math.random() * titles.length)];
};

// Function to randomly assign shapes to the points
const getRandomShape = () => {
    const shapes = ['circle', 'square', 'diamond', 'triangle', 'triangle-down'];
    return shapes[Math.floor(Math.random() * shapes.length)];
};

// Helper function for linear regression and R² calculation
const calculateLinearRegression = (data) => {
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    data.forEach(([x, y]) => {
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
        sumY2 += y * y;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculating R²
    const meanY = sumY / n;
    let ssTot = 0, ssRes = 0;

    data.forEach(([x, y]) => {
        const predictedY = slope * x + intercept;
        ssTot += (y - meanY) ** 2;
        ssRes += (y - predictedY) ** 2;
    });

    const rSquared = 1 - ssRes / ssTot;

    return { slope, intercept, rSquared };
};

// Create color pickers for each plot series
colors.forEach((e, index) => {
    const colorPicker = document.createElement('input');
    const colorText = document.createElement('p');
    const container = document.createElement('div');
    colorPicker.type = 'color';

    container.style.display = 'flex';
    container.style.gap = '20px';
    colorText.textContent = e.color;

    // Set the color picker value directly to the hex color
    colorPicker.value = e.color;

    colorPicker.addEventListener('change', (ev) => {
        // Update the color value in the array
        colors[index].color = colorPicker.value;
        colorText.textContent = colorPicker.value;
        makeChart();
    });

    container.append(colorPicker, colorText);
    target.appendChild(container);
});

// Background color picker
const bgColorPicker = createColorPicker('Background color', bgColor, (value) => {
    bgColor = value;
    makeChart();
});
target.appendChild(bgColorPicker);

// Title color picker
const titleColorPicker = createColorPicker('Title color', titleColor, (value) => {
    titleColor = value;
    makeChart();
});
target.appendChild(titleColorPicker);

// Grid line color picker
const gridLineColorPicker = createColorPicker('Grid line color', gridLineColor, (value) => {
    gridLineColor = value;
    makeChart();
});
target.appendChild(gridLineColorPicker);

// Regression line color picker
const regressionLineColorPicker = createColorPicker('Regression line color', regressionLineColor, (value) => {
    regressionLineColor = value;
    makeChart();
});
target.appendChild(regressionLineColorPicker);

// Label color picker
const labelColorPicker = createColorPicker('Label color', labelColor, (value) => {
    labelColor = value;
    makeChart();
});
target.appendChild(labelColorPicker);

// Label outline (stroke) color picker
const labelOutlineColorPicker = createColorPicker('Label outline color', labelOutlineColor, (value) => {
    labelOutlineColor = value;
    makeChart();
});
target.appendChild(labelOutlineColorPicker);

// Utility function to create a color picker with a label
function createColorPicker(labelText, initialColor, onChangeCallback) {
    const colorPicker = document.createElement('input');
    const colorText = document.createElement('p');
    const container = document.createElement('div');
    colorPicker.type = 'color';

    container.style.display = 'flex';
    container.style.gap = '20px';
    colorText.textContent = `${initialColor} ${labelText}`;

    // Set the color picker value directly to the hex color
    colorPicker.value = initialColor;

    colorPicker.addEventListener('change', (ev) => {
        const newColor = colorPicker.value;
        colorText.textContent = `${newColor} ${labelText}`;
        onChangeCallback(newColor);
    });

    container.append(colorPicker, colorText);
    return container;
}

// Function to update the chart
const makeChart = () => {
    Highcharts.setOptions({
        colors: colors.map(c => c.color) // Use the updated hex colors
    });

    // Define the series data
    const seriesData = [
        { name: getRandomTitle(), data: [[1, 2], [2, 3], [3, 5], [4, 6], [5, 7]] },
        { name: getRandomTitle(), data: [[4, 4], [5, 6], [6, 7], [7, 8], [8, 9]] },
        { name: getRandomTitle(), data: [[7, 8], [8, 9], [9, 10], [10, 11], [11, 12]] },
        { name: getRandomTitle(), data: [[2, 1], [3, 4], [5, 5], [6, 7], [8, 6]] },
        { name: getRandomTitle(), data: [[5, 3], [6, 4], [7, 5], [8, 8], [9, 9]] },
        { name: getRandomTitle(), data: [[1, 5], [2, 6], [3, 7], [4, 8], [5, 10]] }
    ];

    // Combine all data points from the series for regression calculation
    const combinedData = seriesData.flatMap(series => series.data);

    // Calculate the linear regression for the combined data
    const { slope, intercept, rSquared } = calculateLinearRegression(combinedData);

    // Generate the linear regression line based on the combined data
    const regressionLine = combinedData.map(([x]) => [x, slope * x + intercept]);

    // Create the chart
    Highcharts.chart('chart', {
        chart: {
            type: 'scatter',
            zoomType: 'xy',
            backgroundColor: bgColor // Background color set here
        },
        title: {
            text: 'Scatter Chart with Global Colors, Shapes, and Combined Regression Line',
            style: {
                color: titleColor // Title color set here
            }
        },
        xAxis: {
            title: {
                text: 'X Axis Title'
            },
            gridLineColor: gridLineColor // X-axis grid line color
        },
        yAxis: {
            title: {
                text: 'Y Axis Title'
            },
            gridLineColor: gridLineColor // Y-axis grid line color
        },
        series: [
            // Add the original scatter series
            ...seriesData.map(series => ({
                name: series.name,
                data: series.data,
                marker: {
                    symbol: getRandomShape() // Random shape for each series
                },
                dataLabels: {
                    enabled: true, // Always show plot labels
                    format: '{series.name}', // Show the series name
                    style: {
                        color: labelColor, // Apply the color chosen for labels
                        textOutline: `2px ${labelOutlineColor}` // Apply the stroke (outline) color
                    }
                }
            })),
            // Add the single linear regression line
            {
                type: 'line',
                name: `Regression Line (R² = ${rSquared.toFixed(2)})`,
                data: regressionLine,
                enableMouseTracking: false,
                marker: {
                    enabled: false
                },
                color: regressionLineColor // Regression line color from picker
            }
        ]
    });
}

makeChart();
