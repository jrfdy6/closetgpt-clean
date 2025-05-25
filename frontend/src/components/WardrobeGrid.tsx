"use client";

import { useState } from "react";
import Image from "next/image";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export default function WardrobeGrid() {
  const [items] = useState<ClothingItem[]>([
    {
      id: "1",
      name: "Blue T-Shirt",
      category: "Tops",
      imageUrl: "/placeholder.jpg",
    },
    {
      id: "2",
      name: "Black Jeans",
      category: "Bottoms",
      imageUrl: "/placeholder.jpg",
    },
  ]);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <div>
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
            />
          </div>
          <div>
            <h3>{item.name}</h3>
            <p>{item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 