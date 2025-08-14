# Copilot Instructions for Barabar Caves Research Project

## Project Overview
This is a **multi-disciplinary archaeological research project** combining theoretical physics (Hyperchronal Framework EFT), ancient architecture analysis, and interactive data visualization. The project studies the Barabar Caves (Bihar, India) - the oldest rock-cut caves in India (3rd century BCE) - through both rigorous archaeological analysis and speculative theoretical physics frameworks.

## Core Architecture & Components

### Dual Research Streams
1. **Archaeological Documentation** (`barabar_report.tex`, data files, web interface)
2. **Theoretical Physics Framework** (`% !TEX TS-program = pdflatex.txt` - Hyperchronal EFT model)

### Web Application Stack
- **Frontend**: `index.html` with multi-view SPA (Home, Gallery, Data, Insights)
- **Styling**: `style.css` with card-based layouts and responsive design
- **Interactivity**: `app.js` with view switching, data visualization, and image galleries
- **Data Sources**: `.csv` files containing cave measurements, timeline data
- **Visualization**: Python scripts generating Plotly charts (surface precision, acoustic data)

### LaTeX Research Documents
- **Archaeological Report**: `barabar_report.tex` (traditional academic paper)
- **Comprehensive Study**: `barabar_comprehensive_report.tex` (full interdisciplinary analysis with embedded visualizations)
- **Physics Framework**: `% !TEX TS-program = pdflatex.txt` (EFT with cosmology/dark matter/quantum biology)
- **Compilation**: Use `pdflatex` for all documents, followed by `bibtex` for bibliography processing
- **Dependencies**: Standard packages (amsmath, graphicx, multicol, authblk, siunitx, booktabs)

### Key Data Architecture
- **Archaeological Database**: 7 caves with patron, date, architectural features, acoustic properties
- **Precision Measurements**: Surface roughness comparisons (Barabar vs modern granite vs ancient monuments)
- **Timeline Events**: Mauryan empire context, construction phases, modern rediscovery
- **Acoustic Data**: Reverberation times (58-72s), resonance frequencies (34.4 Hz), echo measurements

## Development Patterns & Workflows

### Data Visualization Pipeline
1. **CSV Data Sources**: `barabar_caves_comprehensive_data.csv`, `barabar_timeline.csv`
2. **Python Processing**: `script.py` generates DataFrames, `chart_script.py` creates Plotly visualizations
3. **Chart Generation**: Run `python chart_script.py` to generate PNG charts for web interface
4. **Web Integration**: JavaScript in `app.js` loads data and displays interactive elements

### Web Application Architecture
- **View System**: Single-page app with data-view attributes controlling visibility
- **Navigation**: Button-based view switching in `app.js` (home, gallery, data, insights)
- **Data Display**: Hardcoded arrays in JavaScript for timeline and cave information
- **Image Management**: External Cloudinary URLs for gallery images with captions

### LaTeX Compilation Workflows
- **Archaeological Paper**: `pdflatex barabar_report.tex` (traditional academic format)
- **Physics Framework**: `pdflatex "% !TEX TS-program = pdflatex.txt"` (note the quotes for filename)
- **Cross-references**: Both documents reference shared PNG assets (timeline, cave images)
- **Bibliography**: Standard BibTeX workflow with arXiv/DOI citations

### Scientific Conventions
- **Archaeological Dating**: BCE notation, Mauryan chronology (322-185 BCE)
- **Measurement Units**: Metric (mm, μm, Hz, seconds) with precision indicators
- **Cave Nomenclature**: Sanskrit names with English descriptions
- **Physics Notation**: EFT operators, coupling constants (g~0.1), cutoff scales (Λ~10⁻² eV)

## Key Integration Points

### Archaeological-Physics Bridge
- **Timeline Synchronization**: Archaeological dates (BCE) align with theoretical timeline frameworks
- **Precision Measurements**: Cave surface analysis (RG 0.466) feeds into theoretical error bounds
- **Acoustic Properties**: Reverberation data (58-72s, 34.4 Hz resonance) connects to quantum coherence models
- **Cultural Context**: Ajivika sect practices inform quantum-biological coupling hypotheses

### Data Flow Architecture
1. **Archaeological Data** → CSV files → Python processing → Web visualization
2. **Measurement Data** → LaTeX tables → Academic papers → Theoretical models
3. **Visual Assets** → Shared PNG files → Both web interface and LaTeX documents
4. **Timeline Events** → Synchronized across web app, CSV data, and research papers

### External Dependencies
- **Plotly.js**: Chart generation and interactive visualizations
- **Cloudinary**: External image hosting for gallery interface
- **LaTeX Packages**: Standard academic formatting (amsmath, graphicx, multicol)
- **Historical Sources**: Ashokan inscriptions, Mauryan chronology, modern archaeological surveys

## File Editing Guidelines

### LaTeX Modifications
- Preserve equation labeling scheme: `\label{eq:L}`, `\label{eq:vev_exact}`
- Maintain citation format: `\cite{Adams2006,Tolley2021}`
- Keep table structure consistent with existing operator/prediction tables
- Update bibliography with proper arXiv/DOI links

### Figure Integration
- PNG files are visualization aids - reference appropriately in captions
- Archaeological context supports the "Barabar" naming convention
- Maintain figure numbering consistency with LaTeX \ref{} system

### Parameter Updates
- Central values: ⟨v⟩~10⁻³ eV, g~0.1, Λ~10⁻² eV
- Uncertainty propagation: Always include (E/Λ)² truncation errors
- Observational fits: Update (w₀,wₐ) values when new DESI data releases

## Common Development Tasks

### Updating Archaeological Data
1. **Modify CSV files**: Add new cave measurements or timeline events
2. **Regenerate visualizations**: Run `python chart_script.py` to update PNG charts
3. **Update web data**: Modify hardcoded arrays in `app.js` (timelineData, cavesData)
4. **Refresh LaTeX figures**: Ensure new PNG files are referenced in both documents

### Web Interface Development
- **View switching**: Use `data-view` attributes and CSS visibility toggles
- **Responsive design**: Card-based layouts with CSS Grid and Flexbox
- **Image galleries**: External Cloudinary URLs with caption overlays
- **Data visualization**: Embedded PNG charts from Python Plotly scripts

### LaTeX Document Workflows
- **Archaeological Report**: `pdflatex barabar_report.tex` (traditional academic format)
- **Comprehensive Study**: `pdflatex barabar_comprehensive_report.tex; bibtex barabar_comprehensive_report; pdflatex barabar_comprehensive_report.tex; pdflatex barabar_comprehensive_report.tex` (full interdisciplinary analysis with bibliography)
- **Physics Framework**: `pdflatex "% !TEX TS-program = pdflatex.txt"` (note quotes for special filename)
- **Cross-document consistency**: Shared figure references and measurement data
- **Bibliography management**: BibTeX workflow with `.bib` files for archaeological and scientific sources

### Research Data Validation
- **Measurement consistency**: Surface roughness (RG 0.466) across documents
- **Timeline accuracy**: BCE dates synchronized between CSV, web app, and papers
- **Acoustic data integrity**: Reverberation times (58-72s) and frequencies (34.4 Hz)
- **Citation verification**: Archaeological sources and theoretical physics references
