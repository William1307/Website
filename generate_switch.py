import trimesh
import numpy as np

# A basic script to generate a 10-inch 1U network switch 3D model
try:
    print("Generating 10-inch network switch 3D model...")
    # Base dimensions
    body_width = 215.0  # body width
    body_height = 40.0  # slightly under 1U (44.45 mm)
    body_depth = 120.0  # depth

    # Create main body
    body = trimesh.creation.box(extents=(body_width, body_height, body_depth))
    # Color: dark gray
    body.visual.face_colors = [40, 40, 45, 255]

    # Create rack mount ears
    ear_width = 19.5
    ear_height = 44.0
    ear_depth = 2.0
    
    # Left ear
    left_ear = trimesh.creation.box(extents=(ear_width, ear_height, ear_depth))
    # Position: shift left by half body width + half ear width
    # Shift forward so it's flush with the front panel (front is at depth/2)
    left_ear.apply_translation([-(body_width/2 + ear_width/2), 0, body_depth/2 - ear_depth/2])
    left_ear.visual.face_colors = [120, 120, 125, 255]

    # Right ear
    right_ear = trimesh.creation.box(extents=(ear_width, ear_height, ear_depth))
    right_ear.apply_translation([(body_width/2 + ear_width/2), 0, body_depth/2 - ear_depth/2])
    right_ear.visual.face_colors = [120, 120, 125, 255]

    # Create 8 RJ45 ports on the front panel
    port_width = 14.0
    port_height = 12.0
    port_depth = 4.0
    
    ports = []
    # Start position for ports (near the left side of the front panel)
    start_x = -body_width/2 + 25
    for i in range(8):
        port = trimesh.creation.box(extents=(port_width, port_height, port_depth))
        # Place on the front panel (Z = body_depth/2 + port_depth/2)
        port.apply_translation([start_x + i * 22, 0, body_depth/2])
        # Color: black/dark hollow
        port.visual.face_colors = [10, 10, 10, 255]
        ports.append(port)

    # Some indicator lights
    lights = []
    for i in range(8):
        light = trimesh.creation.box(extents=(3.0, 3.0, 2.0))
        light.apply_translation([start_x + i * 22, port_height/2 + 4, body_depth/2])
        # Color: cyan/blue glow effect
        light.visual.face_colors = [0, 255, 255, 255]
        lights.append(light)

    # Combine all meshes into a scene
    meshes = [body, left_ear, right_ear] + ports + lights
    scene = trimesh.Scene(meshes)

    # Export to .glb
    output_path = "network_switch.glb"
    scene.export(output_path)
    print(f"Successfully generated {output_path}!")

except Exception as e:
    print(f"Error generating switch model: {e}")
