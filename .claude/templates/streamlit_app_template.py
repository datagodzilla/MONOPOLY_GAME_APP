"""
Streamlit Dashboard Template
Usage: streamlit run app_name.py
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px

# Page configuration
st.set_page_config(
    page_title="Dashboard",
    page_icon="📊",
    layout="wide"
)

# Title
st.title("📊 Dashboard Title")
st.markdown("Description of what this dashboard does")

# Sidebar
st.sidebar.header("Configuration")

# File uploader (optional)
uploaded_file = st.sidebar.file_uploader("Upload CSV", type=['csv'])

if uploaded_file:
    # Load data
    df = pd.read_csv(uploaded_file)
    
    # Display data overview
    st.header("Data Overview")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Rows", len(df))
    with col2:
        st.metric("Columns", len(df.columns))
    with col3:
        st.metric("Missing", df.isnull().sum().sum())
    
    # Show data
    with st.expander("View Data"):
        st.dataframe(df)
    
    # Visualization
    st.header("Visualizations")
    
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    if numeric_cols:
        selected_col = st.selectbox("Select column", numeric_cols)
        
        fig = px.histogram(df, x=selected_col, title=f'Distribution of {selected_col}')
        st.plotly_chart(fig, use_container_width=True)
else:
    st.info("👆 Upload a CSV file to get started")

# Footer
st.markdown("---")
st.markdown("Built with Streamlit 🎈")
