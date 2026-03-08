import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, QuadraticBezierLine } from '@react-three/drei';

function DeskPiRack() {
    const { scene } = useGLTF('https://deskpi.com/cdn/shop/3d/models/o/28c67e4976d0b6bd/dp-0022_3d.glb?v=0');
    return <primitive object={scene} />;
}

function Switch({ position }: { position: [number, number, number] }) {
    const { scene } = useGLTF('/8_port_ethernet_switch.glb');
    const cloned = useMemo(() => scene.clone(), [scene]);
    return <primitive object={cloned} position={position} scale={0.001} />;
}

function MiniPC({ position }: { position: [number, number, number] }) {
    const { scene } = useGLTF('/mini_pc.glb');
    const cloned = useMemo(() => scene.clone(), [scene]);
    return <primitive object={cloned} position={position} scale={0.8} rotation={[0, 0, Math.PI / 2]} />;
}

function RaspberryPi({ position }: { position: [number, number, number] }) {
    const { scene } = useGLTF('/raspberry_pi_3_model_b.glb');
    const cloned = useMemo(() => scene.clone(), [scene]);
    return <primitive object={cloned} position={position} scale={0.01} rotation={[0, Math.PI / 2, 0]} />;
}

export default function RackAssembly() {
    const X_CENTER = 0.0728;
    const Z_FRONT = -0.015;
    const Y_BOTTOM = -0.350;
    const U_HEIGHT = 0.04445;
    const WIDTH_10_INCH = 0.254;

    const getSlotY = (slotNum: number, numU = 1) => Y_BOTTOM + (slotNum - 1) * U_HEIGHT + (U_HEIGHT * numU) / 2.0;

    return (
        <Canvas camera={{ position: [0.4, 0.1, 0.9], fov: 40, near: 0.01, far: 10 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[1, 1, 1]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <OrbitControls autoRotate autoRotateSpeed={1.5} enableZoom={false} target={[X_CENTER, -0.15, Z_FRONT]} />
            <Environment preset="city" />

            <group position={[0, 0, 0]}>
                <DeskPiRack />

                {/* Slot 8: Switch */}
                <Switch position={[X_CENTER, getSlotY(8), Z_FRONT - 0.080]} />

                {/* Slot 7: Patch Panel and Front Cables */}
                <group position={[X_CENTER, getSlotY(7), Z_FRONT]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[WIDTH_10_INCH, U_HEIGHT - 0.002, 0.010]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>

                    {Array.from({ length: 8 }).map((_, i) => {
                        const px = -0.077 + i * 0.022; // Port X positions
                        const relSwitchY = getSlotY(8) - getSlotY(7); // Switch is now accurately at slot 8 center
                        const relSwitchZ = -0.055; // Adjusted Depth of switch ports based on new Switch Z position
                        const rpiY = getSlotY(6) - getSlotY(7) - U_HEIGHT / 2; // Pis are below

                        // Determine which RPi this cable goes to (2 ports per Pi)
                        const piIndex = Math.floor(i / 2);
                        const isPiMainCable = i % 2 === 0;
                        const rpiX = -0.09 + piIndex * 0.06;
                        const rpiZBack = -0.08; // Back of the Pi 

                        // Multi-color aesthetic from the first reference image
                        const cableColors = ["#22c55e", "#eab308", "#ef4444", "#3b82f6", "#22c55e", "#eab308", "#ef4444", "#3b82f6"];

                        return (
                            <group key={i}>
                                {/* Keystone Jack */}
                                <mesh position={[px, 0, 0.005]}><boxGeometry args={[0.014, 0.012, 0.012]} /><meshStandardMaterial color="#888" /></mesh>

                                {/* RJ45 Transparent Plugs (Front) */}
                                <mesh position={[px, 0, 0.013]}><boxGeometry args={[0.010, 0.010, 0.015]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.5} roughness={0} /></mesh>
                                <mesh position={[px, relSwitchY + 0.002, relSwitchZ + 0.01]}>
                                    <boxGeometry args={[0.010, 0.010, 0.015]} />
                                    <meshStandardMaterial color="#ffffff" transparent opacity={0.5} roughness={0} />
                                </mesh>

                                {/* Front Cable (Patch Panel to Switch - Cascading Rightwards Drop) */}
                                <QuadraticBezierLine
                                    start={[px, 0, 0.020]}
                                    end={[px, relSwitchY, relSwitchZ + 0.015]}
                                    mid={[px + 0.04, relSwitchY / 3, 0.12]} // Deep outward and rightward sweeping loop
                                    color={cableColors[i]}
                                    lineWidth={3.5}
                                />

                                {/* Back Cable (Patch Panel to Raspberry Pi) */}
                                {isPiMainCable && (
                                    <QuadraticBezierLine
                                        start={[px, 0, -0.005]} // Back of patch panel
                                        end={[rpiX, rpiY + 0.015, rpiZBack]} // Back of the Raspberry Pi
                                        mid={[(px + rpiX) / 2, rpiY / 2, -0.12]} // Curve deeply inwards towards the back
                                        color="#f97316" // Orange backhaul cables
                                        lineWidth={2.0}
                                    />
                                )}
                            </group>
                        )
                    })}
                </group>

                {/* Slot 6: Raspberry Pis */}
                <group position={[X_CENTER, getSlotY(6) - U_HEIGHT / 2, Z_FRONT]}>
                    <mesh position={[0, 0, -0.055]}>
                        <boxGeometry args={[WIDTH_10_INCH, 0.002, 0.120]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    {[-0.09, -0.03, 0.03, 0.09].map((x, i) => (
                        <group key={i}>
                            <RaspberryPi position={[x, 0.001, -0.040]} />
                            <mesh position={[x, 0.010, 0.005]}><boxGeometry args={[0.002, 0.002, 0.001]} /><meshBasicMaterial color="#f00" /></mesh>
                        </group>
                    ))}
                </group>

                {/* Slot 5: Mini PCs */}
                <group position={[X_CENTER, getSlotY(5) - U_HEIGHT / 2, Z_FRONT]}>
                    <mesh position={[0, 0, -0.07]}>
                        <boxGeometry args={[WIDTH_10_INCH, 0.002, 0.150]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    <MiniPC position={[-0.08, 0.001, -0.07]} />
                    <MiniPC position={[0, 0.001, -0.07]} />
                    <MiniPC position={[0.08, 0.001, -0.07]} />
                    <mesh position={[-0.08, 0.01, 0.015]}><boxGeometry args={[0.01, 0.002, 0.001]} /><meshBasicMaterial color="#0f0" /></mesh>
                    <mesh position={[0, 0.01, 0.015]}><boxGeometry args={[0.01, 0.002, 0.001]} /><meshBasicMaterial color="#0f0" /></mesh>
                    <mesh position={[0.08, 0.01, 0.015]}><boxGeometry args={[0.01, 0.002, 0.001]} /><meshBasicMaterial color="#0f0" /></mesh>
                </group>

                {/* Slots 1-2: NAS */}
                <group position={[X_CENTER, getSlotY(1, 2), Z_FRONT - 0.080]}>
                    <mesh>
                        <boxGeometry args={[0.214, U_HEIGHT * 2.0 - 0.004, 0.180]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <mesh key={i} position={[-0.075 + i * 0.05, 0, 0.090]}>
                            <boxGeometry args={[0.040, U_HEIGHT * 2.0 - 0.020, 0.005]} />
                            <meshStandardMaterial color="#111" />
                        </mesh>
                    ))}
                </group>

                {/* Power Cables (Routing to Bottom Back PDU) */}
                <group position={[0, 0, 0]}>
                    {[8, 7, 6, 5, 2].map((slot, i) => {
                        const startY = getSlotY(slot);
                        const startZ = -0.15; // Deep in the back of the devices
                        const endX = X_CENTER + 0.10; // Right side PDU rail
                        const endY = Y_BOTTOM + 0.02; // Bottom PDU
                        const endZ = -0.16; // Deep in the back

                        return (
                            <QuadraticBezierLine
                                key={`pwr-${i}`}
                                start={[X_CENTER - 0.05 + i * 0.02, startY, startZ]}
                                end={[endX, endY, endZ]}
                                mid={[endX - 0.02, (startY + endY) / 2, endZ - 0.05]} // Curve back and down
                                color="#111111" // Dark power cable
                                lineWidth={3.0}
                            />
                        )
                    })}
                </group>
            </group>
        </Canvas>
    );
}

useGLTF.preload('https://deskpi.com/cdn/shop/3d/models/o/28c67e4976d0b6bd/dp-0022_3d.glb?v=0');
useGLTF.preload('/8_port_ethernet_switch.glb');
useGLTF.preload('/mini_pc.glb');
useGLTF.preload('/raspberry_pi_3_model_b.glb');
