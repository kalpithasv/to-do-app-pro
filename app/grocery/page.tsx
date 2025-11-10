'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Plus, ShoppingBag, CheckCircle2, Circle, Trash2, Edit2 } from 'lucide-react';
import { GroceryList, GroceryItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import GroceryCategoryIcon from '@/components/GroceryCategoryIcon';
import AnimatedIcon from '@/components/AnimatedIcon';

const categories = [
  'Fruits',
  'Vegetables',
  'Dairy',
  'Meat',
  'Seafood',
  'Bakery',
  'Beverages',
  'Alcohol',
  'Pantry',
  'Other',
];

export default function GroceryPage() {
  const { groceryLists, addGroceryList, updateGroceryList, deleteGroceryList, addGroceryItem, updateGroceryItem, deleteGroceryItem, initialize } = useStore();
  const [selectedList, setSelectedList] = useState<GroceryList | null>(null);
  const [showNewList, setShowNewList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Other');
  const [newItemQuantity, setNewItemQuantity] = useState('');

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Sync selected list with store
  useEffect(() => {
    if (selectedList) {
      const updatedList = groceryLists.find((l) => l.id === selectedList.id);
      if (updatedList) {
        setSelectedList(updatedList);
      }
    }
  }, [groceryLists, selectedList]);

  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList: GroceryList = {
        id: uuidv4(),
        name: newListName,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addGroceryList(newList);
      setNewListName('');
      setShowNewList(false);
      setSelectedList(newList);
    }
  };

  const handleAddItem = () => {
    if (!selectedList || !newItemName.trim()) return;

    const newItem: GroceryItem = {
      id: uuidv4(),
      name: newItemName,
      category: newItemCategory,
      quantity: newItemQuantity || undefined,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addGroceryItem(selectedList.id, newItem);
    setNewItemName('');
    setNewItemQuantity('');
    setShowAddItem(false);
  };

  const handleToggleItem = (itemId: string) => {
    if (!selectedList) return;
    const item = selectedList.items.find((i) => i.id === itemId);
    if (item) {
      updateGroceryItem(selectedList.id, itemId, { completed: !item.completed });
    }
  };

  const groupedItems = selectedList
    ? selectedList.items.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {} as Record<string, GroceryItem[]>)
    : {};

  const totalItems = selectedList?.items.length || 0;
  const completedItems = selectedList?.items.filter((i) => i.completed).length || 0;

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AnimatedIcon icon={ShoppingBag} size={36} color="#5f33e1" />
            <h1 className="text-3xl font-bold text-gray-800">Grocery Lists</h1>
          </div>
        </div>

        {!selectedList ? (
          <>
            {/* Lists View */}
            {groceryLists.length === 0 ? (
              <div className="text-center py-12">
                <AnimatedIcon icon={ShoppingBag} size={80} color="#5f33e1" />
                <p className="text-gray-500 mb-4 mt-6">No grocery lists yet</p>
                <button
                  onClick={() => setShowNewList(true)}
                  className="px-6 py-3 bg-[#5f33e1] text-white rounded-2xl font-semibold hover:bg-[#4d2ac0] transition-colors"
                >
                  Create List
                </button>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {groceryLists.map((list) => {
                  const completed = list.items.filter((i) => i.completed).length;
                  const total = list.items.length;
                  return (
                    <div
                      key={list.id}
                      onClick={() => setSelectedList(list)}
                      className="relative bg-gradient-to-r from-[#5f33e1] to-[#f778ba] rounded-2xl p-4 text-white cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 opacity-20">
                        <AnimatedIcon icon={ShoppingBag} size={50} color="#ffffff" />
                      </div>
                      <div className="flex items-center justify-between relative z-10">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{list.name}</h3>
                          <p className="text-sm opacity-90">
                            {completed}/{total} items
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{total > 0 ? Math.round((completed / total) * 100) : 0}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* New List Form */}
            {showNewList && (
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="List name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] mb-3"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateList}
                    className="flex-1 px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold hover:bg-[#4d2ac0] transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowNewList(false);
                      setNewListName('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Create List Button */}
            {!showNewList && (
              <button
                onClick={() => setShowNewList(true)}
                className="w-full bg-[#5f33e1] text-white rounded-2xl py-4 px-6 font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-[#4d2ac0] transition-colors"
              >
                <Plus size={20} />
                New Grocery List
              </button>
            )}
          </>
        ) : (
          <>
            {/* List Detail View */}
            <div className="mb-6">
              <button
                onClick={() => setSelectedList(null)}
                className="text-[#5f33e1] font-semibold mb-4 flex items-center gap-2"
              >
                ← Back to Lists
              </button>
              <div className="relative bg-gradient-to-r from-[#5f33e1] to-[#f778ba] rounded-2xl p-6 text-white mb-4 overflow-hidden">
                <div className="absolute top-4 right-4 opacity-20">
                  <AnimatedIcon icon={ShoppingBag} size={60} color="#ffffff" />
                </div>
                <h2 className="text-2xl font-bold mb-2 relative z-10">{selectedList.name}</h2>
                <div className="flex items-center gap-4 relative z-10">
                  <div>
                    <p className="text-sm opacity-90">Progress</p>
                    <p className="text-2xl font-bold">{completedItems}/{totalItems}</p>
                  </div>
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all"
                      style={{ width: `${totalItems > 0 ? (completedItems / totalItems) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Add Item Form */}
            {showAddItem && (
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Item name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] mb-3"
                  autoFocus
                />
                <input
                  type="text"
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(e.target.value)}
                  placeholder="Quantity (optional)..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] mb-3"
                />
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] mb-3"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddItem}
                    className="flex-1 px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold hover:bg-[#4d2ac0] transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddItem(false);
                      setNewItemName('');
                      setNewItemQuantity('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Items by Category */}
            <div className="space-y-4 mb-20">
              {Object.keys(groupedItems).length === 0 ? (
                <div className="text-center py-12">
                  <AnimatedIcon icon={ShoppingBag} size={80} color="#5f33e1" />
                  <p className="text-gray-500 mt-6">No items yet</p>
                </div>
              ) : (
                Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-3">
                      <GroceryCategoryIcon category={category} size={20} />
                      <h3 className="font-semibold text-gray-700">{category}</h3>
                      <span className="text-sm text-gray-500">
                        ({items.filter((i) => i.completed).length}/{items.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 transition-all ${
                            item.completed
                              ? 'border-green-200 bg-green-50 opacity-75'
                              : 'border-gray-200 hover:border-[#5f33e1]'
                          }`}
                        >
                          <button
                            onClick={() => handleToggleItem(item.id)}
                            className="flex-shrink-0"
                          >
                            {item.completed ? (
                              <CheckCircle2 className="text-green-500" size={24} />
                            ) : (
                              <Circle className="text-gray-400" size={24} />
                            )}
                          </button>
                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                item.completed ? 'line-through text-gray-500' : 'text-gray-800'
                              }`}
                            >
                              {item.name}
                            </p>
                            {item.quantity && (
                              <p className="text-sm text-gray-500">{item.quantity}</p>
                            )}
                          </div>
                          <button
                            onClick={() => deleteGroceryItem(selectedList.id, item.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="text-red-500" size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Item Button */}
            {!showAddItem && (
              <button
                onClick={() => setShowAddItem(true)}
                className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-[calc(100%-3rem)] max-w-md bg-[#5f33e1] text-white rounded-2xl py-4 px-6 font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-[#4d2ac0] transition-colors"
              >
                <Plus size={20} />
                Add Item
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

