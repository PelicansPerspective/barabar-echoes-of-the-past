#!/usr/bin/env python3
"""
Builds data/barabar_caves_comprehensive_data.csv from component CSVs.

Inputs (in data/):
  - geometry_dimensions.csv    # name,length_m,width_m,height_m,volume_m3,notes
  - surface_roughness_rz.csv   # name,rz_microns,trace_n,method,provenance
  - acoustics_bands.csv        # name,band_hz,T30,T60,notes

Output:
  - barabar_caves_comprehensive_data.csv
      columns: name,length_m,width_m,height_m,volume_m3,notes,rz_microns,trace_n,peak_T60_s,peak_band_hz
"""

from pathlib import Path
import pandas as pd
import sys

REQ_GEOM = {"name","length_m","width_m","height_m","volume_m3","notes"}
REQ_ROUGH = {"name","rz_microns","trace_n"}
REQ_AC = {"name","band_hz","T60"}

def fail(msg: str):
    print(f"[build] ERROR: {msg}", file=sys.stderr)
    sys.exit(1)

def check_cols(df: pd.DataFrame, required: set, label: str):
    missing = required - set(df.columns)
    if missing:
        fail(f"{label} missing columns: {sorted(missing)}")

def load_csv(path: Path, label: str) -> pd.DataFrame:
    if not path.exists():
        fail(f"{label} not found: {path}")
    df = pd.read_csv(path)
    if df.empty:
        fail(f"{label} is empty: {path}")
    return df

def main():
    root = Path(__file__).resolve().parents[1]  # repo root
    din = root / "data"
    dout = din / "barabar_caves_comprehensive_data.csv"

    geom = load_csv(din/"geometry_dimensions.csv", "geometry_dimensions.csv")
    rough = load_csv(din/"surface_roughness_rz.csv", "surface_roughness_rz.csv")
    ac    = load_csv(din/"acoustics_bands.csv", "acoustics_bands.csv")

    check_cols(geom, REQ_GEOM, "geometry_dimensions.csv")
    check_cols(rough, REQ_ROUGH, "surface_roughness_rz.csv")
    check_cols(ac, REQ_AC, "acoustics_bands.csv")

    # Peak T60 by cave (low-frequency extremes)
    ac_peak = (
        ac.sort_values(["name","T60"], ascending=[True,False])
          .groupby("name", as_index=False)
          .first()[["name","T60","band_hz"]]
          .rename(columns={"T60":"peak_T60_s","band_hz":"peak_band_hz"})
    )

    # Merge to a single comprehensive CSV
    df = (
        geom.merge(rough[["name","rz_microns","trace_n"]], on="name", how="left")
            .merge(ac_peak, on="name", how="left")
    )

    # Save
    dout.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(dout, index=False)
    print(f"[build] wrote {dout} ({len(df)} rows)")
    # Small stdout summary
    print(df[["name","rz_microns","peak_T60_s","peak_band_hz"]].to_string(index=False))

if __name__ == "__main__":
    main()