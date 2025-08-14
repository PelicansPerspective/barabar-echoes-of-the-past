#!/usr/bin/env python3
"""
Generates Plotly charts from data/*.csv:
  - docs/fig_reverb.html   (peak low-frequency T60 bar chart)
  - docs/fig_banded_t60.html (banded T60 per cave)
"""

from pathlib import Path
import pandas as pd
import plotly.express as px

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
DOCS = ROOT / "docs"
DOCS.mkdir(exist_ok=True)

# 1) Peak low-frequency bar chart (from acoustics_summary.csv if present, else compute from acoustics_bands.csv)
summary_path = DATA / "acoustics_summary.csv"
bands_path   = DATA / "acoustics_bands.csv"

if summary_path.exists():
    df_peak = pd.read_csv(summary_path)
    # expect: location,metric,value_seconds,band_label,source
    fig = px.bar(
        df_peak[df_peak["metric"]=="T60_peak"],
        x="location", y="value_seconds",
        title="Peak low-frequency reverberation (T60)",
        labels={"value_seconds":"seconds"}
    )
    fig.update_layout(yaxis=dict(rangemode='tozero'), margin=dict(l=40,r=20,t=60,b=40))
    fig.add_annotation(
        x=0.5, y=-0.18, xref="paper", yref="paper", showarrow=False,
        text="Note: Barabar values represent low-frequency peaks (e.g., 50–63 Hz). See Methods for banded data."
    )
    fig.write_html(DOCS/"fig_reverb.html", include_plotlyjs="cdn")
else:
    # compute peaks from bands
    ac = pd.read_csv(bands_path)  # name,band_hz,T60
    peaks = (ac.sort_values(["name","T60"], ascending=[True,False])
               .groupby("name", as_index=False)
               .first()[["name","T60","band_hz"]])
    peaks["label"] = peaks["name"] + " (" + peaks["band_hz"].astype(str) + " Hz)"
    fig = px.bar(peaks, x="label", y="T60",
                 title="Peak low-frequency reverberation (T60)",
                 labels={"T60":"seconds"})
    fig.update_layout(yaxis=dict(rangemode='tozero'), margin=dict(l=40,r=20,t=60,b=40))
    fig.add_annotation(
        x=0.5, y=-0.18, xref="paper", yref="paper", showarrow=False,
        text="Note: Peaks represent low-frequency bands; mid/high bands are shorter."
    )
    fig.write_html(DOCS/"fig_reverb.html", include_plotlyjs="cdn")

# 2) Banded T60 line chart (per cave)
ac = pd.read_csv(bands_path)
# Keep a consistent order of bands
order = sorted(ac["band_hz"].unique())
ac["band_hz"] = pd.Categorical(ac["band_hz"], categories=order, ordered=True)

fig2 = px.line(
    ac.sort_values(["name","band_hz"]),
    x="band_hz", y="T60", color="name",
    markers=True,
    title="Reverberation time by octave band (T60)"
)
fig2.update_layout(
    xaxis_title="Octave band (Hz)",
    yaxis_title="seconds",
    margin=dict(l=40,r=20,t=60,b=40)
)
fig2.write_html(DOCS/"fig_banded_t60.html", include_plotlyjs="cdn")

print("[charts] wrote docs/fig_reverb.html and docs/fig_banded_t60.html")