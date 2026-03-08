import trimesh
import numpy as np
import copy

print("Loading rack and generating devices...")
try:
    # Load original rack
    scene = trimesh.load('d:/Code/Projects/Website/dp-0022_3d.glb')
    
    # Rack parameters
    X_CENTER = 0.0728
    Z_FRONT = -0.030
    Y_BOTTOM = -0.350
    U_HEIGHT = 0.04445
    WIDTH_10_INCH = 0.254
    EAR_WIDTH = 0.020
    BODY_WIDTH = 0.214
    
    meshes = []
    
    def get_slot_y(slot_num, num_u=1):
        # slot_num 1 to 8 (1 is bottom)
        return Y_BOTTOM + (slot_num - 1) * U_HEIGHT + (U_HEIGHT * num_u) / 2.0

    # 1. Patch Panel (Slot 8, top)
    y_p = get_slot_y(8)
    pp_body = trimesh.creation.box(extents=(WIDTH_10_INCH, U_HEIGHT - 0.002, 0.010))
    pp_body.apply_translation([X_CENTER, y_p, Z_FRONT])
    pp_body.visual.face_colors = [30, 30, 35, 255]
    meshes.append(pp_body)
    
    # Patch panel ports
    port_w, port_h = 0.014, 0.012
    for i in range(8):
        px = X_CENTER - BODY_WIDTH/2 + 0.03 + i * 0.022
        port = trimesh.creation.box(extents=(port_w, port_h, 0.012))
        port.apply_translation([px, y_p, Z_FRONT + 0.005])
        port.visual.face_colors = [150, 150, 155, 255] # Silver keystone
        meshes.append(port)

    # 2. Switch (Slot 7)
    y_s = get_slot_y(7)
    sw_body = trimesh.creation.box(extents=(WIDTH_10_INCH, U_HEIGHT - 0.002, 0.120))
    sw_body.apply_translation([X_CENTER, y_s, Z_FRONT - 0.055])
    sw_body.visual.face_colors = [40, 40, 45, 255]
    meshes.append(sw_body)
    
    for i in range(8):
        px = X_CENTER - BODY_WIDTH/2 + 0.03 + i * 0.022
        port = trimesh.creation.box(extents=(port_w, port_h, 0.005))
        port.apply_translation([px, y_s, Z_FRONT + 0.0025])
        port.visual.face_colors = [10, 10, 10, 255]
        meshes.append(port)
        
        # Cable from switch to patch panel
        cable = trimesh.creation.cylinder(radius=0.002, height=U_HEIGHT)
        cable.apply_translation([px, (y_p + y_s)/2, Z_FRONT + 0.015])
        cable.visual.face_colors = [0, 180, 255, 255] # Cyan cables
        meshes.append(cable)

    # 3. Mini PCs (Slot 6)
    y_m = get_slot_y(6)
    shelf_m = trimesh.creation.box(extents=(WIDTH_10_INCH, 0.002, 0.150))
    shelf_m.apply_translation([X_CENTER, y_m - U_HEIGHT/2 + 0.001, Z_FRONT - 0.070])
    shelf_m.visual.face_colors = [20, 20, 20, 255]
    meshes.append(shelf_m)
    
    for i in range(2):
        pc = trimesh.creation.box(extents=(0.110, 0.038, 0.110))
        pc.apply_translation([X_CENTER - 0.06 + i * 0.12, y_m - U_HEIGHT/2 + 0.020, Z_FRONT - 0.050])
        pc.visual.face_colors = [60, 60, 65, 255]
        meshes.append(pc)
        # PC Glow LED
        led = trimesh.creation.box(extents=(0.010, 0.002, 0.001))
        led.apply_translation([X_CENTER - 0.06 + i * 0.12, y_m - U_HEIGHT/2 + 0.020, Z_FRONT + 0.005])
        led.visual.face_colors = [0, 255, 0, 255]
        meshes.append(led)

    # 4. Raspberry Pis (Slot 5)
    y_r = get_slot_y(5)
    shelf_r = trimesh.creation.box(extents=(WIDTH_10_INCH, 0.002, 0.120))
    shelf_r.apply_translation([X_CENTER, y_r - U_HEIGHT/2 + 0.001, Z_FRONT - 0.055])
    shelf_r.visual.face_colors = [20, 20, 20, 255]
    meshes.append(shelf_r)
    
    for i in range(4):
        # Case
        pi = trimesh.creation.box(extents=(0.030, 0.060, 0.090))
        pi.apply_translation([X_CENTER - 0.09 + i * 0.06, y_r - U_HEIGHT/2 + 0.030, Z_FRONT - 0.040])
        pi.visual.face_colors = [25, 25, 25, 255]
        meshes.append(pi)
        # Status LED
        led = trimesh.creation.box(extents=(0.002, 0.002, 0.001))
        led.apply_translation([X_CENTER - 0.09 + i * 0.06, y_r - U_HEIGHT/2 + 0.050, Z_FRONT + 0.005])
        led.visual.face_colors = [255, 0, 0, 255]
        meshes.append(led)

    # 5. NAS (Slots 1 & 2)
    y_nas = get_slot_y(1, num_u=2)
    nas = trimesh.creation.box(extents=(BODY_WIDTH, U_HEIGHT * 2.0 - 0.004, 0.180))
    nas.apply_translation([X_CENTER, y_nas, Z_FRONT - 0.080])
    nas.visual.face_colors = [35, 35, 40, 255]
    meshes.append(nas)
    
    # Drive bays
    for i in range(4):
        bay = trimesh.creation.box(extents=(0.040, U_HEIGHT * 2.0 - 0.020, 0.005))
        bay.apply_translation([X_CENTER - 0.075 + i * 0.05, y_nas, Z_FRONT + 0.010])
        bay.visual.face_colors = [15, 15, 15, 255]
        meshes.append(bay)

    # Combine all custom geometry into one mesh to avoid scene graph complexity when merging
    combined_devices = trimesh.util.concatenate(meshes)
    
    # Add combined devices to the original scene
    scene.add_geometry(combined_devices, node_name="custom_rack_devices")

    # Export
    out_path = 'd:/Code/Projects/Website/public/equipped_rack.glb'
    scene.export(out_path)
    print("Exported equipped rack to:", out_path)

except Exception as e:
    print("Error:", e)
