
export const DEFAULT_MAX_EPOCH = 1000;
export const DEFAULT_LEARNING_RATE = 0.3;
export const DEFAULT_DESIRED_ERROR = 0.01;

export const ADALINE_WEIGHTS_INITIAL_LOWER_BOUND = -1;
export const ADALINE_WEIGHTS_INITIAL_UPPER_BOUND = 1;

export const SVG_CARTESIAN_WIDTH = 350;
export const SVG_CARTESIAN_HEIGHT = 350;
export const SVG_CARTESIAN_PADDING = 10;
export const UPPER_SCALE_DOMAIN = 10;
export const LOWER_SCALE_DOMAIN = -10;

export const SVG_ERRORCHART_WIDTH = 500;
export const SVG_ERRORCHART_HEIGHT = 150;
export const UPPER_ERROR_DOMAIN = 1.0;
export const LOWER_ERROR_DOMAIN = 0;

export const DRAWING_SPEED = 25;

export const POINT_TYPE_1 = 0;
export const POINT_TYPE_2 = 1;
export const POINT_TYPE_3 = 2;

export const TOOL_POINT_TYPE_1 = 'class1';
export const TOOL_POINT_TYPE_2 = 'class2';
export const TOOL_POINT_TYPE_3 = 'class3';
export const DEFAULT_TOOL = TOOL_POINT_TYPE_1;

export const pointTypeColorMap = {
  [POINT_TYPE_1]: '#409EFF', // blue
  [POINT_TYPE_2]: '#67C23A', // green
  [POINT_TYPE_3]: '#E6A23C', // yellow
};

export const toolPointTypeMap = {
  [TOOL_POINT_TYPE_1]: POINT_TYPE_1,
  [TOOL_POINT_TYPE_2]: POINT_TYPE_2,
  [TOOL_POINT_TYPE_3]: POINT_TYPE_3,
};

export const CLASS_DISCRETE_MAP = {
  [POINT_TYPE_1]: [0],
  [POINT_TYPE_2]: [1],
  [POINT_TYPE_3]: [2],
};

export const neuronStates = {
  UNTRAINED: 0,
  TRAINING: 1,
  TRAINED: 2,
};

export const NEURON_STATUS_UNTRAINED = 'untrained';
export const NEURON_STATUS_TRAINING = 'training';
export const NEURON_STATUS_TRAINED = 'trained';

export const LINE_TYPE_UNTRAINED = NEURON_STATUS_UNTRAINED;
export const LINE_TYPE_TRAINING = NEURON_STATUS_TRAINING;
export const LINE_TYPE_TRAINED = NEURON_STATUS_TRAINED;

export const neuronStateMap = {
  [neuronStates.UNTRAINED]: NEURON_STATUS_UNTRAINED,
  [neuronStates.TRAINING]: NEURON_STATUS_TRAINING,
  [neuronStates.TRAINED]: NEURON_STATUS_TRAINED,
};

export const lineTypecolorMap = {
  [LINE_TYPE_UNTRAINED]: '#909399', // gray
  [LINE_TYPE_TRAINING]: 'rgba(184, 53, 214, 0.1)',
  [LINE_TYPE_TRAINED]: 'red',
};

export const statusColorMap = {
  [NEURON_STATUS_UNTRAINED]: 'danger',
  [NEURON_STATUS_TRAINING]: 'warning',
  [NEURON_STATUS_TRAINED]: 'success',
};

export default {
  DEFAULT_MAX_EPOCH,
  DEFAULT_LEARNING_RATE,
  ADALINE_WEIGHTS_INITIAL_LOWER_BOUND,
  ADALINE_WEIGHTS_INITIAL_UPPER_BOUND,

  SVG_CARTESIAN_WIDTH,
  SVG_CARTESIAN_HEIGHT,
  SVG_CARTESIAN_PADDING,
  UPPER_SCALE_DOMAIN,
  LOWER_SCALE_DOMAIN,

  DRAWING_SPEED,

  POINT_TYPE_1,
  POINT_TYPE_2,

  TOOL_POINT_TYPE_1,
  TOOL_POINT_TYPE_2,
  TOOL_POINT_TYPE_3,
  DEFAULT_TOOL,

  pointTypeColorMap,
  toolPointTypeMap,

  LINE_TYPE_UNTRAINED,
  LINE_TYPE_TRAINED,
  lineTypecolorMap,

  NEURON_STATUS_UNTRAINED,
  NEURON_STATUS_TRAINING,
  NEURON_STATUS_TRAINED,
  neuronStates,
  neuronStateMap,
  statusColorMap,
};
