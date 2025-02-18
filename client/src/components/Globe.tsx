import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { useToast } from "@/hooks/use-toast";

const locations = [
  { lat: 40.7128, lng: -74.0060, name: "New York, U.S.A" },
  { lat: 51.5074, lng: -0.1278, name: "London, Angrez" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo, Japan" },
  { lat: -33.8688, lng: 151.2093, name: "Sydney, Australia" },
  { lat: 28.6139, lng: 77.2090, name: "New Delhi (National Capital)" },
  { lat: 31.1048, lng: 77.1734, name: "Shimla, Himachal Pradesh" },
  { lat: 30.7333, lng: 76.7794, name: "Chandigarh (Punjab & Haryana)" },
  { lat: 30.9010, lng: 75.8573, name: "Ludhiana, Punjab" }, 
  { lat: 26.8467, lng: 80.9462, name: "Lucknow, Uttar Pradesh" },
  { lat: 23.2599, lng: 77.4126, name: "Bhopal, Madhya Pradesh" },
  { lat: 21.2514, lng: 81.6296, name: "Raipur, Chhattisgarh" },
  { lat: 27.0238, lng: 74.2179, name: "Jaipur, Rajasthan" },
  { lat: 23.2156, lng: 72.6369, name: "Gandhinagar, Gujarat" },
  { lat: 22.5726, lng: 88.3639, name: "Kolkata, West Bengal" },
  { lat: 25.5941, lng: 85.1376, name: "Patna, Bihar" },
  { lat: 26.1158, lng: 85.3131, name: "Muzaffarpur, Bihar" },
  { lat: 26.1445, lng: 91.7362, name: "Dispur, Assam" },
  { lat: 27.4712, lng: 94.9110, name: "Itanagar, Arunachal Pradesh" },
  { lat: 25.5788, lng: 91.8933, name: "Shillong, Meghalaya" },
  { lat: 24.8170, lng: 93.9368, name: "Imphal, Manipur" },
  { lat: 25.6747, lng: 94.1100, name: "Kohima, Nagaland" },
  { lat: 23.6102, lng: 92.8372, name: "Aizawl, Mizoram" },
  { lat: 23.8315, lng: 91.2868, name: "Agartala, Tripura" },
  { lat: 25.4670, lng: 91.3662, name: "Tura, Meghalaya" },
  { lat: 22.9734, lng: 78.6569, name: "Jabalpur, Madhya Pradesh" },
  { lat: 20.2961, lng: 85.8245, name: "Bhubaneswar, Odisha" },
  { lat: 15.3173, lng: 75.7139, name: "Bengaluru, Karnataka" },
  { lat: 11.0168, lng: 76.9558, name: "Chennai, Tamil Nadu" },
  { lat: 8.5241,  lng: 76.9366, name: "Thiruvananthapuram, Kerala" },
  { lat: 17.3850, lng: 78.4867, name: "Hyderabad, Telangana" },
  { lat: 16.5062, lng: 80.6480, name: "Amaravati, Andhra Pradesh" },
  { lat: 34.0837, lng: 74.7973, name: "Srinagar, Jammu & Kashmir" },
  { lat: 32.7266, lng: 74.8570, name: "Jammu, Jammu & Kashmir" },
  { lat: 34.1526, lng: 77.5770, name: "Leh, Ladakh" },
  { lat: 11.9416, lng: 79.8083, name: "Puducherry (Union Territory)" },
  { lat: 13.6288, lng: 79.4192, name: "Tirupati, Andhra Pradesh" },
  { lat: 20.2665, lng: 85.8438, name: "Cuttack, Odisha" }
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
      description: `Place: ${point.name}`,
      duration: 4000,
    });
    globeRef.current.controls().autoRotate = false;
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
      pointAltitude={0.2}
      pointRadius={1}
      pointLabel="name"
      onPointClick={handlePointClick}
      atmosphereColor="hsl(222.2 84% 4.9%)"
      atmosphereAltitude={0.15}
    />
  );
}