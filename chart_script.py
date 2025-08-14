import plotly.graph_objects as go

# Data from the provided JSON with exact values
locations = ["Sudama Cave", "Vadathika Cave", "Notre-Dame", "Concert Hall"]
reverberation_seconds = [62, 72, 11, 2.5]

# Brand colors for each bar
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F']

# Create bar chart
fig = go.Figure()

for i, (location, reverb) in enumerate(zip(locations, reverberation_seconds)):
    fig.add_trace(go.Bar(
        x=[location],
        y=[reverb],
        name=location,
        marker_color=colors[i],
        cliponaxis=False
    ))

# Update layout with character limits in mind
fig.update_layout(
    title="Acoustic Reverb: Barabar vs Architecture",  # Under 40 chars
    xaxis_title="Location",  # Under 15 chars
    yaxis_title="Reverb Time (s)",  # Exactly 15 chars
    showlegend=False  # Locations shown on x-axis, no need for legend
)

# Save the chart
fig.write_image("acoustic_reverberation_chart.png")