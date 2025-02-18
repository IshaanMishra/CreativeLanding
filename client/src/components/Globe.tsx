import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const locations = [
  { lat: 40.7128, lng: -74.0060, name: "New York" },
  { lat: 51.5074, lng: -0.1278, name: "London" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, name: "Sydney" },
];

// Function to calculate lunar phase
const getLunarPhase = () => {
  // Indian lunar calendar calculation (simplified)
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  // Calculate days since new moon (approximation)
  const phase = ((year - 2000) * 12.3685 + month + day / 30) % 29.5306;

  // Return phase between 0 and 1
  return phase / 29.5306;
};

const Moon = () => {
  const phase = getLunarPhase();
  const moonSize = 40; // Size of moon in pixels

  // Calculate moon appearance based on phase
  const getMoonGradient = () => {
    if (phase < 0.25) return 'linear-gradient(90deg, #1a1a1a 50%, #e1e1e1 50%)';
    if (phase < 0.5) return 'linear-gradient(90deg, #e1e1e1 50%, #e1e1e1 100%)';
    if (phase < 0.75) return 'linear-gradient(270deg, #1a1a1a 50%, #e1e1e1 50%)';
    return 'linear-gradient(270deg, #e1e1e1 0%, #1a1a1a 100%)';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-24 left-24 z-20"
    >
      <div
        style={{
          width: moonSize,
          height: moonSize,
          borderRadius: '50%',
          background: getMoonGradient(),
          boxShadow: '0 0 20px rgba(255,255,255,0.2)',
        }}
      />
    </motion.div>
  );
};

const ShootingStar = () => {
  return (
    <motion.div
      initial={{ x: "100%", y: 0, opacity: 1 }}
      animate={{ 
        x: "-100%", 
        y: "100%",
        opacity: [1, 1, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatDelay: 5
      }}
      className="absolute w-12 h-0.5 bg-white top-0 right-0 rotate-45 z-10"
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
      }}
    />
  );
};

export default function GlobeComponent() {
  const globeRef = useRef<any>();
  const { toast } = useToast();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;

      globeRef.current.pointOfView({
        lat: 25,
        lng: 0,
        altitude: 2.5
      });
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointClick = (point: any) => {
    toast({
      title: point.name,
      description: `Location clicked: ${point.name}`,
      duration: 2000,
    });
  };

  return (
    <div className="relative w-full h-full">
      <Moon />
      <ShootingStar />
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={locations}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#fff"}
        pointAltitude={0.1}
        pointRadius={0.5}
        pointLabel="name"
        onPointClick={handlePointClick}
        atmosphereColor="hsl(222.2 84% 4.9%)"
        atmosphereAltitude={0.15}
      />
    </div>
  );
}