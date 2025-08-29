export const SegmentType = {
  HEAD_RIGHT: "head_right",
  HEAD_LEFT: "head_left",
  HEAD_UP: "head_up",
  HEAD_DOWN: "head_down",

  BODY_HORIZONTAL: "body_horizontal",
  BODY_VERTICAL: "body_vertical",

  TURN_TOP_LEFT: "turn_top_left",
  TURN_TOP_RIGHT: "turn_top_right",
  TURN_BOTTOM_LEFT: "turn_bottom_left",
  TURN_BOTTOM_RIGHT: "turn_bottom_right",

  TAIL_RIGHT: "tail_right",
  TAIL_LEFT: "tail_left",
  TAIL_UP: "tail_up",
  TAIL_DOWN: "tail_down",
} as const;

export type SegmentType = (typeof SegmentType)[keyof typeof SegmentType];

export const snakeSprites: Record<SegmentType, { x: number; y: number }> = {
  [SegmentType.HEAD_RIGHT]: { x: 256, y: 0 },
  [SegmentType.HEAD_LEFT]: { x: 192, y: 64 },
  [SegmentType.HEAD_UP]: { x: 192, y: 0 },
  [SegmentType.HEAD_DOWN]: { x: 256, y: 64 },

  [SegmentType.BODY_HORIZONTAL]: { x: 64, y: 0 },
  [SegmentType.BODY_VERTICAL]: { x: 128, y: 64 },

  [SegmentType.TURN_TOP_LEFT]: { x: 0, y: 0 },
  [SegmentType.TURN_TOP_RIGHT]: { x: 128, y: 0 },
  [SegmentType.TURN_BOTTOM_LEFT]: { x: 0, y: 64 },
  [SegmentType.TURN_BOTTOM_RIGHT]: { x: 128, y: 128 },

  [SegmentType.TAIL_RIGHT]: { x: 256, y: 128 },
  [SegmentType.TAIL_LEFT]: { x: 192, y: 192 },
  [SegmentType.TAIL_UP]: { x: 192, y: 128 },
  [SegmentType.TAIL_DOWN]: { x: 256, y: 192 },
};

export function getSegmentType(
  segmentIndex: number,
  segments: Array<{ getRow(): number; getCol(): number }>,
  velocity: { x: number; y: number }
): SegmentType {
  const current = segments[segmentIndex];

  // Head
  if (segmentIndex === 0) {
    if (velocity.x === 1) {
      return SegmentType.HEAD_RIGHT;
    }

    if (velocity.x === -1) {
      return SegmentType.HEAD_LEFT;
    }

    if (velocity.y === 1) {
      return SegmentType.HEAD_DOWN;
    }

    if (velocity.y === -1) {
      return SegmentType.HEAD_UP;
    }

    return SegmentType.HEAD_RIGHT;
  }

  // Tail
  if (segmentIndex === segments.length - 1) {
    const prev = segments[segmentIndex - 1];
    const deltaX = current.getCol() - prev.getCol();
    const deltaY = current.getRow() - prev.getRow();

    if (deltaX === 0 && deltaY === 0) {
      if (velocity.x === 1) {
        return SegmentType.TAIL_LEFT;
      }
      if (velocity.x === -1) {
        return SegmentType.TAIL_RIGHT;
      }
      if (velocity.y === 1) {
        return SegmentType.TAIL_UP;
      }
      if (velocity.y === -1) {
        return SegmentType.TAIL_DOWN;
      }
      return SegmentType.TAIL_RIGHT;
    }

    if (deltaX === 1) {
      return SegmentType.TAIL_LEFT;
    }
    if (deltaX === -1) {
      return SegmentType.TAIL_RIGHT;
    }
    if (deltaY === 1) {
      return SegmentType.TAIL_UP;
    }
    if (deltaY === -1) {
      return SegmentType.TAIL_DOWN;
    }
    
    return SegmentType.TAIL_RIGHT;
  }

  // Body
  const prev = segments[segmentIndex - 1];
  const next = segments[segmentIndex + 1];

  const prevDeltaX = current.getCol() - prev.getCol();
  const prevDeltaY = current.getRow() - prev.getRow();
  const nextDeltaX = next.getCol() - current.getCol();
  const nextDeltaY = next.getRow() - current.getRow();

  // Direct segments
  if (prevDeltaX === nextDeltaX && prevDeltaX !== 0) {
    return SegmentType.BODY_HORIZONTAL;
  }
  if (prevDeltaY === nextDeltaY && prevDeltaY !== 0) {
    return SegmentType.BODY_VERTICAL;
  }

  if (
    (prevDeltaX === -1 && nextDeltaY === 1) ||
    (prevDeltaY === -1 && nextDeltaX === 1)
  ) {
    return SegmentType.TURN_TOP_LEFT;
  }

  if (
    (prevDeltaX === 1 && nextDeltaY === 1) ||
    (prevDeltaY === -1 && nextDeltaX === -1)
  ) {
    return SegmentType.TURN_TOP_RIGHT;
  }

  if (
    (prevDeltaX === -1 && nextDeltaY === -1) ||
    (prevDeltaY === 1 && nextDeltaX === 1)
  ) {
    return SegmentType.TURN_BOTTOM_LEFT;
  }

  if (
    (prevDeltaX === 1 && nextDeltaY === -1) ||
    (prevDeltaY === 1 && nextDeltaX === -1)
  ) {
    return SegmentType.TURN_BOTTOM_RIGHT;
  }

  return SegmentType.BODY_HORIZONTAL;
}
