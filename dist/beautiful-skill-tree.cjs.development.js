'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = require('react');
var React__default = _interopDefault(React);
var uuid = require('uuid');
var styled = require('styled-components');
var styled__default = _interopDefault(styled);
var lodash = require('lodash');
var Tippy = _interopDefault(require('@tippy.js/react'));
require('tippy.js/dist/tippy.css');
require('tippy.js/animations/shift-away.css');

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_REQUIRED_SKILL':
      return _extends({}, state, {
        selectedSkillCount: {
          optional: state.selectedSkillCount.optional,
          required: state.selectedSkillCount.required + 1,
        },
      });

    case 'DESELECT_REQUIRED_SKILL':
      return _extends({}, state, {
        selectedSkillCount: {
          optional: state.selectedSkillCount.optional,
          required: state.selectedSkillCount.required - 1,
        },
      });

    case 'SELECT_OPTIONAL_SKILL':
      return _extends({}, state, {
        selectedSkillCount: {
          optional: state.selectedSkillCount.optional + 1,
          required: state.selectedSkillCount.required,
        },
      });

    case 'DESELECT_OPTIONAL_SKILL':
      return _extends({}, state, {
        selectedSkillCount: {
          optional: state.selectedSkillCount.optional - 1,
          required: state.selectedSkillCount.required,
        },
      });

    case 'RESET_SKILLS':
      return initialState;

    default:
      return state;
  }
}

var AppContext =
  /*#__PURE__*/
  React.createContext({
    skillCount: {
      required: 0,
      optional: 0,
    },
    addToSkillCount: function addToSkillCount() {
      return undefined;
    },
    selectedSkillCount: {
      required: 0,
      optional: 0,
    },
    dispatch: function dispatch() {
      return '';
    },
    resetId: '',
    resetSkills: function resetSkills() {
      return undefined;
    },
  });
var initialState = {
  selectedSkillCount: {
    required: 0,
    optional: 0,
  },
};
function AppProvider(_ref) {
  var children = _ref.children;

  var _React$useState = React.useState(''),
    resetId = _React$useState[0],
    setResetId = _React$useState[1];

  var _React$useState2 = React.useState({
      required: 0,
      optional: 0,
    }),
    skillCount = _React$useState2[0],
    setSkillCount = _React$useState2[1];

  var _React$useReducer = React.useReducer(reducer, initialState),
    state = _React$useReducer[0],
    dispatch = _React$useReducer[1];

  function addToSkillCount(skillCount) {
    return setSkillCount(function(prev) {
      return {
        required: prev.required + skillCount.required,
        optional: prev.optional + skillCount.optional,
      };
    });
  }

  function resetSkills() {
    var action = {
      type: 'RESET_SKILLS',
    };
    dispatch(action);
    setResetId(uuid.v4());
    return;
  }

  return React.createElement(
    AppContext.Provider,
    {
      value: {
        skillCount: skillCount,
        dispatch: dispatch,
        addToSkillCount: addToSkillCount,
        selectedSkillCount: state.selectedSkillCount,
        resetId: resetId,
        resetSkills: resetSkills,
      },
    },
    children
  );
}

var defaultTheme = {
  backgroundColor: 'transparent',
  border: '2px solid white',
  borderRadius: '4px',
  primaryFont:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  primaryFontColor: 'white',
  treeBackgroundColor: '#282c34',
  disabledTreeOpacity: 0.8,
  headingFont:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  headingFontColor: 'white',
  headingFontSize: '24px',
  headingHoverColor: '#35373b',
  headingHoverColorTransition: 'background 0.3s ease-out',
  tooltipBackgroundColor: 'white',
  tooltipFontColor: '#16181c',
  tooltipZIndex: 99999,
  nodeBackgroundColor: '#282c34',
  nodeBorderColor: 'white',
  nodeAlternativeFontColor: 'white',
  nodeAltenativeActiveFontColor: 'white',
  nodeOverlayColor: 'white',
  nodeAlternativeActiveBackgroundColor:
    '\n  linear-gradient(\n    to right,\n    #b9e562 0%,\n    #41e2bd 50%,\n    #c284d8 100%\n  )',
  nodeActiveBackgroundColor:
    'linear-gradient(\n      to right,\n      #b9e562 0%,\n      #41e2bd 50%,\n      #c284d8 100%\n    )',
  nodeHoverBorder: '4px solid',
  nodeHoverBorderColor:
    'linear-gradient(\n      to right,\n      #b9e562 0%,\n      #41e2bd 50%,\n      #c284d8 100%\n    )',
  nodeIconWidth: '64px',
  nodeMobileTextNodeHeight: '40px',
  nodeMobileTextNodeWidth: '120px',
  nodeMobileFontSize: '14px',
  nodeDesktopTextNodeHeight: '40px',
  nodeDesktopTextNodeWidth: '144px',
  nodeDesktopFontSize: '16px',
  edgeBorder: '1px solid white',
};

var FilterContext =
  /*#__PURE__*/
  React.createContext({
    filtersMatches: null,
    handleFilter: function handleFilter() {
      return null;
    },
    addToSkillMap: function addToSkillMap() {
      return null;
    },
  });
function FilterProvider(props) {
  var _React$useState = React.useState({}),
    skillMap = _React$useState[0],
    setSkillMap = _React$useState[1];

  var _React$useState2 = React.useState(null),
    filtersMatches = _React$useState2[0],
    setMatches = _React$useState2[1]; // keep the map, also keep track of the sorted keys. (if performance becomes a concern).

  function handleFilter(query) {
    if (query.trim() === '') {
      return setMatches(null);
    }

    var sanitizedQuery = query.toLowerCase();
    var skills = Object.keys(skillMap);
    var filteredSkills = skills.filter(function(key) {
      return key.includes(sanitizedQuery);
    });
    var treeIds = new Set(
      filteredSkills.map(function(skill) {
        return skillMap[skill];
      })
    );
    return setMatches(treeIds);
  }

  function addToSkillMap(skillMap) {
    return setSkillMap(function(prev) {
      return _extends({}, prev, {}, skillMap);
    });
  }

  return React.createElement(
    FilterContext.Provider,
    {
      value: {
        filtersMatches: filtersMatches,
        handleFilter: handleFilter,
        addToSkillMap: addToSkillMap,
      },
    },
    props.children
  );
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose([
    '\n  display: flex;\n  flex-wrap: wrap;\n  font-family: ',
    ';\n  color: ',
    ';\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  justify-content: center;\n  margin: 0 0 48px;\n  min-width: fit-content;\n',
  ]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var defaultProps = {
  theme: defaultTheme,
};

function SkillTreeGroup(_ref) {
  var theme = _ref.theme,
    children = _ref.children;

  var _React$useContext = React.useContext(AppContext),
    skillCount = _React$useContext.skillCount,
    selectedSkillCount = _React$useContext.selectedSkillCount,
    resetSkills = _React$useContext.resetSkills;

  var _React$useContext2 = React.useContext(FilterContext),
    handleFilter = _React$useContext2.handleFilter;

  var skillTreeTheme = React.useMemo(
    function() {
      return _extends({}, defaultTheme, {}, theme);
    },
    [theme]
  );
  var treeData = {
    skillCount: skillCount,
    selectedSkillCount: selectedSkillCount,
    resetSkills: resetSkills,
    handleFilter: handleFilter,
  };
  return React.createElement(
    styled.ThemeProvider,
    {
      theme: skillTreeTheme,
    },
    React.createElement(StyleSkillTreeGroup, null, children(treeData))
  );
}

SkillTreeGroup.defaultProps = defaultProps;
var StyleSkillTreeGroup =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject(),
    function(_ref2) {
      var theme = _ref2.theme;
      return theme.primaryFont;
    },
    function(_ref3) {
      var theme = _ref3.theme;
      return theme.primaryFontColor;
    }
  );

var LOCKED_STATE = 'locked';
var UNLOCKED_STATE = 'unlocked';
var SELECTED_STATE = 'selected';

const img =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' fill='white' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 47.971 47.971' style='enable-background:new 0 0 47.971 47.971%3b' xml:space='preserve'%3e%3cg%3e %3cpath d='M28.228%2c23.986L47.092%2c5.122c1.172-1.171%2c1.172-3.071%2c0-4.242c-1.172-1.172-3.07-1.172-4.242%2c0L23.986%2c19.744L5.121%2c0.88 c-1.172-1.172-3.07-1.172-4.242%2c0c-1.172%2c1.171-1.172%2c3.071%2c0%2c4.242l18.865%2c18.864L0.879%2c42.85c-1.172%2c1.171-1.172%2c3.071%2c0%2c4.242 C1.465%2c47.677%2c2.233%2c47.97%2c3%2c47.97s1.535-0.293%2c2.121-0.879l18.865-18.864L42.85%2c47.091c0.586%2c0.586%2c1.354%2c0.879%2c2.121%2c0.879 s1.535-0.293%2c2.121-0.879c1.172-1.171%2c1.172-3.071%2c0-4.242L28.228%2c23.986z'/%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e";

var useMobile = function useMobile() {
  var _useState = React.useState(Infinity),
    width = _useState[0],
    setWidth = _useState[1];

  React.useEffect(function() {
    function handler() {
      setWidth(window.innerWidth);
    }

    setWidth(window.innerWidth);
    var throttledHandler = lodash.throttle(handler, 500);
    window.addEventListener('resize', throttledHandler);
    return function() {
      window.removeEventListener('resize', throttledHandler);
    };
  }, []);
  return width < 1200;
};

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose([
    '\n  border: 1px solid #fec602;\n  background: transparent;\n  padding: 10px;\n  color: #fec602;\n  transition: 0.2s;\n\n  :hover {\n    background-color: #fec602;\n    color: white;\n  }\n',
  ]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose([
    '\n  display: flex;\n  column-gap: 20px;\n  margin-top: 20px;\n',
  ]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(['\n  margin: 8px 0;\n']);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(['\n  margin: 8px 0;\n']);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var TooltipContent =
  /*#__PURE__*/
  React.memo(function(_ref) {
    var content = _ref.content,
      title = _ref.title,
      currentState = _ref.currentState,
      handleClose = _ref.handleClose,
      handleSelect = _ref.handleSelect,
      handleRemove = _ref.handleRemove;
    var isMobile = useMobile();
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
          },
        },
        React.createElement(Title, null, title),
        React.createElement('img', {
          onClick: handleClose,
          style: {
            width: '16px',
            margin: '21px 4px auto 0',
            cursor: 'pointer',
          },
          src: img,
          alt: 'icon',
        })
      ),
      React.createElement(ContentContainer, null, content),
      isMobile &&
        currentState !== LOCKED_STATE &&
        React.createElement(
          ButtonContainer,
          null,
          React.createElement(
            Button,
            {
              onClick: handleSelect,
            },
            'Learn'
          ),
          React.createElement(
            Button,
            {
              onClick: handleRemove,
            },
            'Unlearn'
          )
        )
    );
  });
var Title =
  /*#__PURE__*/
  styled__default.h1(
    /*#__PURE__*/
    _templateObject$1()
  );
var ContentContainer =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject2()
  );
var ButtonContainer =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject3()
  );
var Button =
  /*#__PURE__*/
  styled__default.button(
    /*#__PURE__*/
    _templateObject4()
  );

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background-color: ',
    ';\n  border: ',
    ';\n  border-image-source: ',
    ';\n  border-image-slice: 1;\n  border-radius: ',
    ';\n  padding: 0 8px;\n  text-align: left;\n  width: 320px;\n\n  .tippy-backdrop {\n    background-color: ',
    ';\n  }\n',
  ]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}

function Tooltip(props) {
  var children = props.children,
    tooltip = props.tooltip,
    title = props.title,
    handleSelect = props.handleSelect,
    handleRemove = props.handleRemove,
    currentState = props.currentState;
  var _tooltip$direction = tooltip.direction,
    direction = _tooltip$direction === void 0 ? 'top' : _tooltip$direction,
    content = tooltip.content;

  var _useContext = React.useContext(styled.ThemeContext),
    tooltipZIndex = _useContext.tooltipZIndex;

  var tooltipRef = React.useRef(null);
  var isMobile = useMobile();
  var placement = React__default.useMemo(
    function() {
      return isMobile ? 'top' : direction;
    },
    [isMobile, direction]
  );

  function hideTooltip() {
    if (!tooltipRef.current) return;
    return tooltipRef.current.hide();
  }

  var memoizedContent = React__default.useMemo(
    function() {
      return React__default.createElement(TooltipContent, {
        handleClose: hideTooltip,
        content: content,
        title: title,
        currentState: currentState,
        handleSelect: handleSelect,
        handleRemove: handleRemove,
      });
    },
    [content, title, currentState, handleSelect, handleRemove]
  ); // const tooltipContent = React.createElement(() => {
  //   return (
  //     <TooltipContent
  //     handleClose={hideTooltip}
  //     content={content}
  //     title={title}
  //     currentState={currentState}
  //     handleSelect={handleSelect}
  //     handleRemove={handleRemove}
  //   />
  //   )
  // })

  return React__default.createElement(
    StyledTippy,
    {
      interactive: true,
      placement: placement,
      onCreate: function onCreate(tooltip) {
        tooltipRef.current = tooltip;
      },
      hideOnClick: false,
      animation: 'shift-away',
      arrow: false,
      appendTo: document.body,
      touch: 'hold',
      zIndex: tooltipZIndex,
      content: memoizedContent,
    },
    children
  );
}
var StyledTippy =
  /*#__PURE__*/
  styled__default(Tippy)(
    /*#__PURE__*/
    _templateObject$2(),
    function(_ref) {
      var theme = _ref.theme;
      return theme.treeBackgroundColor;
    },
    function(_ref2) {
      var theme = _ref2.theme;
      return theme.border;
    },
    function(_ref3) {
      var theme = _ref3.theme;
      return theme.nodeHoverBorderColor;
    },
    function(_ref4) {
      var theme = _ref4.theme;
      return theme.borderRadius;
    },
    function(_ref5) {
      var theme = _ref5.theme;
      return theme.treeBackgroundColor;
    }
  );

function _templateObject2$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n  pointer-events: none;\n  height: 75%;\n  margin: auto;\n  width: 75%;\n',
  ]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$3() {
  var data = _taggedTemplateLiteralLoose(['\n  display: flex;\n']);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var Icon =
  /*#__PURE__*/
  React__default.memo(function(_ref) {
    var src = _ref.src,
      title = _ref.title,
      containerWidth = _ref.containerWidth;
    return React__default.createElement(
      StyledIcon,
      {
        'data-testid': 'icon-container',
        containerWidth: containerWidth,
      },
      React__default.createElement(Image, {
        src: src,
        alt: title,
      })
    );
  });
var StyledIcon =
  /*#__PURE__*/
  styled__default.div.attrs(function(props) {
    return {
      style: {
        height: props.containerWidth + 'px',
        width: props.containerWidth + 'px',
      },
    };
  })(
    /*#__PURE__*/
    _templateObject$3()
  );
var Image =
  /*#__PURE__*/
  styled__default.img(
    /*#__PURE__*/
    _templateObject2$1()
  );

// Since this function reads from the navigator, ensure that all invocation
// take place inside of `useEffect`. This is to ensure that compatibility with gatsby,
// or any application rendered server side, is not broken. This is because globals like
// navigator and window aren't available on the server side, so these functions will need
// to be invoked at runtime.
function isIOSDevice() {
  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) {
        return true;
      }
    }
  }

  return false;
}

function _templateObject13() {
  var data = _taggedTemplateLiteralLoose(['\n      color: ', ';\n    ']);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteralLoose(['\n  color: ', ';\n\n  ', ';\n']);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteralLoose([
    '\n  font-size: ',
    ';\n  text-overflow: ellipsis;\n  margin: 0;\n  overflow: hidden;\n  padding: 0 8px;\n  white-space: nowrap;\n\n  @media (min-width: 900px) {\n    font-size: ',
    ';\n  }\n',
  ]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteralLoose([
    '\n  align-items: center;\n  display: flex;\n  font-weight: 600;\n  justify-content: center;\n  height: ',
    ';\n  width: ',
    ';\n\n  @media (min-width: 900px) {\n    height: ',
    ';\n    width: ',
    ';\n  }\n',
  ]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background-color: black;\n  position: absolute;\n  padding: 5px 10px;\n  border-radius: 4px;\n  font-size: 14px;\n  bottom: -15px;\n  right: -25px;\n  z-index: 99;\n\n  @media (max-width: 900px) {\n    font-size: 12px;\n    bottom: -15px;\n  }\n',
  ]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background-color: black;\n  position: absolute;\n  padding: 5px 10px;\n  border-radius: 4px;\n  font-size: 14px;\n  bottom: -10px;\n  right: -25px;\n  z-index: 99;\n\n  @media (max-width: 900px) {\n    font-size: 12px;\n    bottom: -15px;\n  }\n',
  ]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteralLoose(['\n  width: ', ';\n']);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose([
    '\n        background: ',
    ';\n      ',
  ]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose([
    '\n      animation: ',
    ' 1s infinite alternate;\n      box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.5);\n\n      &:after,\n      &:before {\n        border: 0 solid;\n        border-image-source: ',
    ";\n        border-image-slice: 1;\n        content: ' ';\n        opacity: 0;\n        height: 0;\n        transition: opacity 0.6s, width 0.6s, height 0.6s;\n        position: absolute;\n        width: 0;\n      }\n\n      &:after {\n        border-top: ",
    ';\n        border-left: ',
    ';\n        top: 0;\n        left: 0;\n      }\n\n      &:before {\n        bottom: 0px;\n        right: 0px;\n        border-bottom: ',
    ';\n        border-right: ',
    ';\n      }\n\n      &:hover,\n      &:focus {\n        animation: none;\n        box-shadow: 0 0 12px 0 rgba(255, 255, 255, 1);\n\n        &:after,\n        &:before {\n          opacity: 1;\n          height: 85%;\n          transition: width 0.6s, height 0.6s;\n          width: ',
    ';\n        }\n      }\n    ',
  ]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n      animation: ',
    ' 1s 1;\n      background: ',
    ';\n    ',
  ]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background: ',
    ';\n  border: 2px solid;\n  border-color: ',
    ';\n  box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0);\n  border-radius: ',
    ';\n  cursor: pointer;\n  display: flex;\n  margin: 0 3px;\n  outline: none;\n  position: relative;\n  transition: box-shadow 0.6s, opacity 1s;\n  user-select: none;\n\n  @media (min-width: 410px) {\n    margin: 0 8px;\n  }\n\n  @media (min-width: 900px) {\n    margin: 0 16px;\n    outline: initial;\n    outline-color: white;\n  }\n\n  ',
    '\n\n  ',
    '\n\n    ',
    '\n\n  ',
    '\n',
  ]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$2() {
  var data = _taggedTemplateLiteralLoose([
    '\n  from,\n  20% {\n    box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.5);\n  }\n\n  to {\n    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0.5);\n  }\n',
  ]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$4() {
  var data = _taggedTemplateLiteralLoose([
    '\n  from {\n    box-shadow: 0 0 18px 0 rgba(255, 255, 255, 1);\n  }\n\n  20% {\n    box-shadow: 0 0 24px 0 rgba(255, 255, 255, 1);\n  }\n\n  to {\n    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0);\n  }\n',
  ]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}

var keyframes =
  /*#__PURE__*/
  require('styled-components').keyframes;

var css =
  /*#__PURE__*/
  require('styled-components').css;

var Node =
  /*#__PURE__*/
  React.forwardRef(function Node(props, ref) {
    var handleClick = props.handleClick,
      handleRightClick = props.handleRightClick,
      id = props.id,
      currentState = props.currentState,
      skill = props.skill,
      learned = props.learned; // console.log('Skill', skill);

    var _skill$color = skill.color,
      color = _skill$color === void 0 ? 'default' : _skill$color;

    var _React$useState = React.useState(false),
      isIOS = _React$useState[0],
      setIsIOS = _React$useState[1];

    var isMobile = useMobile();
    var memoizedHandleKeyDown = React.useCallback(
      function handleKeyDown(e) {
        if (e.keyCode === 13) {
          handleClick();
        }
      },
      [handleClick]
    );
    React.useEffect(function() {
      setIsIOS(isIOSDevice());
    }, []);

    var checkForClickType = function checkForClickType(e) {
      e.preventDefault();
      if (isMobile) return;

      if (e.button === 0) {
        handleClick();
      } else if (e.button === 2) {
        handleRightClick();
      }
    };

    return React.createElement(
      StyledNode,
      {
        onClick: checkForClickType,
        onContextMenu: checkForClickType,
        onKeyDown: memoizedHandleKeyDown,
        ref: ref,
        tabIndex: 0,
        'data-testid': id,
        optional: skill.optional || false,
        isIOS: isIOS,
        selected: currentState === SELECTED_STATE,
        unlocked: currentState === UNLOCKED_STATE,
        locked: currentState === LOCKED_STATE,
        color: color,
      },
      'icon' in skill
        ? React.createElement(
            IconNode,
            null,
            React.createElement(Icon, {
              title: 'node-icon',
              src: skill.icon,
              containerWidth: 64,
            }),
            React.createElement(
              LevelNode,
              null,
              learned,
              '/',
              skill.levels.length
            )
          )
        : React.createElement(
            TextNode,
            null,
            color === 'default'
              ? React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(Text, null, skill.title),
                  React.createElement(
                    TextLevelNode,
                    null,
                    learned,
                    '/',
                    skill.levels.length
                  )
                )
              : React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(
                    AlternativeText,
                    {
                      selected: currentState === SELECTED_STATE,
                    },
                    skill.title
                  ),
                  React.createElement(
                    TextLevelNode,
                    null,
                    learned,
                    '/',
                    skill.levels.length
                  )
                )
          )
    );
  });
var shadowburst =
  /*#__PURE__*/
  keyframes(
    /*#__PURE__*/
    _templateObject$4()
  );
var shadowpulse =
  /*#__PURE__*/
  keyframes(
    /*#__PURE__*/
    _templateObject2$2()
  );
var StyledNode =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject3$1(),
    function(_ref) {
      var theme = _ref.theme;
      return theme.nodeBackgroundColor;
    },
    function(_ref2) {
      var theme = _ref2.theme;
      return theme.nodeBorderColor;
    },
    function(_ref3) {
      var theme = _ref3.theme;
      return theme.borderRadius;
    },
    function(props) {
      return (
        props.selected &&
        css(_templateObject4$1(), shadowburst, function(_ref4) {
          var theme = _ref4.theme;
          return props.color === 'default'
            ? theme.nodeActiveBackgroundColor
            : theme.nodeAlternativeActiveBackgroundColor;
        })
      );
    },
    function(props) {
      return (
        props.unlocked &&
        css(
          _templateObject5(),
          shadowpulse,
          function(_ref5) {
            var theme = _ref5.theme;
            return theme.nodeHoverBorderColor;
          },
          function(_ref6) {
            var theme = _ref6.theme;
            return theme.nodeHoverBorder;
          },
          function(_ref7) {
            var theme = _ref7.theme;
            return theme.nodeHoverBorder;
          },
          function(_ref8) {
            var theme = _ref8.theme;
            return theme.nodeHoverBorder;
          },
          function(_ref9) {
            var theme = _ref9.theme;
            return theme.nodeHoverBorder;
          },
          function(props) {
            return props.isIOS ? 0 : '95%';
          }
        )
      );
    },
    function(props) {
      return (
        props.unlocked &&
        props.optional &&
        css(_templateObject6(), function(_ref10) {
          var theme = _ref10.theme;
          return theme.nodeBackgroundColor;
        })
      );
    },
    function(props) {
      return (
        props.locked &&
        '\n        cursor: initial;\n        opacity: 0.65;\n    '
      );
    }
  );
var IconNode =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject7(),
    function(_ref11) {
      var theme = _ref11.theme;
      return theme.nodeIconNodeWidth;
    }
  );
var LevelNode =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject8()
  );
var TextLevelNode =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject9()
  );
var TextNode =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject10(),
    function(_ref12) {
      var theme = _ref12.theme;
      return theme.nodeMobileTextNodeHeight;
    },
    function(_ref13) {
      var theme = _ref13.theme;
      return theme.nodeMobileTextNodeWidth;
    },
    function(_ref14) {
      var theme = _ref14.theme;
      return theme.nodeDesktopTextNodeHeight;
    },
    function(_ref15) {
      var theme = _ref15.theme;
      return theme.nodeDesktopTextNodeWidth;
    }
  );
var Text =
  /*#__PURE__*/
  styled__default.p(
    /*#__PURE__*/
    _templateObject11(),
    function(_ref16) {
      var theme = _ref16.theme;
      return theme.nodeMobileFontSize;
    },
    function(_ref17) {
      var theme = _ref17.theme;
      return theme.nodeDesktopFontSize;
    }
  );
var AlternativeText =
  /*#__PURE__*/
  styled__default(Text)(
    /*#__PURE__*/
    _templateObject12(),
    function(_ref18) {
      var theme = _ref18.theme;
      return theme.nodeAlternativeFontColor;
    },
    function(props) {
      return (
        props.selected &&
        css(_templateObject13(), function(_ref19) {
          var theme = _ref19.theme;
          return theme.nodeAltenativeActiveFontColor;
        })
      );
    }
  );

function _templateObject2$3() {
  var data = _taggedTemplateLiteralLoose([
    '\n  display: flex;\n  justify-content: center;\n  position: relative;\n',
  ]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$5() {
  var data = _taggedTemplateLiteralLoose([
    '\n  margin: 0 auto;\n  position: relative;\n  width: fit-content;\n',
  ]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}

function SkillNode(_ref) {
  var skill = _ref.skill,
    nodeState = _ref.nodeState,
    currentLevel = _ref.currentLevel,
    learned = _ref.learned,
    skillPoint = _ref.skillPoint,
    childrenLearnedState = _ref.childrenLearnedState,
    handleLearnedChange = _ref.handleLearnedChange,
    incSkillCount = _ref.incSkillCount,
    updateSkillState = _ref.updateSkillState,
    _ref$handleNodeSelect = _ref.handleNodeSelect,
    handleNodeSelect =
      _ref$handleNodeSelect === void 0
        ? function() {
            return null;
          }
        : _ref$handleNodeSelect,
    _ref$handleNodeRemove = _ref.handleNodeRemove,
    handleNodeRemove =
      _ref$handleNodeRemove === void 0
        ? function() {
            return null;
          }
        : _ref$handleNodeRemove;
  var children = skill.children,
    title = skill.title,
    tooltip = skill.tooltip,
    id = skill.id,
    optional = skill.optional;

  var _React$useState = React__default.useState(0),
    parentPosition = _React$useState[0],
    setParentPosition = _React$useState[1];

  var skillNodeRef = React__default.useRef(null);
  var childWidth = React__default.useRef(0);

  function calculatePosition() {
    var _skillNodeRef$current = skillNodeRef.current.getBoundingClientRect(),
      left = _skillNodeRef$current.left,
      right = _skillNodeRef$current.right;

    var scrollX = window.scrollX;
    setParentPosition((right - left) / 2 + left + scrollX);
  }

  function calculateOverlayWidth() {
    childWidth.current = skillNodeRef.current.clientWidth;
  }

  function handleResize() {
    calculatePosition();
    calculateOverlayWidth();
  }

  function handleClick() {
    if (nodeState === LOCKED_STATE) {
      return null;
    }

    if (skillPoint === 0) {
      return;
    }

    if (nodeState === UNLOCKED_STATE) {
      if (learned < skill.levels.length) {
        handleLearnedChange(learned + 1);

        if (learned < skill.levels.length - 1) {
          handleNodeSelect(id, UNLOCKED_STATE, skill, learned + 1);
          return updateSkillState(id, UNLOCKED_STATE, learned + 1, optional);
        }

        return;
      }
    }

    return;
  }

  function handleRightClick() {
    if (nodeState === LOCKED_STATE) {
      handleLearnedChange(0);
      return null;
    }

    if (learned === skill.actualLearned) {
      return;
    }

    if (nodeState === UNLOCKED_STATE) {
      if (learned > 0) {
        handleLearnedChange(learned - 1);

        if (learned === 0) {
          handleNodeRemove(id, LOCKED_STATE, skill, learned - 1);
          return updateSkillState(id, LOCKED_STATE, learned - 1, optional);
        }

        handleNodeRemove(id, UNLOCKED_STATE, skill, learned - 1);
        return updateSkillState(id, UNLOCKED_STATE, learned - 1, optional);
      }
    }

    if (nodeState === SELECTED_STATE) {
      if (
        childrenLearnedState &&
        childrenLearnedState.filter(function(child) {
          return child.learned > 0;
        }).length > 0
      ) {
        return;
      }

      handleLearnedChange(learned - 1);
      handleNodeRemove(id, UNLOCKED_STATE, skill, learned - 1);
      return updateSkillState(id, UNLOCKED_STATE, learned - 1, optional);
    }

    return;
  }

  React__default.useEffect(function() {
    var throttledHandleResize = lodash.throttle(handleResize, 200);
    calculatePosition();
    calculateOverlayWidth();
    window.addEventListener('resize', throttledHandleResize);
    return function cleanup() {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, []);
  React__default.useEffect(
    function() {
      if (learned === skill.levels.length) {
        incSkillCount(optional);
        handleNodeSelect(id, SELECTED_STATE, skill, learned);
        return updateSkillState(id, SELECTED_STATE, learned, optional);
      }
    },
    [learned]
  );
  var hasMultipleChildren = children.length > 1;
  return React__default.createElement(
    React__default.Fragment,
    null,
    React__default.createElement(
      StyledSkillNode,
      null,
      React__default.createElement(
        Tooltip,
        {
          title: title,
          tooltip: tooltip,
          handleSelect: handleClick,
          handleRemove: handleRightClick,
          currentState: nodeState,
        },
        React__default.createElement(Node, {
          handleClick: handleClick,
          handleRightClick: handleRightClick,
          id: id,
          currentState: nodeState,
          learned: learned,
          skill: skill,
          ref: skillNodeRef,
        })
      )
    ),
    children.length > 0 &&
      React__default.createElement(
        SkillTreeSegmentWrapper,
        null,
        children.map(function(child) {
          return React__default.createElement(SkillTreeSegment, {
            key: child.id,
            hasParent: true,
            currentLevel: currentLevel,
            parentPosition: parentPosition,
            parentHasMultipleChildren: hasMultipleChildren,
            shouldBeUnlocked:
              nodeState === SELECTED_STATE &&
              currentLevel >= child.requiredLevel,
            skill: child,
            skillPoint: skillPoint,
          });
        })
      )
  );
}

var SkillNode$1 /*#__PURE__*/ = React__default.memo(SkillNode);
var StyledSkillNode =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject$5()
  );
var SkillTreeSegmentWrapper =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject2$3()
  );

function _templateObject4$2() {
  var data = _taggedTemplateLiteralLoose([
    '\n      animation: ',
    ' 1.2s 1 ease-out;\n      background-position: left bottom;\n    ',
  ]);

  _templateObject4$2 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$2() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background: linear-gradient(\n    to right,\n    rgba(255, 255, 255, 1) 0%,\n    rgba(255, 255, 255, 1) 50%,\n    rgba(255, 255, 255, 0) 51%,\n    rgba(255, 255, 255, 0) 100%\n  );\n  background-size: 210% 100%;\n  background-position: right top;\n  border: ',
    ';\n  height: 4px;\n  opacity: 0.5;\n  transform: rotate(90deg);\n  transform-origin: 0 0;\n  transition: opacity 0.6s;\n  width: 56px;\n\n  ',
    '\n\n  ',
    '\n',
  ]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = _taggedTemplateLiteralLoose([
    '\n  from,\n  50% {\n    background-position: right top;\n  }\n\n  to {\n    background-position: left bottom;\n  }\n',
  ]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = _taggedTemplateLiteralLoose([
    '\n  height: 56px;\n  left: 4px;\n  margin: 0 auto;\n  position: relative;\n  width: 4px;\n',
  ]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}

var keyframes$1 =
  /*#__PURE__*/
  require('styled-components').keyframes;

var css$1 =
  /*#__PURE__*/
  require('styled-components').css;

function Line(_ref) {
  var state = _ref.state;
  return React__default.createElement(
    LineContainer,
    null,
    React__default.createElement(StyledLine, {
      'data-testid': 'straight-line',
      selected: state === SELECTED_STATE,
      unlocked: state !== LOCKED_STATE,
    })
  );
}
var LineContainer =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject$6()
  );
var slidedown =
  /*#__PURE__*/
  keyframes$1(
    /*#__PURE__*/
    _templateObject2$4()
  );
var StyledLine =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject3$2(),
    function(_ref2) {
      var theme = _ref2.theme;
      return theme.edgeBorder;
    },
    function(props) {
      return props.selected && css$1(_templateObject4$2(), slidedown);
    },
    function(props) {
      return props.unlocked && '\n      opacity: 1;\n    ';
    }
  );

function _templateObject$7() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background: linear-gradient(\n    to right,\n    rgba(255, 255, 255, 1) 0%,\n    rgba(255, 255, 255, 1) 50%,\n    rgba(255, 255, 255, 0) 51%,\n    rgba(255, 255, 255, 0) 100%\n  );\n  background-size: 210% 100%;\n  background-position: right top;\n  border: ',
    ';\n  height: 4px;\n  position: absolute;\n  opacity: 0.5;\n  transition: opacity 0.6s;\n\n  ',
    '\n',
  ]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var StyledAngledLine =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject$7(),
    function(_ref) {
      var theme = _ref.theme;
      return theme.edgeBorder;
    },
    function(props) {
      return props.unlocked && '\n      opacity: 1;\n  ';
    }
  );

function _templateObject3$3() {
  var data = _taggedTemplateLiteralLoose([
    '\n  from,\n  33% {\n    background-position: right top;\n  }\n\n  to {\n    background-position: left bottom;\n  }\n',
  ]);

  _templateObject3$3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$5() {
  var data = _taggedTemplateLiteralLoose([
    '\n      animation: ',
    ' 0.3s 1 ease-in;\n      background-position: left bottom;\n    ',
  ]);

  _templateObject2$5 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$8() {
  var data = _taggedTemplateLiteralLoose([
    '\n  transform: rotate(90deg) translateY(-50%);\n  transform-origin: 0 0;\n  left: 50%;\n  top: -1px;\n  width: 29px;\n\n  ',
    '\n\n  ',
    '\n\n  ',
    '\n',
  ]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}

var keyframes$2 =
  /*#__PURE__*/
  require('styled-components').keyframes;

var css$2 =
  /*#__PURE__*/
  require('styled-components').css;

function UpperAngledLine(props) {
  var direction = props.direction,
    state = props.state;
  return React__default.createElement(AngledLineVerticalTop, {
    'data-testid': 'upper-angled-line',
    direction: direction,
    selected: state === SELECTED_STATE,
    unlocked: state !== LOCKED_STATE,
  });
}
var AngledLineVerticalTop =
  /*#__PURE__*/
  styled__default(StyledAngledLine)(
    /*#__PURE__*/
    _templateObject$8(),
    function(props) {
      return (
        props.direction === 'right' &&
        '\n      border-bottom-right-radius: 8px;\n    '
      );
    },
    function(props) {
      return (
        props.direction === 'left' &&
        '\n      border-top-right-radius: 8px;\n    '
      );
    },
    function(props) {
      return (
        props.selected && css$2(_templateObject2$5(), slideDownAngledLineTop)
      );
    }
  );
var slideDownAngledLineTop =
  /*#__PURE__*/
  keyframes$2(
    /*#__PURE__*/
    _templateObject3$3()
  );

function _templateObject3$4() {
  var data = _taggedTemplateLiteralLoose([
    '\n  from,\n  30% {\n    background-position: right top;\n  }\n\n  to {\n    background-position: left bottom;\n  }\n',
  ]);

  _templateObject3$4 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$6() {
  var data = _taggedTemplateLiteralLoose([
    '\n      animation: ',
    ' 1s 1;\n      background-position: left bottom;\n    ',
  ]);

  _templateObject2$6 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$9() {
  var data = _taggedTemplateLiteralLoose([
    '\n  border-left: none;\n  border-right: none;\n  top: 24px;\n  left: 50%;\n  width: ',
    'px;\n  transform: translateX(3px) scale(-1);\n\n  ',
    '\n\n  ',
    '\n',
  ]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}

var keyframes$3 =
  /*#__PURE__*/
  require('styled-components').keyframes;

var css$3 =
  /*#__PURE__*/
  require('styled-components').css;

function MiddleAngledLine(props) {
  var direction = props.direction,
    parentPosition = props.parentPosition,
    childPosition = props.childPosition,
    state = props.state;
  var width =
    direction === 'left'
      ? parentPosition - childPosition - 6
      : childPosition - parentPosition - 6;
  return React__default.createElement(AngledLineHoriztonal, {
    'data-testid': 'middle-angled-line',
    direction: direction,
    unlocked: state !== LOCKED_STATE,
    selected: state === SELECTED_STATE,
    width: width,
  });
}
var AngledLineHoriztonal =
  /*#__PURE__*/
  styled__default(StyledAngledLine)(
    /*#__PURE__*/
    _templateObject$9(),
    function(props) {
      return props.width;
    },
    function(props) {
      return (
        props.direction === 'right' &&
        '\n      transform: translateX(-3px) scale(-1);\n      transform-origin: 0;\n  '
      );
    },
    function(props) {
      return (
        props.selected && css$3(_templateObject2$6(), slideDownAngledLineMiddle)
      );
    }
  );
var slideDownAngledLineMiddle =
  /*#__PURE__*/
  keyframes$3(
    /*#__PURE__*/
    _templateObject3$4()
  );

function _templateObject3$5() {
  var data = _taggedTemplateLiteralLoose([
    '\n  from,\n  70% {\n    background-position: right top;\n  }\n\n  to {\n    background-position: left bottom;\n  }\n',
  ]);

  _templateObject3$5 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$7() {
  var data = _taggedTemplateLiteralLoose([
    '\n        animation: ',
    ' 1.2s 1 ease-out;\n        background-position: left bottom;\n      ',
  ]);

  _templateObject2$7 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$a() {
  var data = _taggedTemplateLiteralLoose([
    '\n  transform: rotate(90deg) translateY(-50%);\n  transform-origin: 0 0;\n  left: 50%;\n  top: 24px;\n  width: 31px;\n\n  ',
    '\n\n  ',
    '\n\n    ',
    '\n',
  ]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}

var keyframes$4 =
  /*#__PURE__*/
  require('styled-components').keyframes;

var css$4 =
  /*#__PURE__*/
  require('styled-components').css;

function LowerAngledLine(props) {
  var state = props.state,
    direction = props.direction;
  return React__default.createElement(AngledLineVerticalBottom, {
    unlocked: state !== LOCKED_STATE,
    direction: direction,
    'data-testid': 'lower-angled-line',
    selected: state === SELECTED_STATE,
  });
}
var AngledLineVerticalBottom =
  /*#__PURE__*/
  styled__default(StyledAngledLine)(
    /*#__PURE__*/
    _templateObject$a(),
    function(props) {
      return (
        props.direction === 'right' &&
        '\n        border-top-left-radius: 8px;\n      '
      );
    },
    function(props) {
      return (
        props.direction === 'left' &&
        '\n      border-bottom-left-radius: 8px;\n    '
      );
    },
    function(props) {
      return (
        props.selected && css$4(_templateObject2$7(), slideDownAngledLineBottom)
      );
    }
  );
var slideDownAngledLineBottom =
  /*#__PURE__*/
  keyframes$4(
    /*#__PURE__*/
    _templateObject3$5()
  );

function SkillEdge(props) {
  var parentHasMultipleChildren = props.parentHasMultipleChildren,
    state = props.state,
    childNodeRef = props.childNodeRef,
    parentPosition = props.parentPosition;
  if (!parentHasMultipleChildren)
    return React__default.createElement(Line, {
      state: state,
    });

  var _useState = React.useState(0),
    childPosition = _useState[0],
    setChildPosition = _useState[1];

  var direction = parentPosition < childPosition ? 'right' : 'left';

  function calculatePosition() {
    var _childNodeRef$current = childNodeRef.current.getBoundingClientRect(),
      left = _childNodeRef$current.left,
      width = _childNodeRef$current.width;

    var scrollX = window.scrollX;
    setChildPosition(left + width / 2 + scrollX);
  }

  React.useEffect(function() {
    var throttledHandleResize = lodash.throttle(calculatePosition, 200);
    window.addEventListener('resize', throttledHandleResize);
    calculatePosition();
    return function cleanup() {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, []);
  return React__default.createElement(
    'div',
    {
      style: {
        height: '56px',
      },
    },
    React__default.createElement(UpperAngledLine, {
      state: state,
      direction: direction,
    }),
    React__default.createElement(
      'div',
      {
        style: {
          position: 'relative',
        },
      },
      React__default.createElement(MiddleAngledLine, {
        parentPosition: parentPosition,
        childPosition: childPosition,
        state: state,
        direction: direction,
      }),
      React__default.createElement(LowerAngledLine, {
        direction: direction,
        state: state,
      })
    )
  );
}

var SkillContext =
  /*#__PURE__*/
  React.createContext({
    mounting: true,
    skills: {},
    skillCount: 0,
    selectedCount: 0,
    updateSkillState: function updateSkillState() {
      return undefined;
    },
    setSkillCount: function setSkillCount() {
      return undefined;
    },
    handleNodeSelect: function handleNodeSelect() {
      return undefined;
    },
    handleNodeRemove: function handleNodeRemove() {
      return undefined;
    },
    incrementSelectedCount: function incrementSelectedCount() {
      return undefined;
    },
    decrementSelectedCount: function decrementSelectedCount() {
      return undefined;
    },
  });
var SkillTreeProvider =
  /*#__PURE__*/
  (function(_React$Component) {
    _inheritsLoose(SkillTreeProvider, _React$Component);

    function SkillTreeProvider(props, context) {
      var _this;

      _this = _React$Component.call(this, props, context) || this;
      _this.storage = null;

      _this.getTreeSkills = function() {
        if (_this.props.savedData) {
          return _this.props.savedData;
        }

        var treeId = _this.props.treeId;

        var storedItems = _this.storage.getItem('skills-' + treeId);

        if (storedItems === 'undefined' || storedItems === null) {
          return {};
        }

        return JSON.parse(storedItems);
      };

      _this.incrementSelectedCount = function(optional) {
        if (optional === void 0) {
          optional = false;
        }

        var action = {
          type: optional ? 'SELECT_OPTIONAL_SKILL' : 'SELECT_REQUIRED_SKILL',
        };

        _this.setState(function(prevState) {
          var selectedCount = prevState.selectedCount;
          return {
            selectedCount: selectedCount + 1,
          };
        });

        _this.context.dispatch(action);
      };

      _this.decrementSelectedCount = function(optional) {
        if (optional === void 0) {
          optional = false;
        }

        var action = {
          type: optional
            ? 'DESELECT_OPTIONAL_SKILL'
            : 'DESELECT_REQUIRED_SKILL',
        };

        _this.setState(function(prevState) {
          var selectedCount = prevState.selectedCount;
          return {
            selectedCount: selectedCount - 1,
          };
        });

        _this.context.dispatch(action);
      };

      _this.resetSkills = function() {
        return _this.setState(function(prevState) {
          var skills = prevState.skills;
          var resettedSkills = lodash.mapValues(skills, function(skill) {
            return {
              optional: skill.optional,
              nodeState: LOCKED_STATE,
              learned: skill.learned,
            };
          });
          return {
            skills: resettedSkills,
            resetId: _this.context.resetId,
          };
        });
      };

      _this.setSkillCount = function(skillCount) {
        return _this.setState({
          skillCount: skillCount,
        });
      };

      _this.handleNodeSelect = function(key, state, skill, learned) {
        return _this.props.sendNodeSelectDataToClient({
          key: key,
          state: state,
          skill: skill,
          learned: learned,
        });
      };

      _this.handleNodeRemove = function(key, state, skill, learned) {
        return _this.props.sendNodeRemoveDataToClient({
          key: key,
          state: state,
          skill: skill,
          learned: learned,
        });
      };

      _this.updateSkillState = function(
        key,
        updatedState,
        updatedLearnedState,
        optional
      ) {
        if (optional === void 0) {
          optional = false;
        }

        var _this$props = _this.props,
          handleSave = _this$props.handleSave,
          treeId = _this$props.treeId;
        return _this.setState(function(prevState) {
          var _extends2;

          var updatedSkills = _extends(
            {},
            prevState.skills,
            ((_extends2 = {}),
            (_extends2[key] = {
              id: key,
              optional: optional,
              nodeState: updatedState,
              learned: updatedLearnedState,
            }),
            _extends2)
          );

          handleSave(_this.storage, treeId, updatedSkills);
          return {
            skills: updatedSkills,
          };
        });
      };

      _this.state = {
        skills: {},
        skillCount: 0,
        selectedCount: 0,
        resetId: context.resetId,
        mounting: true,
      };
      return _this;
    }

    var _proto = SkillTreeProvider.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var storage = this.props.storage;
      var context = this.context;

      if (storage) {
        this.storage = storage;
      } else {
        this.storage = localStorage;
      }

      var treeSkills = this.getTreeSkills();
      var selectedCount = 0;
      Object.keys(treeSkills).map(function(key) {
        if (treeSkills[key].nodeState === SELECTED_STATE) {
          selectedCount++;
          var action = {
            type: treeSkills[key].optional
              ? 'SELECT_OPTIONAL_SKILL'
              : 'SELECT_REQUIRED_SKILL',
          };
          context.dispatch(action);
        }
      });
      this.setState({
        skills: treeSkills,
        selectedCount: selectedCount,
        mounting: false,
      });
      return null;
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      if (this.context.resetId !== this.state.resetId) {
        this.resetSkills();
      }
    };

    _proto.render = function render() {
      return React.createElement(
        SkillContext.Provider,
        {
          value: {
            mounting: this.state.mounting,
            skills: this.state.skills,
            skillCount: this.state.skillCount,
            selectedCount: this.state.selectedCount,
            updateSkillState: this.updateSkillState,
            setSkillCount: this.setSkillCount,
            handleNodeSelect: this.handleNodeSelect,
            handleNodeRemove: this.handleNodeRemove,
            incrementSelectedCount: this.incrementSelectedCount,
            decrementSelectedCount: this.decrementSelectedCount,
          },
        },
        this.props.children
      );
    };

    return SkillTreeProvider;
  })(React.Component);
SkillTreeProvider.contextType = AppContext;
SkillTreeProvider.defaultProps = {
  handleSave: function handleSave(storage, treeId, skills) {
    return storage.setItem('skills-' + treeId, JSON.stringify(skills));
  },
  sendNodeSelectDataToClient: function sendNodeSelectDataToClient() {
    return null;
  },
  sendNodeRemoveDataToClient: function sendNodeRemoveDataToClient() {
    return null;
  },
};

function SkillTreeSegment(_ref) {
  var skill = _ref.skill,
    hasParent = _ref.hasParent,
    parentHasMultipleChildren = _ref.parentHasMultipleChildren,
    parentPosition = _ref.parentPosition,
    shouldBeUnlocked = _ref.shouldBeUnlocked,
    currentLevel = _ref.currentLevel,
    skillPoint = _ref.skillPoint;

  var _useContext = React.useContext(SkillContext),
    mounting = _useContext.mounting,
    skills = _useContext.skills,
    updateSkillState = _useContext.updateSkillState,
    decrementSelectedCount = _useContext.decrementSelectedCount,
    incrementSelectedCount = _useContext.incrementSelectedCount,
    handleNodeSelect = _useContext.handleNodeSelect,
    handleNodeRemove = _useContext.handleNodeRemove;

  var skillNodeRef = React.useRef(null);

  var _React$useState = React__default.useState(skill.actualLearned),
    learned = _React$useState[0],
    setLearned = _React$useState[1];

  var nodeState = skills[skill.id] ? skills[skill.id].nodeState : 'locked';
  var childrenLearnedState = skill.children.map(function(child) {
    return skills[child.id];
  });
  React.useEffect(
    function() {
      setLearned(skill.actualLearned);
    },
    [skill.actualLearned]
  );
  React.useEffect(
    function() {
      if (mounting) return;

      if (nodeState === SELECTED_STATE && !shouldBeUnlocked) {
        return updateSkillState(
          skill.id,
          LOCKED_STATE,
          skill.actualLearned,
          skill.optional
        );
      }

      if (nodeState === UNLOCKED_STATE && !shouldBeUnlocked) {
        setLearned(skill.actualLearned);
        return updateSkillState(
          skill.id,
          LOCKED_STATE,
          skill.actualLearned,
          skill.optional
        );
      }

      if (!shouldBeUnlocked) {
        return;
      }

      if (nodeState === LOCKED_STATE && shouldBeUnlocked) {
        return updateSkillState(
          skill.id,
          UNLOCKED_STATE,
          skill.actualLearned,
          skill.optional
        );
      }

      if (nodeState === SELECTED_STATE && shouldBeUnlocked && learned === 0) {
        return updateSkillState(skill.id, UNLOCKED_STATE, 0, skill.optional);
      }
    },
    [nodeState, shouldBeUnlocked, mounting, learned, childrenLearnedState]
  );
  React.useEffect(
    function() {
      if (mounting) return;

      if (lodash.isEmpty(skills)) {
        return updateSkillState(skill.id, UNLOCKED_STATE, skill.actualLearned);
      }

      return;
    },
    [mounting]
  );

  var handleLearnedChange = function handleLearnedChange(newValue) {
    setLearned(newValue);
  };

  return React__default.createElement(
    'div',
    {
      style: {
        margin: !hasParent ? '16px 0' : '',
      },
    },
    hasParent &&
      React__default.createElement(SkillEdge, {
        parentHasMultipleChildren: parentHasMultipleChildren,
        state: nodeState,
        childNodeRef: skillNodeRef,
        parentPosition: parentPosition,
      }),
    React__default.createElement(
      'div',
      {
        ref: skillNodeRef,
      },
      React__default.createElement(SkillNode$1, {
        incSkillCount: React.useCallback(incrementSelectedCount, []),
        decSkillCount: React.useCallback(decrementSelectedCount, []),
        updateSkillState: updateSkillState,
        currentLevel: currentLevel,
        skill: skill,
        learned: learned,
        skillPoint: skillPoint,
        handleLearnedChange: handleLearnedChange,
        nodeState: nodeState,
        childrenLearnedState: childrenLearnedState,
        handleNodeSelect: handleNodeSelect,
        handleNodeRemove: handleNodeRemove,
      })
    )
  );
}

SkillTreeSegment.defaultProps = {
  hasParent: true,
};

function HSeparator(_ref) {
  var display = _ref.display;
  return React.createElement(
    'div',
    {
      style: {
        height: '2px',
      },
    },
    display &&
      React.createElement('hr', {
        style: {
          margin: 0,
        },
        'data-testid': 'h-separator',
      })
  );
}

function _templateObject2$8() {
  var data = _taggedTemplateLiteralLoose([
    '\n      transition: transform 0.15s ease-out, opacity 0.15s ease-out,\n        max-height 0.15s ease-out, visibility 0.15s 0.15s ease-out;\n      transform: scaleY(0);\n      visibility: hidden;\n      max-height: 0;\n      width: 304px;\n      opacity: 0;\n    ',
  ]);

  _templateObject2$8 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$b() {
  var data = _taggedTemplateLiteralLoose([
    '\n  transition: transform 0.15s ease-out, opacity 0.15s ease-out,\n    max-height 0.15s ease-out, visibility 0.15s ease-out;\n  height: auto;\n  max-height: 10000px;\n  min-width: 304px;\n  opacity: 1;\n  overflow: hidden;\n  visibility: visible;\n  transform: scaleY(1);\n  transform-origin: top;\n\n  ',
    '\n',
  ]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}

var css$5 =
  /*#__PURE__*/
  require('styled-components').css;

function VisibilityContainer(props) {
  var isVisible = props.isVisible,
    children = props.children;

  var _useState = React.useState(isVisible),
    hasBeenVisible = _useState[0],
    setHasBeenVisibleState = _useState[1];

  React.useEffect(
    function() {
      if (isVisible) {
        setHasBeenVisibleState(true);
      }
    },
    [isVisible, setHasBeenVisibleState]
  );
  if (!hasBeenVisible) return null;
  return React__default.createElement(
    StyledVisibilityContainer,
    {
      'data-testid': 'visibility-container',
      isVisible: isVisible,
    },
    children
  );
}
var StyledVisibilityContainer =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject$b(),
    function(_ref) {
      var isVisible = _ref.isVisible;
      return !isVisible && css$5(_templateObject2$8());
    }
  );

function calculateNodeCount(data) {
  return data.reduce(
    function(prev, curr) {
      var _extends2;

      var nodeType = curr.optional ? 'optional' : 'required';

      if (curr.children.length > 0) {
        var incOptional = nodeType === 'optional' ? 1 : 0;
        var incRequired = nodeType === 'required' ? 1 : 0;
        var childNodeCount = calculateNodeCount(curr.children);
        return {
          optional: prev.optional + childNodeCount.optional + incOptional,
          required: prev.required + childNodeCount.required + incRequired,
        };
      }

      return _extends(
        {},
        prev,
        ((_extends2 = {}),
        (_extends2[nodeType] = prev[nodeType] + 1),
        _extends2)
      );
    },
    {
      required: 0,
      optional: 0,
    }
  );
}

function CalculateNodeCount(_ref) {
  var data = _ref.data;

  var _useContext = React.useContext(AppContext),
    addToSkillCount = _useContext.addToSkillCount;

  var _useContext2 = React.useContext(SkillContext),
    setSkillCount = _useContext2.setSkillCount;

  React.useEffect(function() {
    var count = calculateNodeCount(data);
    var required = count.required,
      optional = count.optional;
    setSkillCount(required + optional);
    addToSkillCount(count);
  }, []);
  return null;
}

function _templateObject7$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n  font-family: ',
    ';\n  margin-bottom: 0;\n  min-width: 152px;\n  text-align: center;\n',
  ]);

  _templateObject7$1 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background: ',
    ';\n  color: ',
    ";\n\n  &[data-placement^='top'] {\n    .tippy-arrow {\n      border-top-color: ",
    ';\n    }\n  }\n',
  ]);

  _templateObject6$1 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n      transform: rotate(180deg);\n    ',
  ]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$3() {
  var data = _taggedTemplateLiteralLoose([
    '\n  color: ',
    ';\n  display: ',
    ';\n  font-family: ',
    ';\n  font-size: ',
    ';\n  left: 8px;\n  position: absolute;\n  transform: rotate(90deg);\n  transition: 0.15s transform ease-out;\n\n  ',
    '\n',
  ]);

  _templateObject4$3 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$6() {
  var data = _taggedTemplateLiteralLoose([
    '\n      background: ',
    ';\n      border: ',
    ';\n      border-radius: ',
    ';\n      cursor: pointer;\n      min-width: 300px;\n      transition: ',
    ';\n      user-select: none;\n\n      &:hover {\n        background: ',
    ';\n      }\n    ',
  ]);

  _templateObject3$6 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$9() {
  var data = _taggedTemplateLiteralLoose(['\n      opacity: ', ';\n    ']);

  _templateObject2$9 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$c() {
  var data = _taggedTemplateLiteralLoose(['\n  ', '\n  ', '\n']);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}

var css$6 =
  /*#__PURE__*/
  require('styled-components').css;

function SkillTreeHeader(props) {
  var handleClick = props.handleClick,
    collapsible = props.collapsible,
    isVisible = props.isVisible,
    id = props.id,
    title = props.title,
    description = props.description,
    disabled = props.disabled;

  var _useContext = React.useContext(styled.ThemeContext),
    tooltipZIndex = _useContext.tooltipZIndex;

  var memoizedHandleKeyDown = React.useCallback(
    function handleKeyDown(e) {
      if (e.keyCode === 13) {
        handleClick();
      }
    },
    [handleClick]
  );
  return React__default.createElement(
    StyledTippy$1,
    {
      zIndex: tooltipZIndex,
      enabled: Boolean(description),
      content: description || '',
    },
    React__default.createElement(
      StyledSkillTreeHeader,
      {
        tabIndex: 0,
        onKeyDown: memoizedHandleKeyDown,
        onPointerDown: handleClick,
        isCollapsible: collapsible,
        isDisabled: disabled,
      },
      React__default.createElement(
        'div',
        {
          style: {
            position: 'relative',
          },
        },
        React__default.createElement(
          HeaderCaret,
          {
            isCollapsible: collapsible,
            isVisible: isVisible,
          },
          '\u25B2'
        ),
        React__default.createElement(
          SkillTreeTitle,
          {
            id: id,
          },
          title
        )
      )
    )
  );
}
var StyledSkillTreeHeader =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject$c(),
    function(_ref) {
      var isDisabled = _ref.isDisabled;
      return (
        isDisabled &&
        css$6(_templateObject2$9(), function(_ref2) {
          var theme = _ref2.theme;
          return theme.disabledTreeOpacity;
        })
      );
    },
    function(_ref3) {
      var isCollapsible = _ref3.isCollapsible;
      return (
        isCollapsible &&
        css$6(
          _templateObject3$6(),
          function(_ref4) {
            var theme = _ref4.theme;
            return theme.treeBackgroundColor;
          },
          function(_ref5) {
            var theme = _ref5.theme;
            return theme.border;
          },
          function(_ref6) {
            var theme = _ref6.theme;
            return theme.borderRadius;
          },
          function(_ref7) {
            var theme = _ref7.theme;
            return theme.headingHoverColorTransition;
          },
          function(_ref8) {
            var theme = _ref8.theme;
            return theme.headingHoverColor;
          }
        )
      );
    }
  );
var HeaderCaret =
  /*#__PURE__*/
  styled__default.span(
    /*#__PURE__*/
    _templateObject4$3(),
    function(_ref9) {
      var theme = _ref9.theme;
      return theme.headingFontColor;
    },
    function(_ref10) {
      var isCollapsible = _ref10.isCollapsible;
      return isCollapsible ? 'inline' : 'none';
    },
    function(_ref11) {
      var theme = _ref11.theme;
      return theme.headingFont;
    },
    function(_ref12) {
      var theme = _ref12.theme;
      return theme.headingFontSize;
    },
    function(_ref13) {
      var isVisible = _ref13.isVisible;
      return isVisible && css$6(_templateObject5$1());
    }
  );
var StyledTippy$1 =
  /*#__PURE__*/
  styled__default(Tippy)(
    /*#__PURE__*/
    _templateObject6$1(),
    function(_ref14) {
      var theme = _ref14.theme;
      return theme.tooltipBackgroundColor;
    },
    function(_ref15) {
      var theme = _ref15.theme;
      return theme.tooltipFontColor;
    },
    function(_ref16) {
      var theme = _ref16.theme;
      return theme.tooltipBackgroundColor;
    }
  );
var SkillTreeTitle =
  /*#__PURE__*/
  styled__default.h2(
    /*#__PURE__*/
    _templateObject7$1(),
    function(_ref17) {
      var theme = _ref17.theme;
      return theme.headingFont;
    }
  );

function createSkillsTreeMap(treeId, skills) {
  var skillsTreeMap = {};

  function addSkillToMap(currentSkill) {
    currentSkill.forEach(function(skill) {
      if (skill.children.length > 0) {
        addSkillToMap(skill.children);
      }

      skillsTreeMap[skill.title.toLowerCase()] = treeId;
    });
  }

  addSkillToMap(skills);
  return skillsTreeMap;
}

function AddToFilterIndex(props) {
  var skills = props.skills,
    treeId = props.treeId;

  var _useContext = React.useContext(FilterContext),
    addToSkillMap = _useContext.addToSkillMap;

  React.useEffect(function() {
    var skillsTreeMap = createSkillsTreeMap(treeId, skills);
    addToSkillMap(skillsTreeMap);
  }, []);
  return null;
}

function FilterListener(_ref) {
  var setVisibility = _ref.setVisibility,
    isVisible = _ref.isVisible,
    treeId = _ref.treeId,
    disabled = _ref.disabled;

  var _useContext = React.useContext(FilterContext),
    filtersMatches = _useContext.filtersMatches;

  var _useState = React.useState(false),
    hasLoaded = _useState[0],
    setLoadingState = _useState[1];

  React.useEffect(
    function() {
      if (!hasLoaded) {
        return setLoadingState(true);
      }

      if (disabled) {
        return setVisibility(false);
      }

      if (!filtersMatches) {
        if (isVisible === true) return;
        return setVisibility(true);
      }

      if (!filtersMatches.has(treeId)) {
        if (isVisible === false) return;
        return setVisibility(false);
      }

      if (isVisible === true) return;
      return setVisibility(true);
    },
    [filtersMatches]
  );
  return null;
}

function _templateObject2$a() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background: ',
    ';\n  border: ',
    ';\n  border-top: ',
    ';\n  border-radius: ',
    ';\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n\n  @media (min-width: 1200px) {\n    flex-direction: row;\n  }\n',
  ]);

  _templateObject2$a = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$d() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background-color: ',
    ';\n  margin: 0 8px 48px;\n  min-width: 304px;\n\n  @media (min-width: 900px) {\n    margin: 0 8px 16px;\n    padding: 16px;\n  }\n',
  ]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}

function SkillTree(_ref) {
  var data = _ref.data,
    title = _ref.title,
    description = _ref.description,
    closedByDefault = _ref.closedByDefault,
    currentLevel = _ref.currentLevel,
    treeId = _ref.treeId,
    savedData = _ref.savedData,
    skillPoint = _ref.skillPoint,
    handleSave = _ref.handleSave,
    handleNodeSelect = _ref.handleNodeSelect,
    handleNodeRemove = _ref.handleNodeRemove,
    _ref$collapsible = _ref.collapsible,
    collapsible = _ref$collapsible === void 0 ? false : _ref$collapsible,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  var isMobile = useMobile();
  var initialVisibility = closedByDefault || disabled ? false : true;

  var _useState = React.useState(initialVisibility),
    isVisible = _useState[0],
    setVisibility = _useState[1];

  var memoizedToggleVisibility = React.useCallback(
    function toggleVisibility() {
      if (disabled) {
        return setVisibility(false);
      }

      if (!collapsible) {
        return setVisibility(true);
      }

      return setVisibility(!isVisible);
    },
    [isVisible, disabled, collapsible]
  );
  return React__default.createElement(
    React__default.Fragment,
    null,
    React__default.createElement(AddToFilterIndex, {
      treeId: treeId,
      skills: data,
    }),
    React__default.createElement(FilterListener, {
      disabled: disabled,
      isVisible: isVisible,
      setVisibility: setVisibility,
      treeId: treeId,
    }),
    React__default.createElement(
      SkillTreeProvider,
      {
        treeId: treeId,
        savedData: savedData,
        handleSave: handleSave,
        sendNodeSelectDataToClient: handleNodeSelect,
        sendNodeRemoveDataToClient: handleNodeRemove,
      },
      React__default.createElement(CalculateNodeCount, {
        data: data,
      }),
      React__default.createElement(
        SkillTreeContainer,
        null,
        React__default.createElement(SkillTreeHeader, {
          isVisible: isVisible,
          disabled: disabled,
          handleClick: memoizedToggleVisibility,
          collapsible: collapsible,
          id: treeId,
          description: description,
          title: title,
        }),
        React__default.createElement(
          VisibilityContainer,
          {
            isVisible: isVisible,
          },
          React__default.createElement(
            StyledSkillTree,
            {
              isCollapsible: collapsible,
            },
            data.map(function(skill, i) {
              var displaySeparator = data.length - 1 !== i && isMobile;
              return React__default.createElement(
                React__default.Fragment,
                {
                  key: skill.id,
                },
                React__default.createElement(SkillTreeSegment, {
                  shouldBeUnlocked: currentLevel >= skill.requiredLevel,
                  currentLevel: currentLevel,
                  skill: skill,
                  hasParent: false,
                  parentPosition: 0,
                  parentHasMultipleChildren: false,
                  skillPoint: skillPoint,
                }),
                React__default.createElement(HSeparator, {
                  display: displaySeparator,
                })
              );
            })
          )
        )
      )
    )
  );
}
var SkillTreeContainer =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject$d(),
    function(_ref2) {
      var theme = _ref2.theme;
      return theme.backgroundColor;
    }
  );
var StyledSkillTree =
  /*#__PURE__*/
  styled__default.div(
    /*#__PURE__*/
    _templateObject2$a(),
    function(_ref3) {
      var theme = _ref3.theme;
      return theme.treeBackgroundColor;
    },
    function(_ref4) {
      var theme = _ref4.theme;
      return theme.border;
    },
    function(_ref5) {
      var isCollapsible = _ref5.isCollapsible;
      return isCollapsible ? '0' : 'auto';
    },
    function(_ref6) {
      var theme = _ref6.theme;
      return theme.borderRadius;
    }
  );

function SkillProvider(_ref) {
  var children = _ref.children;
  return React__default.createElement(
    AppProvider,
    null,
    React__default.createElement(FilterProvider, null, children)
  );
}

exports.SkillProvider = SkillProvider;
exports.SkillTree = SkillTree;
exports.SkillTreeGroup = SkillTreeGroup;
//# sourceMappingURL=beautiful-skill-tree.cjs.development.js.map
