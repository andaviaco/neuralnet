
export const DEFAULT_MAX_EPOCH = 100;
export const DEFAULT_LEARNING_RATE = 0.1;

export const SVG_CARTESIAN_WIDTH = 500;
export const SVG_CARTESIAN_HEIGHT = 500;
export const SVG_CARTESIAN_PADDING = 10;
export const UPPER_SCALE_DOMAIN = 10;
export const LOWER_SCALE_DOMAIN = -10;

export const TOOL_POINT_TYPE_1 = 'plus';
export const TOOL_POINT_TYPE_2 = 'minus';
export const DEFAULT_TOOL = TOOL_POINT_TYPE_1;

export const toolColorMap = {
  [TOOL_POINT_TYPE_1]: 'green',
  [TOOL_POINT_TYPE_2]: 'blue',
};

export default {
  DEFAULT_MAX_EPOCH,
  DEFAULT_LEARNING_RATE,
  SVG_CARTESIAN_WIDTH,
  SVG_CARTESIAN_HEIGHT,
  SVG_CARTESIAN_PADDING,
  UPPER_SCALE_DOMAIN,
  LOWER_SCALE_DOMAIN,
  TOOL_POINT_TYPE_1,
  TOOL_POINT_TYPE_2,
  DEFAULT_TOOL,
  toolColorMap,
};
