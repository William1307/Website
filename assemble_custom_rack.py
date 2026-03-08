import trimesh
import numpy as np

print("Assembling Custom 3D Rack...")

try:
    # Load original rack
    scene = trimesh.load('d:/Code/Projects/Website/dp-0022_3d.glb')
    
    # Rack parameters based on earlier inspection
    X_CENTER = 0.0728
    Z_FRONT = -0.015
    Y_BOTTOM = -0.350
    U_HEIGHT = 0.04445
    WIDTH_10_INCH = 0.254
    EAR_WIDTH = 0.020
    BODY_WIDTH = 0.214
    
    meshes = []
    
    def get_slot_y(slot_num, num_u=1):
        return Y_BOTTOM + (slot_num - 1) * U_HEIGHT + (U_HEIGHT * num_u) / 2.0

    # Helper: Normalize and Scale a Model
    def prepare_model(path, scale_factor, rotation_matrix=None, color_override=None):
        m = trimesh.load(path, force='mesh') # force merge into single mesh for easier manipulation
        # In case it failed to merge
        if isinstance(m, trimesh.Scene):
            m = trimesh.util.concatenate(m.dump())
            
        m.vertices -= m.centroid # Center to origin
        m.vertices *= scale_factor # Scale
        if rotation_matrix is not None:
            m.apply_transform(rotation_matrix)
        if color_override:
            m.visual.face_colors = color_override
        return m

    # 1. Patch Panel (Slot 8, top)
    y_p = get_slot_y(8)
    pp_body = trimesh.creation.box(extents=(WIDTH_10_INCH, U_HEIGHT - 0.002, 0.010))
    pp_body.apply_translation([X_CENTER, y_p, Z_FRONT])
    pp_body.visual.face_colors = [30, 30, 35, 255]
    meshes.append(pp_body)
    
    port_w, port_h = 0.014, 0.012
    for i in range(8):
        px = X_CENTER - BODY_WIDTH/2 + 0.03 + i * 0.022
        port = trimesh.creation.box(extents=(port_w, port_h, 0.012))
        port.apply_translation([px, y_p, Z_FRONT + 0.005])
        port.visual.face_colors = [150, 150, 155, 255] # Silver keystone
        meshes.append(port)

    # 2. Provided Ethernet Switch (Slot 7)
    # The provided switch was very large (~257 max bound). Assuming it's in millimeters (scale 0.001)
    y_s = get_slot_y(7)
    switch = prepare_model("d:/Code/Projects/Website/public/8_port_ethernet_switch.glb", 0.001)
    
    # Target Z to be perfectly flush with Z_FRONT
    target_z = Z_FRONT - switch.bounds[1][2]
    # Move it into position
    switch.apply_translation([X_CENTER, y_s, target_z])
    meshes.append(switch)

    # Connect cables from Patch Panel to Switch
    # Note: Because the switch is an imported mesh, we will approximate port locations
    for i in range(8):
        px_panel = X_CENTER - BODY_WIDTH/2 + 0.03 + i * 0.022
        px_switch = X_CENTER - 0.0825 + i * 0.022  # Switch's local X port locations based on generate_switch.py
        
        # P1: Patch panel port front (slightly peeking out)
        p1 = [px_panel, y_p, Z_FRONT + 0.011]
        # P2: Switch port front
        p2 = [px_switch, y_s, Z_FRONT]
        
        # Draw cable between P1 and P2
        cable = trimesh.creation.cylinder(radius=0.002, segment=[p1, p2])
        cable.visual.face_colors = [0, 180, 255, 255] # Cyan cables
        meshes.append(cable)

    # 3. Provided Mini PCs (Slot 6)
    y_m = get_slot_y(6)
    shelf_m = trimesh.creation.box(extents=(WIDTH_10_INCH, 0.002, 0.150))
    shelf_m.apply_translation([X_CENTER, y_m - U_HEIGHT/2 + 0.001, Z_FRONT - 0.070])
    shelf_m.visual.face_colors = [20, 20, 20, 255]
    meshes.append(shelf_m)
    
    # The mini pc bounds were [0.111, 0.223, 0.166]. This implies it's standing up vertically!
    # Let's rotate it 90 degrees around Z axis so it lays flat.
    rot_z_90 = trimesh.transformations.rotation_matrix(np.pi/2, [0, 0, 1])
    # The scale is in meters but might be slightly chunky, scale down lightly or keep at 1.0. Let's try 0.8
    shelf_top_y = y_m - U_HEIGHT/2 + 0.002
    for i in range(2):
        pc = prepare_model("d:/Code/Projects/Website/public/mini_pc.glb", 0.8, rotation_matrix=rot_z_90)
        
        # Calculate Y position so it rests on the shelf top
        # pc represents centered origin. The bottom of the PC is at pc.bounds[0][1]
        pc_y = shelf_top_y - pc.bounds[0][1]
        
        # Move it forward a bit (Z_FRONT - 0.040) so it's more visible
        pc.apply_translation([X_CENTER - 0.06 + i * 0.12, pc_y, Z_FRONT - 0.040])
        meshes.append(pc)
        
        # PC Glow LED (In case the model doesn't have an emissive green button)
        led = trimesh.creation.box(extents=(0.010, 0.002, 0.001))
        # Place the LED on the top face of the PC near the front
        led.apply_translation([X_CENTER - 0.06 + i * 0.12, pc_y + pc.extents[1]/2, Z_FRONT - 0.010])
        led.visual.face_colors = [0, 255, 0, 255]
        meshes.append(led)

    # 4. Provided Raspberry Pis (Slot 5)
    y_r = get_slot_y(5)
    shelf_r = trimesh.creation.box(extents=(WIDTH_10_INCH, 0.002, 0.120))
    shelf_r.apply_translation([X_CENTER, y_r - U_HEIGHT/2 + 0.001, Z_FRONT - 0.055])
    shelf_r.visual.face_colors = [20, 20, 20, 255]
    meshes.append(shelf_r)
    
    # RPi bounds were [7.8, 1.7, 5.2], implying cm. Scale by 0.01 to get meters
    rot_y_90 = trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0])
    for i in range(4):
        pi = prepare_model("d:/Code/Projects/Website/public/raspberry_pi_3_model_b.glb", 0.01, rotation_matrix=rot_y_90)
        pi.apply_translation([X_CENTER - 0.09 + i * 0.06, y_r - U_HEIGHT/2 + 0.015, Z_FRONT - 0.040])
        meshes.append(pi)
        
        # Status LED
        led = trimesh.creation.box(extents=(0.002, 0.002, 0.001))
        led.apply_translation([X_CENTER - 0.09 + i * 0.06, y_r - U_HEIGHT/2 + 0.020, Z_FRONT + 0.005])
        led.visual.face_colors = [255, 0, 0, 255]
        meshes.append(led)

    # 5. Generated NAS (Slots 1 & 2)
    y_nas = get_slot_y(1, num_u=2)
    nas = trimesh.creation.box(extents=(BODY_WIDTH, U_HEIGHT * 2.0 - 0.004, 0.180))
    nas.apply_translation([X_CENTER, y_nas, Z_FRONT - 0.080])
    nas.visual.face_colors = [35, 35, 40, 255]
    meshes.append(nas)
    
    for i in range(4):
        bay = trimesh.creation.box(extents=(0.040, U_HEIGHT * 2.0 - 0.020, 0.005))
        bay.apply_translation([X_CENTER - 0.075 + i * 0.05, y_nas, Z_FRONT + 0.010])
        bay.visual.face_colors = [15, 15, 15, 255]
        meshes.append(bay)

    # Combine
    print("Combining meshes...")
    combined_devices = trimesh.util.concatenate(meshes)
    scene.add_geometry(combined_devices, node_name="custom_rack_devices")

    # Export
    out_path = 'd:/Code/Projects/Website/public/equipped_rack.glb'
    scene.export(out_path)
    print("Successfully exported assembled rack to:", out_path)

except Exception as e:
    print("Error:", e)
