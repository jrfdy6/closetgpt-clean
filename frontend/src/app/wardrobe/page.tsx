"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useWardrobe } from '@/lib/hooks/useWardrobe';
import { ClothingItem } from '@/types/wardrobe';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, RefreshCw, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { migrateWardrobeItems } from '@/lib/firebase/wardrobeService';
import { UpdateWardrobeNames } from '@/components/UpdateWardrobeNames';
import Image from 'next/image';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase/config';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function WardrobePage() {
  const { user, loading: authLoading } = useAuth();
  const { items, loading, error, loadItems } = useWardrobe();
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const [isMigrating, setIsMigrating] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [retryCount, setRetryCount] = useState<Record<string, number>>({});
  const [imageLoadAttempts, setImageLoadAttempts] = useState<Record<string, number>>({});
  const [itemToDelete, setItemToDelete] = useState<ClothingItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const MAX_RETRIES = 3;
  const [newTag, setNewTag] = useState<string>('');
  const [itemTags, setItemTags] = useState<Record<string, string[]>>({});

  useEffect(() => {
    console.log('WardrobePage state:', {
      authLoading,
      loading,
      user: user?.uid,
      itemsCount: items?.length,
      error
    });
  }, [authLoading, loading, user, items, error]);

  const handleMigrate = async () => {
    if (!user) return;

    setIsMigrating(true);
    try {
      await migrateWardrobeItems(user.uid);
      await loadItems();
      toast({
        title: 'Success',
        description: 'Wardrobe items have been updated to the new schema.',
      });
    } catch (err) {
      console.error('Error migrating wardrobe items:', err);
      toast({
        title: 'Error',
        description: 'Failed to update wardrobe items. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsMigrating(false);
    }
  };

  const handleImageError = (itemId: string, itemName: string, e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    const currentRetries = retryCount[itemId] || 0;
    
    console.log(`Image load error for ${itemName}:`, {
      itemId,
      currentSource: target.src,
      naturalWidth: target.naturalWidth,
      naturalHeight: target.naturalHeight,
      retryCount: currentRetries,
      timestamp: new Date().toISOString()
    });

    if (currentRetries < MAX_RETRIES) {
      // Increment retry count
      setRetryCount(prev => ({ ...prev, [itemId]: currentRetries + 1 }));
      // Clear the error state to trigger a retry
      setImageErrors(prev => ({ ...prev, [itemId]: false }));
      
      // Force a re-render of the image with a cache-busting parameter
      const img = target as HTMLImageElement;
      if (img.src && storage && user?.uid) {
        try {
          // Extract the path from the current image URL
          const url = new URL(img.src);
          const pathMatch = url.pathname.match(/\/o\/(.+?)(?:\?|$)/);
          if (!pathMatch) {
            throw new Error('Could not extract path from image URL');
          }
          const decodedPath = decodeURIComponent(pathMatch[1]);
          
          // Get a fresh download URL using the extracted path
          const storageRef = ref(storage, decodedPath);
          getDownloadURL(storageRef)
            .then(newUrl => {
              img.src = newUrl;
            })
            .catch(error => {
              console.error('Error getting fresh download URL:', error);
              setImageErrors(prev => ({ ...prev, [itemId]: true }));
            });
        } catch (error) {
          console.error('Error creating storage reference:', error);
          setImageErrors(prev => ({ ...prev, [itemId]: true }));
        }
      } else {
        setImageErrors(prev => ({ ...prev, [itemId]: true }));
      }
    } else {
      // Max retries reached, show placeholder
      setImageErrors(prev => ({ ...prev, [itemId]: true }));
    }
  };

  const handleDeleteItem = async (item: ClothingItem) => {
    if (!user || !item.id || !storage || !db) return;
    
    setIsDeleting(true);
    try {
      // Delete the image from storage if it exists
      if (item.imageUrl) {
        try {
          const url = new URL(item.imageUrl);
          const pathMatch = url.pathname.match(/\/o\/(.+?)(?:\?|$)/);
          if (pathMatch) {
            const decodedPath = decodeURIComponent(pathMatch[1]);
            const storageRef = ref(storage, decodedPath);
            await deleteObject(storageRef);
          }
        } catch (error) {
          console.error('Error deleting image from storage:', error);
          // Continue with item deletion even if image deletion fails
        }
      }

      // Delete the item from Firestore
      await deleteDoc(doc(db, 'wardrobe', item.id));
      
      toast({
        title: 'Success',
        description: 'Item deleted successfully.',
      });
      
      // Reload the wardrobe items
      await loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete item. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const handleAddTag = (itemId: string) => {
    if (newTag && !itemTags[itemId]?.includes(newTag)) {
      setItemTags(prev => ({
        ...prev,
        [itemId]: [...(prev[itemId] || []), newTag]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (itemId: string, tagToRemove: string) => {
    setItemTags(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || []).filter(tag => tag !== tagToRemove)
    }));
  };

  const filteredItems = Array.isArray(items) ? items.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.type.toLowerCase().includes(searchLower) ||
      (item.subType?.toLowerCase().includes(searchLower) ?? false) ||
      (item.color?.toLowerCase().includes(searchLower) ?? false) ||
      (item.season?.some(s => s.toLowerCase().includes(searchLower)) ?? false)
    );
  }) : [];

  if (authLoading || loading) {
    console.log('WardrobePage: Still loading...', { authLoading, loading });
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('WardrobePage: No user found');
    return <div>Please sign in to view your wardrobe.</div>;
  }

  if (error) {
    console.error('WardrobePage: Error state', error);
    return (
      <div className="flex items-center justify-center p-4">
        <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  if (!items || items.length === 0) {
    console.log('WardrobePage: No items found');
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Wardrobe</h1>
        <div className="text-center p-8">
          <p className="text-gray-600">Your wardrobe is empty. Add some items to get started!</p>
        </div>
      </div>
    );
  }

  console.log('WardrobePage: Rendering items', { itemsCount: items.length });
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Wardrobe</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => window.location.href = '/wardrobe/add'}
            variant="default"
          >
            Add Item
          </Button>
          <Button
            onClick={() => window.location.href = '/wardrobe/batch-upload'}
            variant="outline"
          >
            Batch Upload
          </Button>
          <Button
            onClick={handleMigrate}
            disabled={isMigrating}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isMigrating ? 'animate-spin' : ''}`} />
            {isMigrating ? 'Updating...' : 'Update Schema'}
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search your wardrobe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="mb-4">
        <UpdateWardrobeNames />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative w-full h-48 mb-2">
              {item.imageUrl && !imageErrors[item.id] ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name || 'Clothing item'}
                  fill
                  className="object-cover rounded-lg"
                  onError={(e) => handleImageError(item.id, item.name || 'Unnamed item', e)}
                  unoptimized
                  priority={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  onLoad={() => {
                    console.log(`Image loaded successfully for ${item.name || 'Unnamed item'}:`, {
                      itemId: item.id,
                      imageUrl: item.imageUrl,
                      timestamp: new Date().toISOString()
                    });
                  }}
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  quality={100}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="text-gray-400">{item.name || 'Unnamed item'}</span>
                </div>
              )}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setItemToDelete(item)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-lg font-semibold">{item.name || 'Unnamed item'}</h2>
            <div className="mt-2 space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{item.type}</Badge>
                {item.subType && <Badge variant="outline">{item.subType}</Badge>}
                {item.color && <Badge variant="outline">{item.color}</Badge>}
                {item.season?.map(s => (
                  <Badge key={s} variant="outline">{s}</Badge>
                ))}
              </div>
              
              {item.brand && (
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">Brand:</span> {item.brand}</p>
                </div>
              )}
              
              {item.metadata?.visualAttributes && (
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">Material:</span> {item.metadata.visualAttributes.material || 'Unknown'}</p>
                  <p><span className="font-medium">Pattern:</span> {item.metadata.visualAttributes.pattern || 'Solid'}</p>
                  <p><span className="font-medium">Fit:</span> {item.metadata.visualAttributes.fit || 'Regular'}</p>
                  {item.metadata.visualAttributes.sleeveLength && (
                    <p><span className="font-medium">Sleeve Length:</span> {item.metadata.visualAttributes.sleeveLength}</p>
                  )}
                  {item.metadata.visualAttributes.length && (
                    <p><span className="font-medium">Length:</span> {item.metadata.visualAttributes.length}</p>
                  )}
                  {item.metadata.visualAttributes.formalLevel && (
                    <p><span className="font-medium">Formality:</span> {item.metadata.visualAttributes.formalLevel}</p>
                  )}
                </div>
              )}
              
              {item.style && item.style.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.style.map(style => (
                    <Badge key={style} variant="secondary" className="text-xs">
                      {style}
                    </Badge>
                  ))}
                </div>
              )}
              
              {item.occasion && item.occasion.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.occasion.map(occasion => (
                    <Badge key={occasion} variant="outline" className="text-xs">
                      {occasion}
                    </Badge>
                  ))}
                </div>
              )}
              
              {item.metadata?.itemMetadata?.careInstructions && (
                <div className="text-sm text-gray-600 mt-2">
                  <p><span className="font-medium">Care Instructions:</span> {item.metadata.itemMetadata.careInstructions}</p>
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="border rounded p-1 text-sm"
                />
                <button
                  onClick={() => handleAddTag(item.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Add Tag
                </button>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {itemTags[item.id]?.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(item.id, tag)}
                      className="ml-1 text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!itemToDelete} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => itemToDelete && handleDeleteItem(itemToDelete)}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 