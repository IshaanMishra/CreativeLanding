import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { useToast } from "@/hooks/use-toast";

const locations = [
  { lat: 40.7128, lng: -74.0060, name: "New York" },
  { lat: 51.5074, lng: -0.1278, name: "London" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, name: "Sydney" },
];

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
  );
}