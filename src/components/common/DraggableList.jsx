import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/* ------------------ Sortable Item ------------------ */

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
    paddingTop: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    touchAction: 'none', // 👈 REQUIRED for touch
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* Drag handle */}
      <span
        {...listeners}
        style={{
          cursor: 'grab',
          padding: '4px 8px',
          userSelect: 'none',
        }}
      >
        ☰
      </span>

      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

/* ------------------ Draggable List ------------------ */

export default function DraggableList({ items, onChange }) {
  const [currentItems, setCurrentItems] = useState(items);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // drag after move
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // long press
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = currentItems.findIndex(
      (item) => item.id === active.id
    );
    const newIndex = currentItems.findIndex(
      (item) => item.id === over.id
    );

    const newItems = arrayMove(currentItems, oldIndex, newIndex);

    setCurrentItems(newItems);
    onChange?.(newItems);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={currentItems.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {currentItems.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            {item.content}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
