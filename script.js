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

const target = document.getElementById('color-pickers');

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

    Highcharts.chart('chart', {
        chart: {
            type: 'scatter',
            zoomType: 'xy',
            backgroundColor: bgColor // Background color set here
        },
        title: {
            text: 'Scatter Chart with Global Colors',
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
        series: [{
            name: 'Series 1',
            data: [
                [1, 2],
                [2, 3],
                [3, 5],
                [4, 6],
                [5, 7]
            ]
        }, {
            name: 'Series 2',
            data: [
                [4, 4],
                [5, 6],
                [6, 7],
                [7, 8],
                [8, 9]
            ]
        }, {
            name: 'Series 3',
            data: [
                [7, 8],
                [8, 9],
                [9, 10],
                [10, 11],
                [11, 12]
            ]
        }, {
            name: 'Series 4',
            data: [
                [2, 1],
                [3, 4],
                [5, 5],
                [6, 7],
                [8, 6]
            ]
        }, {
            name: 'Series 5',
            data: [
                [5, 3],
                [6, 4],
                [7, 5],
                [8, 8],
                [9, 9]
            ]
        }, {
            name: 'Series 6',
            data: [
                [1, 5],
                [2, 6],
                [3, 7],
                [4, 8],
                [5, 10]
            ]
        }],
    });
}

makeChart();
