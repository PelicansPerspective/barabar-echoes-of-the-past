## Project Overview

This project is a web-based interactive explorer for the Barabar Caves, an archaeological site in India. The goal is to present research data, including images, charts, and academic reports, in an accessible and engaging way. The project combines a static website with data visualization and academic documentation.

## Key Technologies

- **Frontend**: The website is built with vanilla HTML, CSS, and JavaScript.
- **Data Visualization**: Charts are generated using Plotly.js.
- **Data**: The data is stored in CSV and JSON files in the `data/` directory.
- **Scripts**: Python scripts in the `scripts/` directory are used for data processing and chart generation.
- **Academic Documentation**: The research report is written in LaTeX and can be found in the `research/` directory.

## Development Workflow

1.  **Modify Content**: To update the website's content, edit the `index.html` file.
2.  **Update Styles**: To change the visual appearance, modify the `assets/css/style.css` file.
3.  **Add Interactivity**: To add or change interactive features, edit the `assets/js/app.js` file.
4.  **Process Data**: To update the data, modify the CSV or JSON files in the `data/` directory. Then, run the Python scripts in the `scripts/` directory to regenerate the charts and other data-driven elements.
5.  **Update Report**: To make changes to the academic report, edit the `.tex` files in the `research/` directory and recompile the PDF.

## Important Files

-   `index.html`: The main entry point for the website.
-   `assets/css/style.css`: The primary stylesheet for the website.
-   `assets/js/app.js`: The main JavaScript file for interactive features.
-   `data/barabar_caves_comprehensive_data.csv`: The main dataset for the project.
-   `scripts/chart_script.py`: The Python script for generating charts.
-   `research/barabar_comprehensive_report.tex`: The main LaTeX file for the academic report.

## How to Get Help

If you have any questions or need help with a specific task, please refer to the relevant files listed above. For general questions about the project, please refer to the `README.md` file.
