'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { animationClasses } from '@/lib/animations';

interface DragItem {
  id: number;
  text: string;
  position: { x: number; y: number };
  gridPosition: number | null;
  isDragging: boolean;
}

const demoStatements = [
  "Remote work increases productivity",
  "AI will replace human creativity",
  "Social media improves communication",
  "Climate action requires immediate change",
  "Technology enhances learning",
  "Work-life balance is achievable",
  "Data privacy is a fundamental right",
  "Renewable energy is cost-effective",
  "Automation creates more jobs",
  "Digital payments are more secure"
];

const gridPositions = [
  { value: -4, slots: 1, label: "Most Disagree" },
  { value: -3, slots: 2, label: "Strongly Disagree" },
  { value: -2, slots: 3, label: "Disagree" },
  { value: -1, slots: 4, label: "Somewhat Disagree" },
  { value: 0, slots: 5, label: "Neutral" },
  { value: 1, slots: 4, label: "Somewhat Agree" },
  { value: 2, slots: 3, label: "Agree" },
  { value: 3, slots: 2, label: "Strongly Agree" },
  { value: 4, slots: 1, label: "Most Agree" }
];

export default function QMethodologyDemo() {
  const [items, setItems] = useState<DragItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [isAutoDemo, setIsAutoDemo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const initialItems = demoStatements.map((text, index) => ({
        id: index,
        text,
        position: { x: 0, y: index * 60 },
        gridPosition: null,
        isDragging: false
      }));
      setItems(initialItems);
    }
  }, [isVisible]);

  const handleDragStart = (item: DragItem, event: React.MouseEvent) => {
    event.preventDefault();
    setDraggedItem(item);
    setItems(prev => prev.map(i => 
      i.id === item.id ? { ...i, isDragging: true } : i
    ));
  };

  const handleDragMove = (event: React.MouseEvent) => {
    if (!draggedItem || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setItems(prev => prev.map(item =>
      item.id === draggedItem.id
        ? { ...item, position: { x: x - 100, y: y - 25 } }
        : item
    ));
  };

  const handleDragEnd = (event: React.MouseEvent) => {
    if (!draggedItem || !containerRef.current) return;

    // Check if dropped on grid
    const gridElement = document.elementFromPoint(event.clientX, event.clientY);
    if (gridElement && gridElement.classList.contains('grid-slot')) {
      const gridValue = parseInt(gridElement.getAttribute('data-value') || '0');
      
      setItems(prev => prev.map(item =>
        item.id === draggedItem.id
          ? { 
              ...item, 
              gridPosition: gridValue,
              position: { x: 0, y: 0 },
              isDragging: false
            }
          : item
      ));
    } else {
      // Return to original position
      setItems(prev => prev.map(item =>
        item.id === draggedItem.id
          ? { ...item, position: { x: 0, y: draggedItem.id * 60 }, isDragging: false }
          : item
      ));
    }

    setDraggedItem(null);
  };

  const runAutoDemo = async () => {
    setIsAutoDemo(true);
    
    // Reset all items
    setItems(prev => prev.map(item => ({ 
      ...item, 
      gridPosition: null, 
      position: { x: 0, y: item.id * 60 } 
    })));

    // Animate items into grid positions
    for (let i = 0; i < items.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const targetGrid = Math.floor((i / items.length) * 9) - 4; // Distribute across grid
      setItems(prev => prev.map((item, index) =>
        index === i
          ? { ...item, gridPosition: targetGrid }
          : item
      ));
    }

    setTimeout(() => setIsAutoDemo(false), 1000);
  };

  const resetDemo = () => {
    setItems(prev => prev.map(item => ({ 
      ...item, 
      gridPosition: null, 
      position: { x: 0, y: item.id * 60 } 
    })));
  };

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-5xl lg:text-6xl font-bold text-slate-900 mb-8 ${isVisible ? animationClasses.fadeIn : 'opacity-0'}`}>
            Try Q Methodology
            <span className="block text-blue-600 mt-2">Interactive Demo</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Experience the power of Q methodology firsthand. Drag statements to sort them 
            according to your perspective, from &quot;Most Disagree&quot; to &quot;Most Agree&quot;.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={runAutoDemo}
              disabled={isAutoDemo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              {isAutoDemo ? 'Running Demo...' : 'Auto Demo'}
            </Button>
            <Button 
              variant="outline"
              onClick={resetDemo}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Reset
            </Button>
          </div>
        </div>

        <div 
          className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-blue-100"
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Statements Pool */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center lg:text-left">
                Drag Statements
              </h3>
              <div className="space-y-3 min-h-[600px]">
                {items.filter(item => item.gridPosition === null).map(item => (
                  <div
                    key={item.id}
                    className={`
                      relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 select-none
                      ${item.isDragging ? 'scale-105 rotate-2 z-50 shadow-2xl' : ''}
                    `}
                    style={{
                      transform: item.isDragging 
                        ? `translate(${item.position.x}px, ${item.position.y}px) scale(1.05) rotate(2deg)`
                        : 'none',
                      position: item.isDragging ? 'absolute' : 'relative',
                      zIndex: item.isDragging ? 1000 : 1
                    }}
                    onMouseDown={(e) => handleDragStart(item, e)}
                  >
                    <p className="text-sm font-medium leading-tight">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Q-Grid */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Q-Sort Grid
              </h3>
              
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border-2 border-dashed border-blue-200">
                <div className="grid grid-cols-9 gap-2 mb-4">
                  {gridPositions.map((column) => 
                    Array.from({ length: column.slots }).map((_, slotIndex) => {
                      const placedItem = items.find(item => item.gridPosition === column.value);
                      const isOccupied = placedItem && slotIndex === 0; // For simplicity, use first slot
                      
                      return (
                        <div
                          key={`${column.value}-${slotIndex}`}
                          className={`
                            grid-slot aspect-square rounded-lg border-2 border-dashed transition-all duration-300 flex items-center justify-center min-h-[80px]
                            ${isOccupied 
                              ? 'border-green-400 bg-green-50' 
                              : 'border-blue-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                            }
                          `}
                          data-value={column.value}
                          data-slot={slotIndex}
                        >
                          {isOccupied && (
                            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-2 rounded-lg text-xs font-medium text-center leading-tight shadow-lg">
                              {placedItem?.text}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
                
                {/* Grid labels */}
                <div className="grid grid-cols-9 gap-2 text-xs text-slate-600 text-center">
                  {gridPositions.map((column) => (
                    <div key={column.value} className="font-medium">
                      <div className="text-slate-800 font-bold text-sm mb-1">{column.value}</div>
                      <div className="leading-tight">{column.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center mt-6 text-slate-600">
                <p className="text-sm">
                  Items sorted: {items.filter(item => item.gridPosition !== null).length} / {items.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}