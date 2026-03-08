import trimesh
import numpy as np

def inspect_model(name, path):
    print(f"--- MODEL: {name} ---")
    try:
        scene = trimesh.load(path)
        # Handle if it is a Scene
        if isinstance(scene, trimesh.Scene):
            bounds = scene.bounds_corners
            extents = scene.extents
            print(f"  Extents (W, H, D): {extents}")
            print(f"  Centroid: {scene.centroid}")
        else:
            print(f"  Extents (W, H, D): {scene.extents}")
            print(f"  Centroid: {scene.centroid}")
    except Exception as e:
        print(f"  Error loading: {e}")

inspect_model("Switch", "d:/Code/Projects/Website/public/8_port_ethernet_switch.glb")
inspect_model("Mini PC", "d:/Code/Projects/Website/public/mini_pc.glb")
inspect_model("Raspberry Pi", "d:/Code/Projects/Website/public/raspberry_pi_3_model_b.glb")
