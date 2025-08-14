import plotly.graph_objects as go
import plotly.io as pio

# Data from the provided JSON with shortened names to meet 15 character limit
structures = ["Barabar Caves", "Modern Granite", "Luxor Obelisk"]
roughness_grade = [0.466, 9.492, 44]

# Create the bar chart
fig = go.Figure(data=[
    go.Bar(
        x=structures,
        y=roughness_grade,
        marker_color=['#1FB8CD', '#DB4545', '#2E8B57'],
        hovertemplate='<b>%{x}</b><br>RG: %{y}<extra></extra>'
    )
])

# Update layout
fig.update_layout(
    title="Surface Precision: Ancient vs Modern",
    xaxis_title="Structure",
    yaxis_title="RG-Lower=Smooth",
    showlegend=False
)

# Rotate x-axis labels to improve readability
fig.update_xaxes(tickangle=45)

# Save the chart
fig.write_image("surface_precision_comparison.png")