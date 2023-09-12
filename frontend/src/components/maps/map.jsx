import React, { useEffect } from "react";
import style from "./map.module.css";
import { LongdoMap, longdo, map } from "./../longdomap/longdomap";

const Maps = (props) => {
  console.log(props);
  const mapKey = props.APIkey;

  useEffect(() => {
    const initMap = () => {
      console.log("InitMap called");
      const marker1 = new longdo.Marker(
        { lon: 102.863592, lat: 16.42843 },
        {
          title: "RMUTI",
          icon: {
            url: "https://map.longdo.com/mmmap/images/pin_mark.png",
            offset: { x: 12, y: 45 },
          },
          detail: "มหาวิทยาลัยเทคโนโลยีราชมงคล วิทยาเขตขอนแก่น",
          weight: longdo.OverlayWeight.Top,
        }
      );

      map.Overlays.add(marker1);
      map.Layers.setBase(longdo.Layers.GRAY);
      map.location({ lon: 102.8611283, lat: 16.4282731 }, true);
      map.zoom(18);
      console.log("Marker added to the map.");
    };

    const callback = () => {
      initMap();
    };

    if (window.longdo) {
      callback();
    } else {
      console.log("Longdo is not available yet");
    }

    return () => {
      // Cleanup: remove the script when the component unmounts
      const existingScript = document.getElementById("longdoMapScript");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [mapKey]);

  return (
    <div className={style.map_container}>
      <LongdoMap id="longdo-map" mapKey={mapKey} />
    </div>
  );
};

export default Maps;
