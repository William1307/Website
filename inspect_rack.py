import trimesh
import numpy as np

# Load the rack model
try:
    rack = trimesh.load('d:/Code/Projects/Website/dp-0022_3d.glb')
    
    print("Rack Bounding Box:")
    print("Min:", rack.bounds[0])
    print("Max:", rack.bounds[1])
    print("Extents:", rack.extents)
    print("Centroid:", rack.centroid)
except Exception as e:
    print("Error:", e)
