"use client";

import { useState } from "react";
import Image from "next/image";
import { ClothingItem } from "@shared/types";

export default function WardrobeGrid() {
  const [items, setItems] = useState<ClothingItem[]>([]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="relative aspect-square">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white rounded-b-lg">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs">{item.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 