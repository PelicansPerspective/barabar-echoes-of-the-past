# Copilot Instructions for Hyperchronal Framework Research

## Project Overview
This repository contains research on the **Hyperchronal Framework** - a theoretical physics EFT (Effective Field Theory) model that unifies cosmology, dark matter, and quantum-biological coupling through a complex scalar field Ψ with hypertime dynamics.

## Core Architecture & Components

### LaTeX Document Structure
- **Main document**: `% !TEX TS-program = pdflatex.txt` (despite .txt extension, this is LaTeX source)
- **Compilation**: Use `pdflatex` as specified in the TeX directive
- **Dependencies**: Standard physics packages (amsmath, physics, siunitx, graphicx, tikz, pgfplots)

### Key Scientific Domains
1. **EFT Foundations** (Sec. 1): Complex scalar Ψ with cutoff Λ~10⁻² eV
2. **Cosmology** (Sec. 2): Thawing quintessence mapping to DESI observables  
3. **Dark Matter** (Sec. 3): Solitonic candidates (Q-balls, vortices)
4. **Quantum Biology** (Sec. 4): QZE (Quantum Zeno Effect) coherence protection
5. **Falsifiability Matrix** (Sec. 5): Quantitative prediction thresholds

### Visual Assets
- Archaeological context: `archaeological_sites_map.png`, `barabar_caves_complete.png`
- Timeline visualizations: `barabar_caves_timeline.png`, `barabar_caves_timeline (1).png`
- Figures complement the theoretical framework with historical/archaeological context

## Development Patterns

### Mathematical Conventions
- **Field notation**: Ψ (complex scalar), φ = Ψ†Ψ (density), ⟨v⟩ (VEV)
- **EFT expansion**: Organized by mass dimension with Λ⁻ⁿ suppressions
- **Parameter hierarchy**: m²~10⁻⁶ eV², g~0.1, Λ~10⁻² eV, cutoff errors ~1%
- **Cosmological observables**: (w₀,wₐ) CPL parameterization for DE equation of state

### LaTeX Workflow
- Use `siunitx` for all physical units: `\SI{1e-2}{eV}`, `\SI{30}{\micro m}`
- TikZ diagrams for conceptual flows (see Fig. 1 attracting node example)
- Tables for operator content (`\toprule`, `\midrule`, `\bottomrule` formatting)
- Hyperref for citations and cross-references

### Research Data Integration
- **Observational anchoring**: DESI DR2, Euclid, Roman Space Telescope projections
- **Experimental targets**: NV centers, lensing substructure, QZE measurements
- **Falsification thresholds**: Quantitative (15% T₂ extension, <10⁻⁷ arcsec sensitivity)

## Critical Dependencies & External Interfaces

### Observational Data Sources
- **DESI**: Baryon Acoustic Oscillations, dark energy constraints
- **JWST/HST**: Gravitational lensing for soliton detection
- **NV Centers**: Quantum coherence experiments (room temperature T₂ > 1ms)

### Theoretical Constraints
- **Positivity bounds**: cᵥ > 0 from S-matrix analyticity
- **RG running**: β_g = 5g²/(4π²), Landau pole above cutoff
- **Hypertime causality**: Retarded/advanced kernel asymmetry

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

## Common Tasks

### Adding New Predictions
1. Define observable with units using `siunitx`
2. Specify support/falsification thresholds in Table format
3. Include systematic error analysis with EFT truncation
4. Cross-reference to experimental timeline/capability

### Updating Observational Constraints  
1. Check latest DESI/Euclid releases for (w₀,wₐ) posteriors
2. Update arXiv references in bibliography
3. Recalculate χ² improvements vs ΛCDM
4. Verify consistency with positivity bounds

### LaTeX Compilation Issues
- Ensure `pdflatex` engine (not XeLaTeX/LuaLaTeX)
- Check pgfplots compatibility version (currently 1.18)
- Verify all \usepackage dependencies are available
- Watch for special characters in Windows paths

This framework represents cutting-edge theoretical physics with direct experimental connections - treat precision and scientific rigor as paramount when making any modifications.
