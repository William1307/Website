import trimesh
import numpy as np
import copy
scale_factor = 0.001
switch = trimesh.load("d:/Code/Projects/Website/public/8_port_ethernet_switch.glb", force='mesh')
if isinstance(switch, trimesh.Scene):
    switch = trimesh.util.concatenate(switch.dump())
switch.vertices -= switch.centroid
switch.vertices *= scale_factor
print(f"Switch depth centered at origin: min z {switch.bounds[0][2]}, max z {switch.bounds[1][2]}")

Z_FRONT = -0.015
# We want to align the front (max Z) of the switch with Z_FRONT
# So translation Z should be Z_FRONT - switch.bounds[1][2]
target_z = Z_FRONT - switch.bounds[1][2]
print(f"Target Z translation for switch to be flush at Z_FRONT: {target_z}")

# Port Y coordinates
# In original model, where are the ports? We can't easily know without visual inspection.
print(f"Switch height centered: min y {switch.bounds[0][1]}, max y {switch.bounds[1][1]}")

rot_z_90 = trimesh.transformations.rotation_matrix(np.pi/2, [0, 0, 1])
pc_scale = 0.8
pc = trimesh.load("d:/Code/Projects/Website/public/mini_pc.glb", force='mesh')
if isinstance(pc, trimesh.Scene):
    pc = trimesh.util.concatenate(pc.dump())
pc.vertices -= pc.centroid
pc.vertices *= pc_scale
pc.apply_transform(rot_z_90)
print(f"Mini PC height centered: min y {pc.bounds[0][1]}, max y {pc.bounds[1][1]}")
print(f"Mini PC bounds: min {pc.bounds[0]}, max {pc.bounds[1]}")
