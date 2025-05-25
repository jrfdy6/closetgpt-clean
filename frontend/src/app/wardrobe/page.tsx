"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Shirt, Pencil, Trash, Filter, Upload, Check, AlertCircle } from "lucide-react";
import { useWardrobe } from "@/hooks/useWardrobe";
import type { ClothingItem } from "@/lib/utils/outfitGenerator";

// Filter options
const CLOTHING_TYPES = [
  "All",
  "Top",
  "Bottom",
  "Dress",
  "Outerwear",
  "Shoes",
  "Accessories",
];

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "type-asc", label: "Type A-Z" },
  { value: "type-desc", label: "Type Z-A" },
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
];

const SEASONS = ["Spring", "Summer", "Fall", "Winter"];

export default function WardrobePage() {
  const router = useRouter();
  const {
    items,
    isLoading,
    error,
    deleteItem,
  } = useWardrobe();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ClothingItem | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter and sort items
  const filteredItems = items
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType === "All" || item.type === selectedType;
      const matchesSeasons =
        selectedSeasons.length === 0 ||
        item.season.some((s) => selectedSeasons.includes(s));
      return matchesSearch && matchesType && matchesSeasons;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "type-asc":
          return a.type.localeCompare(b.type);
        case "type-desc":
          return b.type.localeCompare(a.type);
        case "date-desc":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "date-asc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });

  const handleSeasonToggle = (season: string) => {
    setSelectedSeasons((prev) =>
      prev.includes(season)
        ? prev.filter((s) => s !== season)
        : [...prev, season]
    );
  };

  const handleDelete = async (item: ClothingItem) => {
    setItemToDelete(item);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsDeleting(true);
      await deleteItem(itemToDelete.id);
      setItemToDelete(null);
    } catch (err) {
      console.error("Error deleting item:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.size === 0) return;

    try {
      setIsDeleting(true);
      await deleteItems(Array.from(selectedItems));
      setSelectedItems(new Set());
    } catch (err) {
      console.error("Error deleting items:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map((item) => item.id)));
    }
  };

  if (isLoading) {
    return (
      <div>
        <div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div>Loading...</div>
              <div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>
                  <div>Loading...</div>
                  <div>Loading...</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          <AlertCircle />
          <h3>Error</h3>
          <p>{error}</p>
        </div>
        <div>
          <button onClick={() => router.refresh()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wardrobe</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => router.push("/wardrobe/batch-upload")}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Upload className="h-5 w-5" />
            Batch Upload
          </button>
          <button 
            onClick={() => router.push("/wardrobe/add")}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            <Plus className="h-5 w-5" />
            Add Item
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="font-medium">Active Filters</span>
              </div>
              <button 
                onClick={() => setSelectedType("All")}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear All
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  {CLOTHING_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Seasons</label>
                <div className="flex flex-wrap gap-2">
                  {SEASONS.map((season) => (
                    <button
                      key={season}
                      onClick={() => handleSeasonToggle(season)}
                      className={`rounded-full px-3 py-1 text-sm ${
                        selectedSeasons.includes(season)
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
              <div className="relative aspect-square">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-all group-hover:bg-opacity-40 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => router.push(`/wardrobe/edit/${item.id}`)}
                      className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item)}
                      className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="absolute right-2 top-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-medium">{item.name}</h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Type</p>
                    <div className="flex items-center gap-2">
                      <p>{item.type}</p>
                      {item.subType && (
                        <span className="text-xs text-gray-500">({item.subType})</span>
                      )}
                    </div>
                  </div>

                  {item.dominantColors && item.dominantColors.length > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Colors</p>
                      <div className="flex items-center gap-2">
                        {item.dominantColors.map((color, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div 
                              className="h-4 w-4 rounded-full border border-gray-200" 
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-xs">{color.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.matchingColors && item.matchingColors.length > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Matching Colors</p>
                      <div className="flex items-center gap-2">
                        {item.matchingColors.map((color, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div 
                              className="h-4 w-4 rounded-full border border-gray-200" 
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-xs">{color.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.material && (
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Material</p>
                      <p>{item.material}</p>
                    </div>
                  )}

                  {item.brand && (
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Brand</p>
                      <p>{item.brand}</p>
                    </div>
                  )}

                  {item.style && item.style.length > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Style</p>
                      <div className="flex gap-1">
                        {item.style.map((style) => (
                          <span 
                            key={style}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs"
                          >
                            {style}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.occasion && item.occasion.length > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Occasion</p>
                      <div className="flex gap-1">
                        {item.occasion.map((occasion) => (
                          <span 
                            key={occasion}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs"
                          >
                            {occasion}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="font-medium">Season</p>
                    <div className="flex gap-1">
                      {item.season.map((season) => (
                        <span 
                          key={season}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs"
                        >
                          {season}
                        </span>
                      ))}
                    </div>
                  </div>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.metadata && Object.keys(item.metadata).length > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Additional Info</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(item.metadata).map(([key, value]) => (
                          <span 
                            key={key}
                            className="rounded-full bg-purple-50 px-2 py-0.5 text-xs text-purple-600"
                          >
                            {key}: {String(value)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <Shirt className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-xl font-medium">Your wardrobe is empty</h3>
            <p className="mb-6 text-gray-600">
              Start by adding some items to your wardrobe
            </p>
            <button 
              onClick={() => router.push("/wardrobe/add")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Add Your First Item
            </button>
          </div>
        )}
      </div>

      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-xl font-medium">Delete Item</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setItemToDelete(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 