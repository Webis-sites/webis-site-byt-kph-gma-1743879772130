'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { FaDirections, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

interface LocationMapProps {
  apiKey: string;
  address: string;
  phone?: string;
  latitude: number;
  longitude: number;
  directions?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  apiKey,
  address,
  phone = '',
  latitude,
  longitude,
  directions = '',
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const options = {
    disableDefaultUI: false,
    zoomControl: true,
    scrollwheel: false,
    styles: [
      {
        featureType: 'poi.business',
        stylers: [{ visibility: 'on' }],
      },
    ],
  };

  const customMarkerIcon = {
    path: 'M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z',
    fillColor: '#FF6B6B',
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#FFFFFF',
    scale: 2,
    anchor: { x: 12, y: 22 },
  };

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      // Add zoom animation when map is loaded
      setTimeout(() => {
        mapRef.current?.setZoom(16);
      }, 300);
    }
  }, [mapLoaded]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
  };

  const openGoogleMapsDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      '_blank'
    );
  };

  return (
    <div className="location-map-container bg-white rounded-lg shadow-lg p-4 rtl" dir="rtl">
      <h2 className="text-2xl font-bold mb-4 text-right text-primary">המיקום שלנו</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-end mb-2">
          <span className="text-right font-medium mr-2">{address}</span>
          <FaMapMarkerAlt className="text-accent" />
        </div>
        
        {phone && (
          <div className="flex items-center justify-end mb-2">
            <span className="text-right mr-2" dir="ltr">{phone}</span>
            <FaPhone className="text-accent" />
          </div>
        )}
        
        {directions && (
          <div className="text-right mb-4">
            <h3 className="font-semibold mb-1">הוראות הגעה:</h3>
            <p>{directions}</p>
          </div>
        )}
        
        <button
          onClick={openGoogleMapsDirections}
          className="flex items-center justify-center bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-dark transition duration-300 mr-auto"
        >
          <FaDirections className="mr-2" />
          <span>קבל הכוונה</span>
        </button>
      </div>
      
      <div className="map-wrapper rounded-lg overflow-hidden border-2 border-gray-200">
        <LoadScript googleMapsApiKey={apiKey} language="he">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            options={options}
            onLoad={handleMapLoad}
          >
            <Marker
              position={center}
              icon={customMarkerIcon}
              onClick={() => setIsInfoOpen(true)}
            />
            
            {isInfoOpen && (
              <InfoWindow
                position={center}
                onCloseClick={() => setIsInfoOpen(false)}
              >
                <div className="text-right p-1">
                  <h3 className="font-bold">בית קפה גמא</h3>
                  <p>{address}</p>
                  {phone && <p dir="ltr">{phone}</p>}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      
      <div className="text-xs text-gray-500 mt-2 text-right">
        * לחץ על הסמן במפה לפרטים נוספים
      </div>
    </div>
  );
};

export default LocationMap;