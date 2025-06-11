import { useEffect, useState } from "react";

export const useAverageImageColor = (imageSrc : string | undefined) => {
  const [averageColor, setAverageColor] = useState(null);

  useEffect(() => {
    if (!imageSrc) return;

    const getAverageColor = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return; 
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          let r = 0, g = 0, b = 0, count = 0;
          
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 128) {
              r += data[i];
              g += data[i + 1];
              b += data[i + 2];
              count++;
            }
          }
          
          if (count > 0) {
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);
            
            const hexColor = `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
            setAverageColor(hexColor);
          }
        } catch (error) {
          console.error('Error extracting color:', error);
        }
      };
      
      img.src = imageSrc;
    };

    getAverageColor();
  }, [imageSrc]);

  return averageColor;
};