
export const DEFAULT_MAX_EPOCH = 100;
export const DEFAULT_LEARNING_RATE = 0.1;

export const SVG_CARTESIAN_WIDTH = 500;
export const SVG_CARTESIAN_HEIGHT = 500;
export const SVG_CARTESIAN_PADDING = 10;
export const UPPER_SCALE_DOMAIN = 10;
export const LOWER_SCALE_DOMAIN = -10;

export const POINT_TYPE_1 = 0;
export const POINT_TYPE_2 = 1;

export const TOOL_POINT_TYPE_1 = 'minus';
export const TOOL_POINT_TYPE_2 = 'plus';
export const DEFAULT_TOOL = TOOL_POINT_TYPE_1;

export const pointTypeColorMap = {
  [POINT_TYPE_1]: 'blue',
  [POINT_TYPE_2]: 'green',
};

export const toolPointTypeMap = {
  [TOOL_POINT_TYPE_1]: POINT_TYPE_1,
  [TOOL_POINT_TYPE_2]: POINT_TYPE_2,
};

export const LINE_TYPE_UNTRAINED = 'untrained';
export const LINE_TYPE_TRAINED = 'trained';

export const lineTypecolorMap = {
  [LINE_TYPE_UNTRAINED]: 'gray',
  [LINE_TYPE_TRAINED]: 'red',
};

export const perceptronStates = {
  UNTRAINED: 0,
  TRAINING: 1,
  TRAINED: 2,
};

export const perceptronStateMap = {
  [perceptronStates.UNTRAINED]: 'untrained',
  [perceptronStates.TRAINING]: 'training',
  [perceptronStates.TRAINED]: 'trained',
};

export default {
  DEFAULT_MAX_EPOCH,
  DEFAULT_LEARNING_RATE,
  SVG_CARTESIAN_WIDTH,
  SVG_CARTESIAN_HEIGHT,
  SVG_CARTESIAN_PADDING,
  UPPER_SCALE_DOMAIN,
  LOWER_SCALE_DOMAIN,

  POINT_TYPE_1,
  POINT_TYPE_2,

  TOOL_POINT_TYPE_1,
  TOOL_POINT_TYPE_2,
  DEFAULT_TOOL,

  pointTypeColorMap,
  toolPointTypeMap,

  LINE_TYPE_UNTRAINED,
  LINE_TYPE_TRAINED,
  lineTypecolorMap,

  perceptronStates,
  perceptronStateMap,
};
