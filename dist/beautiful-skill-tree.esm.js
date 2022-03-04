import React__default, {
  createContext,
  useState,
  useReducer,
  createElement,
  useContext,
  useMemo,
  useEffect,
  memo,
  Fragment,
  useRef,
  forwardRef,
  useCallback,
  Component,
} from 'react';
import { v4 } from 'uuid';
import styled, { ThemeProvider, ThemeContext } from 'styled-components';
import { throttle, mapValues, isEmpty } from 'lodash-es';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
  createContext({
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

  var _React$useState = useState(''),
    resetId = _React$useState[0],
    setResetId = _React$useState[1];

  var _React$useState2 = useState({
      required: 0,
      optional: 0,
    }),
    skillCount = _React$useState2[0],
    setSkillCount = _React$useState2[1];

  var _React$useReducer = useReducer(reducer, initialState),
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
    setResetId(v4());
    return;
  }

  return createElement(
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
  tooltipTitleFontSize: '20px',
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
  createContext({
    filtersMatches: null,
    handleFilter: function handleFilter() {
      return null;
    },
    addToSkillMap: function addToSkillMap() {
      return null;
    },
  });
function FilterProvider(props) {
  var _React$useState = useState({}),
    skillMap = _React$useState[0],
    setSkillMap = _React$useState[1];

  var _React$useState2 = useState(null),
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

  return createElement(
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

  var _React$useContext = useContext(AppContext),
    skillCount = _React$useContext.skillCount,
    selectedSkillCount = _React$useContext.selectedSkillCount,
    resetSkills = _React$useContext.resetSkills;

  var _React$useContext2 = useContext(FilterContext),
    handleFilter = _React$useContext2.handleFilter;

  var skillTreeTheme = useMemo(
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
  return createElement(
    ThemeProvider,
    {
      theme: skillTreeTheme,
    },
    createElement(StyleSkillTreeGroup, null, children(treeData))
  );
}

SkillTreeGroup.defaultProps = defaultProps;
var StyleSkillTreeGroup =
  /*#__PURE__*/
  styled.div(
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
  var _useState = useState(Infinity),
    width = _useState[0],
    setWidth = _useState[1];

  useEffect(function() {
    function handler() {
      setWidth(window.innerWidth);
    }

    setWidth(window.innerWidth);
    var throttledHandler = throttle(handler, 500);
    window.addEventListener('resize', throttledHandler);
    return function() {
      window.removeEventListener('resize', throttledHandler);
    };
  }, []);
  return width < 1200;
};

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose([
    '\n  border: 1px solid #79ecc7;\n  background: transparent;\n  padding: 10px;\n  color: #79ecc7;\n  transition: 0.2s;\n  width: 100%;\n  border-radius: 5px;\n\n  :hover {\n    background-color: #79ecc7;\n    cursor: pointer;\n    color: white;\n  }\n',
  ]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose([
    '\n  display: flex;\n  column-gap: 30px;\n  margin: 20px 0 10px;\n',
  ]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(['\n  margin: 8px 0;\n']);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(['\n  font-weight: bold;\n']);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n  font-family: ',
    ';\n  font-size: ',
    ';\n  margin: 8px 0 0;\n',
  ]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var TooltipContent =
  /*#__PURE__*/
  memo(function(_ref) {
    var content = _ref.content,
      title = _ref.title,
      currentState = _ref.currentState,
      type = _ref.type,
      isOwner = _ref.isOwner,
      handleClose = _ref.handleClose,
      handleSelect = _ref.handleSelect,
      handleRemove = _ref.handleRemove;
    var isMobile = useMobile();
    return createElement(
      Fragment,
      null,
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
          },
        },
        createElement(Title, null, title),
        createElement('img', {
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
      createElement(Type, null, type, ' Skill'),
      createElement(ContentContainer, null, content),
      isOwner &&
        isMobile &&
        currentState !== LOCKED_STATE &&
        createElement(
          ButtonContainer,
          null,
          createElement(
            Button,
            {
              onClick: handleRemove,
            },
            '-1 Level'
          ),
          createElement(
            Button,
            {
              onClick: handleSelect,
            },
            '+1 Level'
          )
        )
    );
  });
var Title =
  /*#__PURE__*/
  styled.h1(
    /*#__PURE__*/
    _templateObject$1(),
    function(_ref2) {
      var theme = _ref2.theme;
      return theme.headingFont;
    },
    function(_ref3) {
      var theme = _ref3.theme;
      return theme.tooltipTitleFontSize;
    }
  );
var Type =
  /*#__PURE__*/
  styled.div(
    /*#__PURE__*/
    _templateObject2()
  );
var ContentContainer =
  /*#__PURE__*/
  styled.div(
    /*#__PURE__*/
    _templateObject3()
  );
var ButtonContainer =
  /*#__PURE__*/
  styled.div(
    /*#__PURE__*/
    _templateObject4()
  );
var Button =
  /*#__PURE__*/
  styled.button(
    /*#__PURE__*/
    _templateObject5()
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
    type = props.type,
    isOwner = props.isOwner,
    handleSelect = props.handleSelect,
    handleRemove = props.handleRemove,
    currentState = props.currentState;
  var _tooltip$direction = tooltip.direction,
    direction = _tooltip$direction === void 0 ? 'top' : _tooltip$direction,
    content = tooltip.content;

  var _useContext = useContext(ThemeContext),
    tooltipZIndex = _useContext.tooltipZIndex;

  var tooltipRef = useRef(null);
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
        type: type,
        currentState: currentState,
        isOwner: isOwner,
        handleSelect: handleSelect,
        handleRemove: handleRemove,
      });
    },
    [content, title, currentState, handleSelect, handleRemove, type]
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
  styled(Tippy)(
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

const img$1 =
  'data:image/png;base64,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';

const img$2 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACNCAYAAAB2S9JvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAARHdJREFUeNrsvVmPJMmVLvbZ4kvsude+dVf1vneTzSY53IacoXCvhKt7IUAYQduDHvSgFwGSoFcJ0F8QJAjQP7iQBGkG4lzODJdusrur1+q9u7qWzMp9i8V3NzM9mLmHe2R4RGRWVZPUpRcSkVkR7uFu9tmxc76zEaUUHvTxVz/5IRjnICAAAKJf8Le/+CU5f/YMWZifszqddoNz3uGMzYOQBUJIiwB1QkgdhFgEqAGwAVjmshKAMj+ycN+q8CpH/s5eBQDf/CgAFPr6fMznhVL59wCA+TP/W3+HggDMAwISULJwHaWG91O8dwmV/V/+eanM9QghCgCRUnpxEh/s7R/ufvLZ597I8KoxfxfH5b4mlDwoQPzsxz+AZVkghCBJEsI4twhIG8AKIbgM4EkAVwAsEELqABoA6mZiHAAuIaQDoGMmjJzkeU5wjprxOmrG66hjfKcAcKiU2isARwKIAXSVUhtKqVtKqVUhxJ0gDG9vbm3vfPX17aDivlRhAaiTgOPEgHj+2aextLgA27Lwd3//D/jZj3/ALctaJoS8RAj5F4SQnwA4Y1Y5w5+PB3EkSqmvlFJvKKU2kiR9ww+Cr9fWNzbvrq7FY0ApAaTHAcaxAPHqKy+h1Wri3/zjr/H8s0+zpcWFjm1ZzzDG/iUh5K8BPGIA8I0chJCjy5qMX+BkzC9kmjwg5eFVo4tSjYgDM5ZqkmBQs4mQY0i3vlJqE8CeUmo1TcX/0R8M3r63sblTAInQW2G+TZ0cEK99+xXMddq48cln9NyZ07VWq/mY6zj/LSHkLwG0DQDIbBNoJsK8UkJAKQElFIRRsOx3qt8jhIJRCkIBSqn5PM3PYUy/n327Usr8DPWWypE0nyEgObCy80tgmGFGCABCaeHaqvQ6xIpRTqSCVApSCAipIJXM/08ICSkFUiGRpCmEEJDy6PWmHAGAEMCulPL1JEn+9cDzb6ytb+yurt0Lja4hjw2IixfOk3NnTjfnOu1/wTn/HwGcM+KfzLJ6OWewOIfj2LAtC5xRcM7AGQPJJpeQ0krPfiWF/x99Hf3dsiw4jgPbdrQeQ8nUwSOE6MEWElEUQkoJ162BMQbG2cyDL9IUcRwjiiLEcQwpZQlgVQCRUhaFyljESqXBIqVClCQIgwhRnCBKEohUQGYAnu2QADwp1d/97S/+zX8GIFZKiZkA8Z1vvczm5+Z+whj7nwjBc7NsA4QQcEZhW5YGAGdwbA7XdWFZNmzbgm3b4JyDMQ5KtSQgKEgNQmBbNmzHhuM4cGs12LatJ9q2wBjTgp4QMDZckZRSMMaM9KAaVdMGihAoqQdUSgGllL4+IXq1zzjQyqxqvZL1dQghkFLmEkcIgTRNkcSxBk8YIQwDRGGEOImhpMwlSAYSIQWUlPq8JEEURUiSBCKVEEpACIk4SRFGMcIoRpwkEELOCpDBG79/+/TewcGoBQM+ZmLZz3/64/+Ec/a/jnu/CABKKVzbgmNzcEph2xytdhvz8/OYn19Eq92GFAkazRZarWY+wZxzfT5jE3UDSuhYXeHIvq+Gq09O3yZLR/Yd+TI65vkax3R4j6Ta1hi9x6rJU2YbEWmKJEkRBgF8bwDP8xDHMXzPR7/fh+cNEEYRoiiCSARSKRElCYIwQhjGSIWo+o7ma6++8gtCyA9GpURJQhD9VLV//vOf7RtTsDx4lMC2LNRdB45tweIMc3NzuHT5Cs6eO4+F5WUsLi5jcXkFcwtL4Jxjc+02tjZX85FSM4q5h8GP/DEdpLg/Tlh0BAClLJeoSiktMcIIvu8h8AMEgQdvoH/v9XrY3duF7/uQqUSQJPCDEFGcQEqZ6yMAVL8/eO6ffvvGR5MkBPv5T3/83xTBwCiF69po1mvotFvotDu4eOkiHn3sCZw+cx6tTgcLS8uwbWfsQ62cvQDP6+NgbwdKKVAjlv9tP9REBaK8KISUIwuTol6vo9Vq6S3S6CRRHCGOIjRac7AsB/t7OzjY38fu9hZu3vwKO7u7WN/cza5Hms3G/0YI+W5RwRwFBGeM/YcAwBjF2VPLsC2OuU4Hz7/4Ep594WWcPncB9UYzv5GpIpkyXL72FFqdDezvbMEb9PQ+O+P5fz7GaIdSQkqJJE2GW6pSUFC49OhjOH32UunzH71/HfVGHe+9+w72D3vw/DA77wWz+IOxgHjh2aeXCSFXDTLQqLuouS7+g7/5j/H08y+f+AEYZVg5fR4LiyvY3lrH9sYq0iQBofTP0uJBSBsDkFNnzh8Bw+2bn+Pe6m20Ox0sLS5ha2cPvh9mKo7z47/43o8JIX+XkVe0sF/RleXl/ygDCWPa9FpaXsG1J555IDfOLRtnz1/G1SeexdzCEkj2MEIYTVv9eXaPCwalIKXE0qmzOH/5Wum9zfU1fPbxDQghQAjByunTaNZrJWW+Vq/9D0UVvSghGOfsR0PbnoMSAtd1cfOLj3H1iWdgWQ+GhGy25vDo4214/R4O93cx6HcRRQHSJEGapkaBmk16KKVy80ybXTI3+UaV2GybK/IahBBjsjJwzv6ktjJlyK3lU2dx+dEnSu/1ugf45MN3kcQRLFvPW71eR63mwnVseH6QGfyPGG5JjgKCG9+DBgRnsCwLrXYbd27dRPfwEE888zzm5hcfEO1M0WzPod5sIwoDbG+uY/PeKrrdLrzBAGmaQCqVa+O5ySZkgVHUYJA5Qzn8/+L/lc1ZzXkQYthQSow2b34vaPTUgLL0Uzi/xFQWiTTDhzDGwDk33IseT875AwGdUgpKCCyfPodLVx4rk2UixScfvAvP64NbVv75Wr2O5aVl7OwdwA9Cw5mg6bouB5CMAsI23kb9h2H/6vU6OOfY3d7E9d/18MwLL+P02QsnVobiKEL3cB/dgwN0uwfo97rodQ8x6PfhDQaG7RNj2b1JHHRGCGWfJ3igPoNK/8no/2cAzniaIigsi4NbNizbgsU5KGPgzACGayBybmngWLz0PKM6g1IKK2fO48KVx47c0ycfvoed7c1cMmRjb1kW5ubmUHNsMEqRCgEA1rdeeuEKgE9KgGi1Wg1CyKns4RglcBwHlm1DKQVuWQgCDx+++xYoZVg5fXYqgoeTv49u9xC97iH6vS763R48f4A4iiFEOsL5qzEWu5rIUaiCWTb5WphIgc8y+aMSZxSIJwFYETyWpRldy7bzBdlst9BsNGHZFoQQEErh9NkLOH/p6pHrffHJDdz5+kswzsdYfBSO68LiDI5jIzXbhus610qAIISQV1956UUAbvFky9KsYvawlmUjikJ89P51vPzq99GZX4CUEmmSIIpC+P4A/W4X3cMDDHo9IwF6GAz6iMKocuVnipFIU8RJgjiKIKTMV4JSyugIYuKPlBJCSqSpMHRvrOleKQGlQBnVzGS+BQCEMNDMsUYZGBuK+yIdTikFN7oGMdQ5oQScczi29tUwrvUu7Q/hYOY8vQ2R0rZSBFRmRqZpiiiKjgCGMY5azUWj2cTKygqeffEVLK4cXZBrd27hqy8+BQjG0wKGlmeMoVmv5XoEJfSRUaWS1Wvui0M6VyPWcRwwxpCm6VDR4Ba8QR8fvPMmXnr1exBpgjd+80/YXF8DIRRxRqUWVv6ogpeBKI5jeJ6H/f19rN5bx8bmNjzfR5KII/SuUgVv5hivYuln7PvG26gKe/A4JpwM3eI5hU6N7mE+OE7CZLoFpRQW5+CcaVa35qLVamJ+roP5uQ5arRZcx9HS17LALct4dI03t0DcZa9pmqDfT9Dr9bCxvo7PP/scc/PzWFo5hYuXH8GFS1eQpjE+/eh9SJHmesORLVsIOI6DWq2GgR+CEgKpFBijTxFCiFJKZYDglLFz+UNSjXLXdceKScu20T3cx/Xf/Qq9bg9f3/wq996N6gzCrOxs8g8ODrC+sYX1rS30+x7CKEIQxYjjxLh7CxbCESfzuNdq1SJjhzNXd5VUH31v0t+ElN3nJVVmqEQYlzjJJYbFWA4S27a0jmZb4JzBdRzU6zV0Wk3UG3XUa3W4rotGo4FmswnHdUsKbhSF2NxYx/q9Nbx3/S0QQnH69GnMzc8hSRPUjWQbNx9urYZ6vQ66f6CVWyFACH3RNvoGHxoV/PEiXW1ZHLbjVA64ZdvY293B7s5uSfRHYYgwDDEYDLC7t4eNzW1s7ezA8wKEUYwgDBEnaT75UqnSyq2elOFqL+/tpMLhNMRM5r8ihck6oqKMXEaRMtE8qk6MC64ZQlRBKgBCB14mqUA0EphDCjEdFteKp825+ZvDtjhc10GjXsPS4gIunD+PpaUl1Ot1vTUVPLxKKWxtbcL3PTQbDbgGQOP0H9u24ThuHnog9LhcfPrJxziAhANAu9WsU0ryTYkxHcfAuDWZgWQMtZoDKQVEKvD666/j7uoakjjBQX+AvYMuojhBkuo9PhuscZOfmYC2UaqGMRMFkzA3/ZC7ubN4CsdxwDnL9Z9MURu+wgTf6IHQol+/n6YJgiDU7vA8GspMaklCZt5KlXslh8+jIKUGaxTHCIIIYRQiDCOzPWXRUkWwSCQpEEZlK2WoZGpwWPwu7Pc/huNYaDYaWFiYx4VzZ3H+/DnMdTrmMxpMtmtXCk6lFJixeDJQmmOu0247OSCazWaTUtoqchBa4+VTtWfOLbRaTRweHOLdD24gTjU4dg96COP4yPlFDsC2LTTqdXTaLbTbLTSaDXCuA3XjOMZg4B1LW282G7As69iavu04cNwa+v1+0Rt4okBQxhg6nXYOKoXMOxnC83wEYYSB55v4Bh3rUNRpVBYYIzOwxAWdwozd13dx/f2P0KjXcO3yRbzy0nN45ZWXQRkz7nxVCQg97rb5bA4Iy7GdDoABBwDHsZtFD6dlGRuZ8xl8dnpVHHa76PY9HPQGsC1+xKyyLQvNxvjJHztJto12m6LfH8zsLh8MPLTbLTDGTjSR7XYb/f4AQogT8xRCCERRBMdxjIJKYNs6mqvV7owxzWMcHh4iiiIEYYgoihFGEYSQR8EilYnj1+F1YRQhDCO4joXnnnsOtTrXutwEU1opZQiysteZMdoGcI8TQsjTTz62CJP/QAwplWm8kyaj+Na99Q0c9j3ESQopFZ58/CqSNEXNdadOfrX04Wg2G+j3BzOzd/3+AO12a2Zv7Kid3m634Hk+4jg+MSiCIIRt21OflxACxhkswzs0W60j/EpirLFRsMRxDKkUgjDCfreHKI5Qq9fGKvdHfUqWNqGL92dISQ6AOo5zOgMETCgcpRTcsqasziE1vLm9AyGkkTAWFhYWKiOijnNYloVGow7P82dmQ/v9wVBsj9K9Y55ndOIajToIIQjDCCdxxkop4fsBGo361M8WTfoj90UpbMeB7TglsNRcB3dX17C+uQ2pFLo9TfLpZ5QzjKnml0YU4rkMEJwzvlj0fOZkzIwMnFIKnufnn3Uc64GAITscx4EQAmEYzSy2fd+Hbdvo9voIw2jmc6dLLU03O441UQpFUYR6vTZVSsRxcnxJxhg67RY2tnTQkReECAJ/qOhOmDMpJSxb37uSJTNuaQgIzhYyHSpn1IxZM3HLKFwwNM4Sw3zh8PBwjDVR5PdZzgbOspXUajXEJgxs3ENGUYJUpEhTgYd5pKlAmgqEBUaxCiRRFMN1nYmTM0lCTDpc181N8yiK4RvWUUFN3DaGOgQHKClKiJUMEDZjrJVZ1FneQ2baVSlYJfGrFIIwD7oA56ykrY9S1JqiLSt0PLdsrLFKITGueN/3v3EQHAckWZqB49iI48mAiKKT6ym2bYMSCgmBVAgEQVAC2iRAZPwFL0u4MxkgGKG0QYimb3L+3VgHVRJiNOYgCMNcVB1Xy898EUYlM34UHc5ftHQcx4bneQhDnZ/wxxhQk4EjihM4doxaza00he9HcS1K1kxvGs6NmAgIblnDlIXhce6pxx8jvN1qOpSQZi7+jPY56oipUCmHDGUUFyQEv69B1atf+0QYY3AcB5QS9Aceur3Bn0RklVIKYRRjdW0DnU4LnXarNC6Zs+5+3PCUDgHR7feHMSNmsVbNXyYh2AggbMemfG6uUyeE8KKpN1OkkvFGAkCSpojiYcAnf4AKZZIkGAx8RGNIruOalDbn4DYHowww+68y3tGS9xVlT6xIhSGNJI57C0opHB720OsN0G43c2CEYXhf48IK/gopFQ4PuxBpCsY5pNDe03GSWik13AFoaZ4vNOp1xuu1uoNC+r1l6N9pg68KJmcQhKUHvF8JUdTA/YKyOtPKMeYa59oXUHNc2I6FTqeNpcV5LC4s6KQh10WjUQdjLHc/ZzpO9n1pKnBweIiDgy7iKML65hY2NreRJgmENC75NJ0pEEdKmQNjcWHuxMpk0STNVriCwv5hF0IIMMZ1rqiSU7nWkS1j0bIszi2LO0UJkaGHc2vygyqVWxnewENiHpBo1usbBwPnHI16DYuLC1hZXsS5s2dw+vQK5ufnYVuWTv+jRV8GyV+HNPPRZzx//pz2w5gEmdAQRP3BAGur93Dr9l1sbe8iimOkaTqVGJJSYnfvAPWaC9u2Tr5dEIJOp42BHwAK6PcHiOMEtuMY03Py+aTgBzJj3KCUOBoQIHZxiRHDd2MiSzkcwL7nITGafha0+k2AQSesuDi9soILF87hsWuPYmVlKSde2HGSggg56jclBNxIm8zUaxmCSCmJR65cwksvPY/Dwy62d/fwxedf4tadNYRhOFXT94PQWAtawavVXNi2jcHAyynrSRMK4w4gREsInZ0VoUVaZmubZnrao/PEOOMNnsRJBDIERDYJbIrYz4JZAcDzvJKC1Gw2DYUtHwoYKKWYn2vj3LmzeP7Zp3D+3DnUGzVDF38zUdOEUDiOC8dxsbi4iMuXL+HJx67i9t1VfP75l/jy5i0MBn7lGCil4Pnaolpa6uTiu9Vqot8fTARF9lnLtvI1myQ6mXjWWFQrC8wphBlYlrXI1ze3Ds+fO/tU8UYzAmkGLUIDwh8+eEb5noTznQUM9Xod1x69jFdefh5nz5xBo9kApX/4AjWMMczNz+P5uTlce/RRfP7FF/jo489w+84qBhNo9/7Ag+M66LRbJY6hChBFCZxNKKCQCoG4QO4os6WPKI5DLsKydBggGUZxUErm+d7+QUQpXS46rPIvnbJlZIfv+TkRZdvWQwEDpRTLy4v49ssv4Pnnn0Gr1f6jzPoihKDRbOClF1/AI1cu46OPP8X1d9/H5tZupbTY3d0HgBwUlsUnbxcl5Z3kJQdyLogQvWVMGB7bbKkjH5rTVyzJWTVOA50IiEHBj3ES/WEaGDjnePTKRXzve9/G1UevPjAr5iEjA3MLC/jOq6/g1MoiXv/d2/jq69uI47QSFATIPbWMsbE8RXF8tY6U1ZPQDjVlclmmxrEYRjiLmsosjWJZvqMSYgogsi/1gyDfPo4LiFnA8MKzT+HHP/4LLC+v4OFkWzw0dgrcsnH12mNot5t48+338e77N+D74zmInd19EELQajXBOR8LiOJioJSagDwdreWbrZsyphOapAJh47cMznU5h6LEkVI2OXSNiIAQYh1Lh8jcGFIhCML8b36MOAQp5UQw2DbHs08/iZ/+9EdYWFi4PzCMmpVZdpcUI6J8GE2rTXCWm6cn3aIIIVg+dQbf/66NTruJ13/3Dg67vYmgqFpYWZhgxioP6WvtPsifhZQJtiNbMKO536rInnIAkgyLg+aXYJxX6hAlxxYBwqJjy5pdnEdRMkUyPI0f/+QHBgwnwIDUBbx0LSlh6iJoEkqILCI8HTHRhiVgCAgIY7okkmXDsixQZoGy42etU0LRmV/Es888Dc4t/Pr1N3Fw0B07tju7+1heWhgLrKJfhBVWuFQSQRAgTVPYjmNSHqvJKcv4M4rPQSld4XqRq0NGSC1bOdP8GBmjlyGo6ApmM0qIOE5K540qkI9fewQ//OH3sbiweExBoFd9HCeIIh35JFMxVsEaxirSCs5TgyoKA0RhYCKcOGzLgeW4Ywd1oiVCKRYWl/DiCzVwzvH3//Br9HqDsZKz3x/Acewjk1geJ1byZ/T7Xu75lUpOXNCZBKLlHJMVDkAkcfIFc50zo4iuXnmqkDthHFuqWhkdek/138JsFVXHhfNn8MO/+C6WlpaOBQQpUh1qFvgQIsn1oXGm13FFfnaINIWfJCD+AMziqDfacN3asSRGo9nESy++iDhJ8fe//PVYv0YQRjq2tTCeo9YHy4Nq9ZbR6/dzD2pxjqoW3ejYEELmOQABqPSI9UAmDX7B9S1VrvyQnD2s5en14wCyt39QebPzcx38xfe+g4uXLs48yEophGEAv99DKtJSlvfDMi0zcAy6B0iTBPVGc2aFWikFy7bw0ovPY3tnF29ff/+ISZp5kGs1t1JCEEpBC0pjf+AhjqNcsk0CxDArrTg/pEUBCFJiKo+uinHSdMiIyRwQyty067o5JTvuqApnc10Hr377RTz+xGMzB8kKIeB7ffS7B3lhjKkTYgY8jnU+hu8HeZhdEIRI0nRGHwqBAuB7A/S7h0iOGd/QaDTw6rdewvLS+G0xKkSIsTHZWIQQdNptY3rqgNssNzRzPk5MeD5aI7TNAUgUnFvKEBvTdAgUfO9Fz920gUyStBIQj165hJdeeAGO7cwIhhTeoIcg8E39ysmrMopjHB72cHDYRX/godfr6/I6ShqbnkIpiWazgZXlRbRaTTQbDXTak2tqEQJEUQAlBZrtDqwZ7x+ATt59+gns7u3lQcplKZGgVnOO6BNF1lKZBKAM3EPFX06wMph2RJafq8WNhHBGTbSpiltBAUpSMXM9hl6vX2Fi2nju2afQHhMtPR5YMQb9HpI4BJmABCklDg67uLeuXdc3b63mYXizHMvLi3jmyWu4cukC5uY6JTNtdHLiJMZg0EOz1Zm52o5t23j66Sdw4+PPsLW9c+T9VKQAnMqoK8e287FPUgHf98q6XgUXMdx2Su91OABJCe0UPRSzmHN5yTwTjJEDZEoYeJV0uPrIJVy5cnmmrSJNNRjiKKyUZEop9PoDfHXzDt6/8clYE2+WY2dnD/+4s4frrY/ww++/imuPXqrUFQghiKMIA3TRas/PzKguLS3h0UcuYXtn94iETVORByOPZxyzcHoFIWVpfPW8qMo5BABaXkyO5iGKtofCVF+EUsP+IkIOFcpSm5Eq5W+Mqck5x9NPPZG7lqdtE4N+D3EcVYIhTVPcXV3Hb353HTs7ew9Ekez3B/jFL38DKQWeeOzqZEkRRQj8PhrNzkwAtyyOs2dOw7L42LD8Sb4NLfIL/owggJIShNKJi5uYJOGRMaxliYCD40iI4qzn9Op9aPScMaycWp46eFJKeP0+oiis/LowinD9vRv41//X//vAwDDkTmK8df0D9Pr9qVZI4PuI49nC5AgIFhcXMNfpjJ/0CdZL8T2pFIIgKBRWV6XqOuPOLceMEIcCkFCqd4TmndHTKUZC4NWMDrHSjZkqLNMshCgMhgrkWL0iwdvXP8Rv37j+0NwTvX4fG5vb00MMlSrFJ0xzhDWbDczNtSvephMnNed3hEQUxrlyqvKiFahkg0s5nkSH4RMUKpkqNd1aKJozWSmf0QIexRjFYbnA6v1s2n6bJAk8r4+qZhZKKdy8dRdvv/vhdMawULyDEG0q12q1MlM48MbmlMZxim6vXxnEOiqWZ+Y2zL/jHowOYxqkUnnRtklcRJFEpAXCkACEo5DCN+tSL0kIIUAKJ6RpioODw4obqdALpIDvB/m1FMpl/qRSCP0BRJpWSpGB5+Pt6x9MjNJqt5potRoIw+jI54pmXRBUh8DZNkejXp/Odyilo7tnPKSSuT42zqytBESh2Z2UEkEU5fS1UpMtRs1tlCgGwgFwpVAbXf0TYwLliA5RKNciqkvyVz5YkqR4863ruHz5ErhpXlKr1VCvubC4BakkQt/LS/RkdSSZKRIWRTE++fRLbFXoDM1mA52Oru2UMX69Xr8QXZ1ib+8gT6+fqO9wG3Od6dnlqkAPz3KkqYBIZTUTWElBk1LCTmyKv45K8nGTkRVQK0omDsAClDtOgZu2XUDh2MkmnLMjqXdSSrz9zgd49/0bIES7ZC2Lo+7qOElKCRTR4pEzZuo76nQ513XQ7fZxZ3WtkrNfWJiDVdiSGGNotVo4ODhEaAp3zBrdPdfRBcRm2ANmDu1TSmHgeRj4XuWkVwNi6ODSFH40DL+btLAL20YpCguAXSg+NmwkJsXYJV1UVAjVnWOOs/NxxipzMbUyJM1encDzgvtWApeXFkpgSNP0xBnh9Xodr7z43Exp/qyi8FeV9bS5tVVZMWfSdYrfoxTydIBZ9n4phe5fRsuAYGqkK2omBch0q9PUepp9UB3H/sbyMjudFprNxlDPGHjY2d0/UTT44uI8fvDdb+HK5QtTtwEpJeru7C0kRJri9u3VyuTficVViwk7Spl0CFWYy8mSaZyEoEohGlX8qgZt1GV6RNOeMs+UUtRr7rEzso57EELQNkGrSZKi1+tXRilNOi5dPIdzZ07h2tUrWFqcn+rjoZTCdWtoNJozWxndbg+raxtjx3xS9njuz8ijr3VaZbZVkQl627CNVUmpVBwAk1IORnWEVIhqQOTBIyqP/D0OsWWb+oxRFD8UaUEIwdKSbjLbH3jY3d2rNHnHAfbsmRWcPXMKS4vzuHD+LJqN+nQgEALL1sXLavU6KJ2ts18URbj+7vslH8SxAAFgfmEe3YEHBYU0FdPLNppsrThJShJCKbNlSCl7ow8Yx3H1IJDhqwbE8Sc0y1ZqNBq6jlKS3HeVl0zJbLdbGgz9AXZ292eamOXlRVw8fwYry0s4d/YU2q3mTJHnhFLYlq5L7dTq4NyayuMUz//61m38/s13jng6szEq5mtUWwvEZHBpa2XWrSo1yufQc6FSDoAKKYPRGxWTah8dyQ04AV3NeZ5sW96uiqWM5dCzWipNrPJSxxlBpMPZSIFRHGB3d2/iHkopxcULZ3HpwjlcvnQeC/OdYwW5cG7BrdXhuvU8lvQ40m5vbw//8E+/qQwlbLebM42vrumq4/FTIY5dcK0wnynPabLjsCEoA6J4A9MUNsYY6vXaWHcuKbRp1r+fLCMr2yYmzc3pU8t4+slruHb1Chr12rGis3QdcBe1RlPHbpygGn4YhvjtG2/hzp1qc7ndnu7sC4IwnytleKFyKerpFk5hO9XynpoQ/KJOSCe2DSi3BqAzDqbr6sLbDzPjKknSiWDgnOPF55/C888+iXarNdHGH2e7c87h1uqo1ZvDGlwnAMOvf/06rr/zXuWKHTWXq+j8IAjyElAKOl61DM7J7R+EkIhMpBchxOFGQLCSmTA1B6EUup2XG1YTpEKjUf9GMq56vX6lAum6Dn74/Vfx5OOPHu9elIIigG07qDdacFz3RD0ypBTY3z/Ab3/7e7zx5vWJ3EnRXK5iNjPeghCau5LUjM3mldlqU1HKSyGmX0a5O18mFmdpQDJqx45Ohuu6qNXcbyQPM0kSdCsisur1Ov7yR6/hsatXjnUvmo8hxpRs5Q1ljguGKApx8+YtvPH7t/HFl19PYELbaLWaU+/J87xC+mQxg0sWvJdkojKcS7jCx4xzq+BfVWVfRTUg9A0cHVyVf6bRqMO2bXxTR1X9Kc45vvedF08EBkoo3EYDjUZrapnGqj26e3iIt6+/h7fffR/dbn8m7mTS4Xn+iMuAlO65GCc5qSVUsbhcERBHHO5SyamOkdwrSUleXR4m6ZRSilared+FQ6Sp/5SmaV6dpUpplVKi1x9vy184dxrXrj5ybDAwzlGrNfLGtccBg5QSnufh7t1VvHX9PXz62ZdTF9ny0uLE6CgA8P1gfPW6QvuFWU3e3BhQGAEEhoGQeRn/jL4es1cWh5USWnDBavF60lrTWdmeNBXGry+PIZLHE1yubePppx4v5TfMNFiModFooVZvzDzIOTB7Payvb+DGx5/is89vwvMmV/Vvt5u6zcEUMGj/SzhWR0OxwcsUYmq43bMjup9O5RNyUJYQemKUVNUpcIYJoZTCLcQSaG/l8cCQ9Zq6n0KeOjp5zJ4838G5s6dmdrcopcAZR73ZRM3EPcwCBiklAt/H7Tt38db193B3dX0qEABgfr6Dhfm5mfSjymhxNQymZQXfBqnAAyEEUgikWavoEUCQVIgjTGUYBtXgKvalMt37hmASMw98VsDrJM6mcVr3uOPM6RXU3FmlgwKlDLVGC7VGA2QGyaBMHOPt23fwwY2P8dXNW+j3Z+vzsby0MJPOIISY2DskToaLoZiIrCbIh6wWKDLflChsGVLKOD9fDVdt3rT9SBMUouskS32WY9v5N08bwDiOEcfxsWIQZgHXeMvCxYVzZ2aqiqeflaBWr2vJMAMYhEixubmFN996Bzc+/nwmiaC3CF3IdJYqdFJKDAaD6TGuamj1HZHkFeekaQpSzm9SGd+aBSKwopYhhQQfVydCFchNYsoIqVlEXnBf1VuP7duwHTQasxNhtu2iVm8Yx9S0/JIQH374Ed58+12srq3PfE/Ly4toTzEri5Kh3x/MIEGHg88ZKyfwYlpfUlKUIxoQZJRqzJRKVPEQNP/SrCj58CHkWG07SU5eqLPYQzNLIC6aS0JIHFaYc7OBQafHu8Y5NQ0McRzj1795A795/fcz6z2u62Bpcb60vU7Tq2btJiTlcKZYsRMSqd4zlBo/u4a6pk7JyjCKlEjT8TzCSO/K4kPmVK7pm+X7wbF1BN0WWbvIp5VaznpjTCFUpx6W7czEmQgh8OGNj/Dr3/5upl4XjmOjXnNNGuBsynYURTM3jBk3dhkgpqU4YqS5XA4IEAw7dxUCZKr6N41OULGdUBzHebn+40oF7fiqTzW/hmydn7caGm9WTQ9y1fY4g207YGx60znf9/Huex9OBYPj2Lrjr62b1M0KBt/3jx0GkCXjkGzLmLIgCCGl9MsjZmfhpzRQwxD7oxcsos8ueC6VAnq9Ho6byuW6Lur12gPeWzHTRDDGKrvhjh69Xn9s1ZdRIDCm2yzOCgYhBDzPO1bvD2r6q4a2ZTgjgPG8bPlECVHllOOZwnmkZ+6U2gJFxcV27ELJaDXZ3hnzUI1Gfeb2irqGQ1C+t4pFTQmdKX+CTkimHedDSCpiRRr1Wm45aLa2NVOQTRiG2o09hcnMyjVnW2l27cODw4JSyUtCnWAGyVTwlhtASF15y2QA5f0ji46SI9vz8P+PumlnQ8RxHF8nUU4pwcz5EzNR00bRphXPlm11uofodMkwTcfKGsnokMNqXWp4PjlW4XlW3F4KgJBKqoyHKAXZTjQRSVmRKd7saF/s8YNn5b02c3VW6XqLxTLJ2cDIiSVyqnwudKayQkXmdRp4st6Zkwa52WxMlDhVJjg1hdYtyzpSX2pWHsayrFKu5rRz1LgtQyqVGh6iVDx7ooQolNZ3HLsQqKkwi0d+WsX34r2clLsgBA/U7U5NWcAqCcEYR7vdmqlfZ63mlmqCjml5NDMY4iTJLUynsPXO8uxkvA6h0uIs5vqDmu1SjI1KCIU/hirUw0qvU0fViDU6MfpJSAHP95HKtIKBbM40CQ82UEh30xm2tbCGczOlZ8Y4RBQBIYfWRZa5LSZKiKJmXWQuT1JwVitKukJ7VrP5/gExvSShDiPTxU05p7n+lP2fdsEnCPwQ2zu7+PDGJ3kdp5ORYA/2UFKZsDk99vWaO8zmptMTinLuqQgIIUSklEqzULisCtsks05z4AQKug9koQDsTLkZjDHYtjXsIYlhwc4H5ePQ6e7TxbBu1h4gYSk8z8PBwSF29/axubGFvf0DhHGEOIrhBwF8fzy/4jrOHwQQslCamRCiHXnkGBJi5HIcAFIhAhh/VxbbP636SFHWWJZVxMNEc9VxdEW1UaUrUzBPoi9UNXthI7x+UT9KUwE/CHDY7WNnZw+7eweIkxR+4MP3w5lMwVFq+psHg8Rg4OWAoJTAdYf6XJWEKAXHjNEhIIQIFZBreZmEUBPMhaJm7rpO4QvU2CBX27bzntrjGbrg5F1uK/wDSZqiPxiAc4bBwMfO7h62d/ZwcNBDkiYITMKv5/n35YKnM4a+PcgjjmN4no80jvPxJoTAddyZ6PsKFpdwACKOE6/o0UlM9g+Z0ESFFGIiao4zrNKutFsYcAo2eWMi8ZQFyJzkYIxWrs7t7T388h9/B8vmuoajF+gmIw9ScSUES8uLM9HtD+LQvpsgt9KEHDohKaVHXOrTdUByJIQuDsPQUxj20ciSPch0mw6Ajmge1ktUSJIUNbOVNBqNibkPZS7i+Idl2WYrso94HuM4Hlv7cZTWztoESDm54EkVGFpTQuYfxNaQxZEcqa1RKDNdbBg3i7mqjkoRxQHE+weH+1AqGZpXMue61QSlJAOZZVlo1N3cSxpGEc42mzMFgEwq3zMbIPR31Fx3Jle0bds4vbKEy5fPY3F+Do5jm3LMNSgQeL6PXq+PL7/6Gl/fujtxG5NK5Z1wmg8YFEmSIEnSPMC48h6EyIW4lpZuiSeayG4azkiNUNfpwPMGKOgQuhipMWeEHB9XqIbQYoyiXqvn7X6klDOBQZfuPXmCb+bcmcbKZYB55unH8Pi1R3QjV8fO91FdjNxGo9WBbdlI0wTPP/s09vb3cefuGt555wPs7O1XDuzO7j5c1zkxv5Cxwkmi+3eMdhqefK4asdymu/AJIQWQlXgCZarhI0UhkVJKgThJtPisCpIpKiWEoN1q5JHXURzPxF8H91kjIpMOsalhXXU8dvUKXnnpWawsL46dNEIIkjiB3++DttqwHRfWvI3O3BwuXryIa1cfxRu/fwvvvf/RWGkmpUS318fiwvzE+01TkZuJmueQx9qiqnQKnR+jvc7FhThJQmRpDUqW2lcnGSASUiqArgM34wl1FktaqgKWFhdAKYGQyLV2OoHPl/L+pEMREN0J7ujnnnkC3/vOy1PLABECJEkEz+uDGKdS9h3nz5/DP/t3/gqddhu/+s0bY1P3u92+jnjOk3mKWezqgQQSV1lS2UrnnKHm1sxfpLK+JSEEaaLTFkTZIozoUG1QflkhSxBHUWWX+SL6CCU4c/pUzi3oeonRFLMpuq+VodsNcSRJMraeZCYZZgFD+b5CeP0eRJoUOu5o7+X3v/cqXn3lpbE2vC4c5pu8ktQkGIlCHc+HZ3VkwtixbdTq9RzhkyyMKIqGQVDDeTikpr5UKoTYKkEl1luGSKvp62LI9/LyErhxvSqpJkb96ND1+zP/Mg9rVfpeu93Eyy8+cywwZNIujgKEYUafD5+92Wzhtde+hUsXzlduCd8wcZ1HehMQuKZgSqYZTGJOk1xClHy32xnUZZIkpdDhKEkgpZjc2a2wUubn58GNhFBQYzOMiubg/dLTmTJZ9T1nT5+auqdPsh6CwEeSxEfUoMXFBTz33FNjyTBR0Pi/ITxAiCEpZTv2sC0DnZzBn9WWynQQowutZjOaRnG8UXo4k1MpJ1DJhAy9ic1GI69XrZTuGVV13G/poGxvz9oQHWEubRsXL5ydydKZtMdmmU1lIozj3NnTaDTrFWatNTUw+IHhQcm8HQUhQLM2LMSidYhq6jqXaqKkVO5limQchOE2CqFOUsl8P3SrtoxMsVTa49lo1EAODqFU9cqdGngzo7nJGKvcm7ltodVs3FdjeN3UTYzNa9UOufFgq9VruaTMnjWr9y1N28hiENB9AUKqXMGllGJ+rg1qtu1hzsVRsBfnoDgXSqHH80Ubht0iILJ9PgxCtNrVVdoJpYAUoJRhvtPGnbVNAKYvxhjTc5bQ9en6A5tIy8Zxgl5/YKIC6YOW0jNvC5OCXrLMqUzxzIBzrAzzAktJKcVcVmFXmUatFVZelsaXOfkKEmcnlxC+H+yVGAqlWzgnExqV0II3kVCCpaVFMEYhpITnBWNNz1kipaYP9BAQVZT15tYOnnz8KmybnnjbKBJXxYns9Xo697Vib57dSrKO+HgyzV83Q5nM4hYBxChF2yxcQsnU3qtRFOZxH4Vn62ajFfcH3r5S5UzdOE6QSjmRvs5WACEE586eKZiecqzp+SAAMcpAjjs2t3dP7CPJcjUY40fEbpqmWF1br0zoPUkY3OiYZp7MaduKEIWsb0bRKnhcSUXEeaZIZtcWhe9QSvVzK2MwGPSL9DUAhFGM2NirVRcvDsCZUytD01MdNT0fhllW5Xbe2zvA+zc+PWGJAQW3VoNlO0fS+nZ2dvDFFzfHTpbFOTzDRZzkiOMY3W5vZqVbhygMaetWs1mamyrAJab2BiGklOSklNI6hFJKEkI8qZTPCGkUuYgoDCGEAK2ok5AhUSmFhYUF06B8mG9wlGZ9sIdlcbiuc2QQpZT46JMvUKs5eOWl56ZWdCsOMrdsuG79SGj+/t4efvvGm7i3sTn2XN2qQffOzLYExmgpiHZcHEIcxwiCcObxyUo7BoGPrKyTxRnq9cZUCyOTQKnpPVIsHyWVCoqjFCgpu6B0uUiL9npdJFEEp0I0U0pzB4l2g+sgz6yx6Ki4fRjHOEBkA/3OOzegpMLzzz2FxpTMMA0GC+32HGzHKUV9b25u4h9/9To+/uSzsdIh02eK14rjeOJWyxjLfQqzmtquO2zZmMS6nTXN/Rh2zlJWbV2MMfiDQQ7aQhdFpaTyioAYpEJsc86vYshnw/f9iR1zh4qXtsHrtRoo6UJ8QxICADrtFnq98al9YRzj92+/j7X1Tbz0/DM4e2YFjuMcTWghBPVaHfVmG5xzCJFCpAKDwQAfffwpfv/2u9idUCbZmdDJeBzwMstimpWi8zQ4LMsuxZXoeuRpbgs36rW8mq5WKGnlNYMwRJqm2u8ylBBKSFmSEF6SJDddx/nu6D40sYd0Hlyi6eSF+TncubdpdJCy6fmwAME5x/LSArZ39sbeq5QSa/c2sbm1jUajgceuXsG1Ry8bN7gD13Xh1BrgnCMMQ3gDD9u7u/j008/x1c3b6A+8idJtVDrQPFBF5UE3Vedlr8WtpVj+oJqDkNjfP8y3iPm5Ts5/kAnR5sUUzSQpMdFKjgAijqL483G1LMQ0tpIMI49Wloump5YujPNj29jHPZrNBpRSlcXOddSRRBx38fY7H+K9Dz4xxTXMBDJeIJQUUplWRliPTmq95pYmTymFer123xbHRA5CitxCIIRgoVBugBbmZPRes+BpQgiSNCk03YMUQkTFnt/ypRee+wI6P4MCuoLMtCAWSqlmxxItdleWl8AZQ5ykunhZHBtAPHySPyv4Oa0Cfh6Sdp/fl4FhlCLPwgIfZuCtjqUYRlsvLS4MUx9ZdYKSEALSeLCTVOQsGyE62JqOcASrRS5CmurqwYRe2aNcxKmV5ZxJVFLlQa1yTMe5PDD3RHxhNShWlhcf6uqcBIaiAn0/saLTjiyeIVuU7U67tAWN2zIopUjSFLFRKJM0GdaIUEqlaRqNAmIbpR6eCnGcoN/rTRmcoSm1MD9seKYyPWKMHkIIQavVOlG08rSdp9lsYHlp4aGAQoe6O2i3GlOdZxnB9FAAIdLcQmCm9wjyLjkTAmPiGFEUmmuUFqmfJElYmo0ojntSyh5jLHdeBGE0NZgly6FUUKjVG3BsK9+vwjzugYy1TprNJvr9/gMnrZrNhu7Yd8KGa+Mo6Xa7hVrNzf0AsxxRFOXNYh70loExwbWZUjlpu0yN1ViM/FIK234QJiVAhGEUSCnXGGPni3tOsRXCWHKq6PV0HZ24QwhEgYsYDcUvbjPNZtNUsZczSojZJoNzjsWFeSilsL9/gDCMkApxLPBpK0R36cmkmePYGAwGY0Ppxh26hQEtWSLHPTLLgzFtwXQPDnNxb3GOmqnQX+XlHDd2aen+1Z0gCCQv33gYCyG/tix8J/s/27Y1qpI0t3PHSgjj9bS4hU67BUK2jNTRpudo6l6R1shqY89aJui45muSJHkKfnnbUWi1hl1rhoNF8lIC4/gXxhg6nQ6CIEQQzNZKUkc2qYlV6CzLKpVWGHIKR+8hSuK8jFC95uYZW9MqCWd+DEIIVFlC3A6iSJbO9ANfCCnWS/a1zQ2Jkk6gQ2nuh2eMYWlhPpcInqcLY4y6gketDj3I7ZnK9h03UnkcY5hNuO8HJeYwW4WzFCyr1Vx0Ou2ZlWPP8ydGkmXtoibR3JmC7vu+qQmhM+OyGlnZ4pzk2MraZ4mSn0bd3NvbVyNKZaqEkPujCn0qxESHTXGyKSVYLoS7SymRmAkpsoPj/SK6pUK9Xn9gUiJTjCdNwv3EdzLG0G63Zy6Y5vsBfN8f+/xCiKn0fpokWLu7htW1jTw1plWo0UUZnZj1ncQJkiSBGOksoJS6A4w0gldKKSnFblGOCFOvMk3TSlFU8noSgsWFBVhc95VWUFhbX0ccRaU+DpNW+KjYHL8NzOYXqdIXiltYFEX37Wdx3UxaTLeawjBCv98fC+oq5VekKe6t3cPv3nwb79/4ZGghKKDTbuf6Dc2ClirmSYo0l7AjcR5bAMDHDOBqRk5l3fCklBBTFLGi6TnX6aDdrMPzAwgpsba+hc2tXV3J1bZh2zYcx4YwfPpoVJXe72vVBUkBE+/ozgCIiopxjTqCIMyjjweDAdrt9n2ZqlpatBBF0dSiJ2kq0O32UKvVSrqNEAJhGOXR03EUYWdnB3fu3sPu/v6RrZZQgk67lZdEIDPUyspo6+K1lFI7FYBIV5VSMSHEzWzVPNFkUhRvwevZajbRbjZw2Bug7wUAFJI0xcbWTp41nqXhLS0uoNmow3Vd48mzwbh2acdH+liXJURVzsi0rSXzNdi2nW+FUir0+4OZakRNOxxHV8UNwxBhONlEDYIAaZqg5rp51R7f80CIzmzb2Nw+AoRM0gopYVsc7VYz/z/G2USzM7tKUl7gqZBaVTgCiCRNNwD0suUXxbHp9iYmpk/qHk4UShLMLyzg8WtXIYTE7Xub+R6e9xWHTlJNhcDqvY08cZhRvcJazYap+WjnCTNZPQoCkjeCSNN0an3LsYEs5hzbthAEJB/sLNX+2LkclQ4vB5wxhGGIOIrN4hqm72XdghLDamYN0aQ0FfkKCddZS+elhTlce/QyarUaegMfr736Lbz6rZfBKEEcRxOztXR5JL3A4rTUcKabprpFBj9KpMQ9pdQqIWQlX4lSlqjS8RKCwXFd2LaD51/+Nn70s5/j7u1bePedd/D117dw+84d3Lx1Bzt7+/CDUCe0Fhqy6iThFHv7B9g/OEBWCTNL1c/KAxEKMELRaDRwsL8P27ZNQc+yZk4pASU098MUbXRiAAnoivnadNQDHwY+CKQpcyxz6aFMKKF20slCo9li70ud+JImKaI4RpLoYN9i1HXmEqii4UeHmBICx7bx1ONX8dOf/AgvvPAcLl66goXFJTDG0Wg2wCjFrZtf4NbNL/Ota9xcFTs2pwUjQSm1EZmBOgIIP/CFUupdAC8DOsdTSokoDCeSU4wxULeO02fOYWllRYeFLyzg2Rde1Im0vof9vV2sra3h7u3buHt3FV9+dRNf376Dze0deH5QAgmgIJWeOCKGw5ZlmPd933jWx/egJSjw+qScHs/yavrD3MtcepV+ymWIyqJXTaDQ1UwUew5Qc3+U0LxSreM46HQ6ePbpp/Dv/bv/DK+99hrm5+f1llDwWSilkCapbpcdx4iiCI5bG/dl2qlnFkiSlLaMmwPPE2MBcefumvqrv/zRrxhj/0Wm/EgpJ9rPRUuj3+8h8APUjdillMJxHTiug7n5eTxy9Vr+EFEU4vDwAPfW1nDnzh3c+voWPvv8c9y6s4qtrR0MfH9sarzC0EN35B1Vbhk9+Z5hiqSVwZa9zr49YISe13DU7TRJQW/R6fo109C2025jrtPB8vISzp0/hyuXL+PChQtYWFhAo9FEvVHXMRuuW4pNEUJACgkhEvS6XWxurOPOrVvoD/ro9z3U6nVYll3u8Gv0wTDUvMuIH+POjY8/lWMBYbaN645tCwBMCAEhFdI0GTJc4zrsgODwYB+rH3yALz//DGfOnkW700G73UGj2dIJLNzKRbplW7AdG612G+cvXMS3v/NajuB+r4eN9XWsra1iY30de3t7ODg8RLfbg+d56A0G8P1A170OdQxjYGI/hVRQpsyOlHLiKs9HqlgiYaTY6bDiQTm0vdjRmJrFwC0O13HQbDTQ6bSwvLSEleVlnDt3FqfPnMLC/CLm5ufRbLXRarfQbrVRb9RL/T8yKZzHLhiFPolj+L6Hw4MD7GxvYnt7C4O+hygMzeTm6XjY2d7C2XMX89jWnJQypZsopaOAyBuJVgAiWker2QcwJ02oViZSyRETUdd13dndxtrqKoQQ2NnZxs7ODiglee1J13XRanWwtLKM+fkFdObmUKvV4bhObrIyxlBvNFCr17Fy+jSee/FFY4MLo4hJU1klRhInCMMAQRCg3+vhsNuF73kIgxBhGCCKdAe7JIkRhRHiJMGg39cVYvoDBEGIKIpyMSuEVlBbzSZazSbq9RoYZ3Bsx9SbtsEtDotbsGydVMsZh20irhrNJtqdDhYXl7C4tIS5uTm4rgvG+BExX3wtblFSSkgh8zKJve4h9vb3sLOzjcP9A4RhkLe+miSttrd3MDe3gGarVbKysu8czRxLhfhqIiA83/eXsXgbwAsZ0ydNDGCR0MmIp82NDayv34NuYlauRpflZgRBgIODQ6yt3dX0MGWgnKHZbGFlZQXzC4uYm59Do65bKWeDmEkTCzqX0zW9w6uUpuLvOh1PFx7NWMAkiRFH2gUcxzHiSJcfjM3KcVxXm41mojnPwGDl3Wq08sqGwUHA1MSY0UkXQiAKAwSBj16vh0G/h263i+7hIcIo1LmlSQohj0fTE0KRpinW1tZw9bHHjkTLU0r14iqYsUmSrE4ExI2PPxX//Oc/+4AQ8kLmak3TFGmS5JG9hFBIKbBxbw2bW5ulULpJgS0ZOhMkQAT4noftrS3TX0KvpprrYn5hUa+0zjyaLQ0Szrnm6U2YOaFlET7qFMo8nrZjH1GIxynIxVVb5QsovndEtymAMMvjDIMA3mCAwaCHXq+Hg8MD9LtdhGE4NC+luO9KMqMKvjfoY2d7G6dOnwGUyC0kQy2ULJ0kSXcnAsKYRr9ihPynmXqWhYtnJk0SJ1i9ext7+/v33cEXKEQhx0Dg+9jfP8Ctr2+Cc2vIUzAKy7Jz4sep1eA6DmzHRc11YTua2HJsB8zisC1dIJVxnm9L+c8ImIoTWuQvspWkoCdag1oU6kIlSKIYfuBj0O+h1+2i1+tiMBiYZrTDzz/MwiFj5g8721tot9uo1Wp5vQhdFC4uas1hFEWDqYBIk+R3zHFSAFykAlEUYdDvY3F5Gb7n4c7tWzjsdh9iqFp5yykYxpMEpm6MTmhJUbMsnkeHc25pELkGRLajCSSTwp95doUQiOMIaZLkyTd5cm4qkIoUSZIWMrq/2QmfGtBDiSnLuIVLFy/Dsm3s7+3pep1+WLTB9vv9QTAVEN3+4O6K4xwCWApj7R37+uZXiOMYYRSi3x88AMnw4EGklSgx4jC6P8ZRfaNVQB7UQaCUxKDXx8bGBvb29vD551+g1+sjKKQ3KqW+3j88FFMB8dnnXwbLiwufEUK+r8PoUnjExzvvvoN6rY52p6OrqJDj2f5/asefHhiI6aERo9/3sH9wB73+O7k0O+oTSn7THwzUdAnR66nvv/bq/z4/1/m+EAK3VtfBGYNjcwy8AAPPR6ulYwzr9bphB3U/zyLT9/9HkPwxTX6xSUwYhjg47GFv/xB9U0h+SkfgeH1z65fFeJCJzvtev//e/FxHASBKaY9lYpJEe30fewddOLaFZlMHtTiOA8f4FnTSL9E1JIgWX5lW/efj5ABglICYllNxHGPghzjYP8Bht4cojmeO8wSgNja3/uuvb915UxZcqdOiObaVUgNCSGtUjAqlIKIYUZyg7wVg7AC2xeHaNmomX4FTBsKotultB9zi2o9Ah72wVAaSsXSx+rdiksf6YopmrxpaOX0vwGGvj/2Dru6Nmh7fXFVKddc3tv7mvQ9v/MI0zxl+96SLzc/PsWefeuK/bLda/z0h5DQwvedf5jzinMG2uH7lHJZtgZkW0YxxU2Pa1vGIhGrkE3LUNIT2XKoxnf7USK3m4aOoP+jkDuvCTyarcmrdpDlmLu/sd02kJRgMPHh+AD8IEMXJiSWtUio67Pb+9vXfv/XfAbipxvS0JrNc+MK5s9bS4sIjzWbzb5rNxn/OdZg+mWV4CNWTbVkcNuewLcu4s0kpzqHIBwA6tNwy0VWcDft9558FAWXUSBwNnMy0zDCRZ0c/wIkuOsEyEigTb8VJhVIQUhRc40MQF2tbx3GEJE4MI6n5nlRIEy8iEZsC6JO9q5NxIKX0e4PBr3/7xpv/M4BPDRjGXo0cF2mtZpMvLS6cX15e/PnSwsJ/xRh7bIatZwQkxJQBpuCU6Yk1k8sYzWsoFlf96F1SojvpcMZ0I1bT34NRHWTKLQvz83PGfYlCh1oct+mwbs2YBasUyCtCddR2FEYglBhKWMc+CCkgUu2RFIWAFyHkkMk0epXMKG2lht91cgBAKRVIKVfDMPr71998+3+JdcnJPoBETel0T+5HyWs1m3an3bqwvLz01wtzc3/jus6LlFIXE/vSVztlckra/OggF5IDKAuUyT+Tn6cDZ4bZzToPZG5+rjyBI5xClsys6z2qUr+wHEdZL1HjPc1Wd/Z+kug6XPk+LwvxFFJBFuCsvbAP1JRVUkpPCHEnFeL1KIr/bmd37/rnX361M8vkP3BAFI9mo2G3Ws0rC/Nzf7m4MP/v12q1pzljC5RS+/hrcjbwwLigc/AYDZwYXkQqWej5YV6z+Ids8vN4iLIoGhdn8YfmJ5RScZwkX3i+/3/3ur3/Z2Nz+9O9g4MegFQ9oBsiD+PBbNt2m436ldOnVv56eWnpX7mOc4UQMEKITSl1CCEWCGFEK6l/DC0+/zho1sKrUupQKfVOFMX/597+/j9sbm2v9gaDMAwjIbJ6xg9DLX7YSKeUEs45cyzLshyr5thOmzN2mlB6kVF22bb52Ua9frper59xbHuJc9ahlNUpJQ4hhBeAgz9h8CilVCyljJVSqVIqEkL6qUg3pZSfKKmuCyk/klKuCiEO4yQJB56X9np9tb2z+42KIvKHJIrIMDOVEUI4Y8y1Latt29YyY/y86zhXHMc+U6vXFuuuu+g4zqLFeZtz1qaMNSihLqHEIrr5CyOZrfcNA0cplfh+8Om99c3fCCESqaQ0ftJYCrUhpLgVRdGdNBU7hMAXQkSEUCGllL1+/4+KbCF/zMyhAQw1PxYhxLY4t23HrlncalJKFmzbvlCv1642G41HXcdZNEqtsiyrRSlxlVJpKkQohYyEFKGUSkApAaUgldT8WhR1lbYauDEhFWfcJlR3GZJSplIpH8AugLsA7pnfB2kiwjt3V/thFKUwzWigOxQJAFL9iVGz/98Aey8H94vaUFsAAAAASUVORK5CYII=';

function _templateObject3$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n  pointer-events: none;\n  height: 100%;\n  margin: auto;\n  width: 100%;\n  z-index: 2;\n  position: absolute;\n  filter: brightness(1.5);\n',
  ]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n  pointer-events: none;\n  height: 100%;\n  margin: auto;\n  width: 100%;\n  ',
    '\n',
  ]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$3() {
  var data = _taggedTemplateLiteralLoose([
    '\n  display: flex;\n  &:hover {\n    transition: 0.3s;\n    background: #b6b0aa;\n    border-radius: 5px;\n    border-bottom-left-radius: 10px;\n    border-bottom-right-radius: 10px;\n    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 1);\n  }\n',
  ]);

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
      containerWidth = _ref.containerWidth,
      currentState = _ref.currentState;
    return React__default.createElement(
      StyledIcon,
      {
        'data-testid': 'icon-container',
        containerWidth: containerWidth,
      },
      currentState === LOCKED_STATE &&
        React__default.createElement(LockImage, {
          src: img$1,
          alt: 'Locked',
        }),
      React__default.createElement(Image, {
        src: src,
        alt: title,
        onError: function onError(_ref2) {
          var currentTarget = _ref2.currentTarget;
          currentTarget.onerror = null; // prevents looping

          currentTarget.src = img$2;
        },
        selected: currentState === SELECTED_STATE,
      })
    );
  });
var StyledIcon =
  /*#__PURE__*/
  styled.div.attrs(function(props) {
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
  styled.img(
    /*#__PURE__*/
    _templateObject2$1(),
    function(props) {
      return (
        props.selected &&
        '\n    position: relative;\n    top: 2px;\n    left: 0;\n  '
      );
    }
  );
var LockImage =
  /*#__PURE__*/
  styled.img(
    /*#__PURE__*/
    _templateObject3$1()
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

function _templateObject14() {
  var data = _taggedTemplateLiteralLoose(['\n      color: ', ';\n    ']);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteralLoose(['\n  color: ', ';\n\n  ', ';\n']);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteralLoose([
    '\n  font-size: ',
    ';\n  text-overflow: ellipsis;\n  margin: 0;\n  overflow: hidden;\n  padding: 0 8px;\n  white-space: nowrap;\n\n  @media (min-width: 900px) {\n    font-size: ',
    ';\n  }\n',
  ]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteralLoose([
    '\n  align-items: center;\n  display: flex;\n  font-weight: 600;\n  justify-content: center;\n  height: ',
    ';\n  width: ',
    ';\n\n  @media (min-width: 900px) {\n    height: ',
    ';\n    width: ',
    ';\n  }\n',
  ]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background-color: black;\n  position: absolute;\n  padding: 5px 10px;\n  border-radius: 4px;\n  font-size: 14px;\n  bottom: -15px;\n  right: -25px;\n  z-index: 99;\n\n  @media (max-width: 900px) {\n    font-size: 12px;\n    bottom: -15px;\n  }\n',
  ]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background: #2a2936;\n  color: #31d0aa;\n  position: absolute;\n  left: -15px;\n  top: -10px;\n  z-index: 99;\n',
  ]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background-color: black;\n  position: absolute;\n  padding: 6px 4px;\n  border-radius: 50%;\n  font-size: 14px;\n  bottom: -15px;\n  right: 22%;\n  width: 35px;\n  z-index: 99;\n  font-weight: bold;\n  border: 2px solid darkgray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n',
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

function _templateObject5$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n      /* animation: ',
    ' 1s infinite alternate;\n      box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.5); */\n\n      &:after,\n      &:before {\n        border: 0 solid;\n        border-image-source: ',
    ";\n        border-image-slice: 1;\n        content: ' ';\n        opacity: 0;\n        height: 0;\n        transition: opacity 0.6s, width 0.6s, height 0.6s;\n        position: absolute;\n        width: 0;\n      }\n\n      &:after {\n        border-top: ",
    ';\n        border-left: ',
    ';\n        top: 0;\n        left: 0;\n      }\n\n      &:before {\n        bottom: 0px;\n        right: 0px;\n        border-bottom: ',
    ';\n        border-right: ',
    ';\n      }\n\n      /* &:hover,\n      &:focus {\n        animation: none;\n        box-shadow: 0 0 12px 0 rgba(255, 255, 255, 1);\n\n        &:after,\n        &:before {\n          opacity: 1;\n          height: 85%;\n          transition: width 0.6s, height 0.6s;\n          width: ',
    ';\n        }\n      } */\n    ',
  ]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$1() {
  var data = _taggedTemplateLiteralLoose([
    '\n      position: relative;\n      border-radius: 50% / 10%;\n      color: white;\n      width: 65px;\n      height: 72px;\n      text-align: center;\n      text-indent: 0.1em;\n      animation: ',
    ' 1s 1;\n      background: ',
    ";\n\n      &:before {\n        content: '';\n        position: absolute;\n        top: 10%;\n        bottom: 10%;\n        right: -5%;\n        left: -5%;\n        background: inherit;\n        border-radius: 4% / 50%;\n      }\n    ",
  ]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$2() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background: ',
    ';\n  padding: 2px 0;\n  border-color: ',
    ';\n  box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0);\n  border-radius: ',
    ';\n  cursor: pointer;\n  display: flex;\n  margin: 0 3px;\n  outline: none;\n  position: relative;\n  transition: box-shadow 0.6s, opacity 1s;\n  user-select: none;\n  z-index: 98;\n  \n  @media (min-width: 410px) {\n    margin: 0 8px;\n  }\n\n  @media (min-width: 900px) {\n    margin: 0 16px;\n    outline: initial;\n    outline-color: white;\n  }\n\n  ',
    '\n\n  ',
    '\n\n    ',
    '\n\n  ',
    '\n',
  ]);

  _templateObject3$2 = function _templateObject3() {
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
  forwardRef(function Node(props, ref) {
    var handleClick = props.handleClick,
      handleRightClick = props.handleRightClick,
      id = props.id,
      currentState = props.currentState,
      skill = props.skill,
      learned = props.learned,
      isOwner = props.isOwner; // console.log('Skill', skill);

    var _skill$color = skill.color,
      color = _skill$color === void 0 ? 'default' : _skill$color;

    var _React$useState = useState(false),
      isIOS = _React$useState[0],
      setIsIOS = _React$useState[1];

    var isMobile = useMobile();
    var memoizedHandleKeyDown = useCallback(
      function handleKeyDown(e) {
        if (e.keyCode === 13) {
          handleClick();
        }
      },
      [handleClick]
    );
    useEffect(function() {
      setIsIOS(isIOSDevice());
    }, []);

    var checkForClickType = function checkForClickType(e) {
      e.preventDefault();
      if (isMobile || !isOwner) return;

      if (e.button === 0) {
        handleClick();
      } else if (e.button === 2) {
        handleRightClick();
      }
    };

    return createElement(
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
        ? createElement(
            IconNode,
            null,
            skill.availableInGame &&
              createElement(
                AvailableInGameNode,
                null,
                createElement(CheckBoxIcon, null)
              ),
            createElement(Icon, {
              title: 'node-icon',
              src: skill.icon,
              currentState: currentState,
              containerWidth: 64,
            }),
            createElement(LevelNode, null, learned, '/', skill.levels.length)
          )
        : createElement(
            TextNode,
            null,
            color === 'default'
              ? createElement(
                  Fragment,
                  null,
                  createElement(Text, null, skill.title),
                  createElement(
                    TextLevelNode,
                    null,
                    learned,
                    '/',
                    skill.levels.length
                  )
                )
              : createElement(
                  Fragment,
                  null,
                  createElement(
                    AlternativeText,
                    {
                      selected: currentState === SELECTED_STATE,
                    },
                    skill.title
                  ),
                  createElement(
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
  styled.div(
    /*#__PURE__*/
    _templateObject3$2(),
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
          _templateObject5$1(),
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
  styled.div(
    /*#__PURE__*/
    _templateObject7(),
    function(_ref11) {
      var theme = _ref11.theme;
      return theme.nodeIconNodeWidth;
    }
  );
var LevelNode =
  /*#__PURE__*/
  styled.div(
    /*#__PURE__*/
    _templateObject8()
  );
var AvailableInGameNode =
  /*#__PURE__*/
  styled.div(
    /*#__PURE__*/
    _templateObject9()
  );
var TextLevelNode =
  /*#__PURE__*/
  styled.div(
    /*#__PURE__*/
    _templateObject10()
  );
var TextNode =
  /*#__PURE__*/
  styled.div(
    /*#__PURE__*/
    _templateObject11(),
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
  styled.p(
    /*#__PURE__*/
    _templateObject12(),
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
  styled(Text)(
    /*#__PURE__*/
    _templateObject13(),
    function(_ref18) {
      var theme = _ref18.theme;
      return theme.nodeAlternativeFontColor;
    },
    function(props) {
      return (
        props.selected &&
        css(_templateObject14(), function(_ref19) {
          var theme = _ref19.theme;
          return theme.nodeAltenativeActiveFontColor;
        })
      );
    }
  );

function _templateObject2$3() {
  var data = _taggedTemplateLiteralLoose([
    '\n  display: flex;\n  justify-content: center;\n  position: relative;\n  column-gap: 50px;\n',
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
    isOwner = _ref.isOwner,
    handleLearnedChange = _ref.handleLearnedChange,
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
    optional = skill.optional,
    type = skill.type;

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

        if (learned === skill.levels.length - 1) {
          handleNodeSelect(id, SELECTED_STATE, skill, learned + 1);
          return updateSkillState(id, SELECTED_STATE, learned + 1, optional);
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
    var throttledHandleResize = throttle(handleResize, 200);
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
          type: type,
          isOwner: isOwner,
          handleSelect: handleClick,
          handleRemove: handleRightClick,
          currentState: nodeState,
        },
        React__default.createElement(Node, {
          handleClick: handleClick,
          handleRightClick: handleRightClick,
          id: id,
          isOwner: isOwner,
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
            isOwner: isOwner,
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
  styled.div(
    /*#__PURE__*/
    _templateObject$5()
  );
var SkillTreeSegmentWrapper =
  /*#__PURE__*/
  styled.div(
    /*#__PURE__*/
    _templateObject2$3()
  );

function _templateObject4$2() {
  var data = _taggedTemplateLiteralLoose([
    '\n      border: 1px solid #31d0aa;\n      animation: ',
    ' 1.2s 1 ease-out;\n      background-position: left bottom;\n    ',
  ]);

  _templateObject4$2 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$3() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background: linear-gradient(\n    to right,\n    rgba(49, 208, 170, 1) 0%,\n    rgba(49, 208, 170, 1) 50%,\n    rgba(49, 208, 170, 0) 51%,\n    rgba(49, 208, 170, 0) 100%\n  );\n  background-size: 210% 100%;\n  background-position: right top;\n  border: ',
    ';\n  height: 4px;\n  opacity: 1;\n  transform: rotate(90deg);\n  transform-origin: 0 0;\n  width: 56px;\n\n  ',
    '\n  ',
    '\n',
  ]);

  _templateObject3$3 = function _templateObject3() {
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
  styled.div(
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
  styled.div(
    /*#__PURE__*/
    _templateObject3$3(),
    function(_ref2) {
      var theme = _ref2.theme;
      return theme.edgeBorder;
    },
    function(props) {
      return !props.selected && '\n    background: #444165;\n    ';
    },
    function(props) {
      return props.selected && css$1(_templateObject4$2(), slidedown);
    }
  );

function _templateObject$7() {
  var data = _taggedTemplateLiteralLoose([
    '\n  background: linear-gradient(\n    to right,\n    rgba(49, 208, 170, 1) 0%,\n    rgba(49, 208, 170, 1) 50%,\n    rgba(49, 208, 170, 0) 51%,\n    rgba(49, 208, 170, 0) 100%\n  );\n  background-size: 210% 100%;\n  background-position: right top;\n  border: ',
    ';\n  height: 4px;\n  position: absolute;\n  opacity: 1;\n  transition: opacity 0.6s;\n',
  ]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var StyledAngledLine =
  /*#__PURE__*/
  styled.div(
    /*#__PURE__*/
    _templateObject$7(),
    function(_ref) {
      var theme = _ref.theme;
      return theme.edgeBorder;
    }
  );

function _templateObject4$3() {
  var data = _taggedTemplateLiteralLoose([
    '\n  from,\n  33% {\n    background-position: right top;\n  }\n\n  to {\n    background-position: left bottom;\n  }\n',
  ]);

  _templateObject4$3 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$4() {
  var data = _taggedTemplateLiteralLoose([
    '\n        z-index: 93;\n        border: 1px solid #31d0aa;\n        animation: ',
    ' 0.3s 1 ease-in;\n        background-position: left bottom;\n      ',
  ]);

  _templateObject3$4 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$5() {
  var data = _taggedTemplateLiteralLoose([
    '\n      z-index: 93;\n      border: 1px solid #31d0aa;\n      animation: ',
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
    '\n\n  ',
    '\n\n    ',
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
  styled(StyledAngledLine)(
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
        !props.selected &&
        props.direction === 'left' &&
        '\n      background: #444165;\n      '
      );
    },
    function(props) {
      return (
        props.selected &&
        props.direction === 'left' &&
        css$2(_templateObject2$5(), slideDownAngledLineTop)
      );
    },
    function(props) {
      return (
        props.selected &&
        props.direction === 'right' &&
        css$2(_templateObject3$4(), slideDownAngledLineTop)
      );
    }
  );
var slideDownAngledLineTop =
  /*#__PURE__*/
  keyframes$2(
    /*#__PURE__*/
    _templateObject4$3()
  );

function _templateObject3$5() {
  var data = _taggedTemplateLiteralLoose([
    '\n  from,\n  30% {\n    background-position: right top;\n  }\n\n  to {\n    background-position: left bottom;\n  }\n',
  ]);

  _templateObject3$5 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$6() {
  var data = _taggedTemplateLiteralLoose([
    '\n      border: 1px solid #31d0aa;\n      animation: ',
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
    '\n  ',
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
      ? parentPosition - childPosition - 6 + 5
      : childPosition - parentPosition - 6 + 4;
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
  styled(StyledAngledLine)(
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
      return !props.selected && '\n    background: #444165;\n    ';
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
    _templateObject3$5()
  );

function _templateObject3$6() {
  var data = _taggedTemplateLiteralLoose([
    '\n  from,\n  70% {\n    background-position: right top;\n  }\n\n  to {\n    background-position: left bottom;\n  }\n',
  ]);

  _templateObject3$6 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$7() {
  var data = _taggedTemplateLiteralLoose([
    '\n        border: 1px solid #31d0aa;\n        animation: ',
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
    '\n    ',
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
  styled(StyledAngledLine)(
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
      return !props.selected && '\n      background: #444165;\n      ';
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
    _templateObject3$6()
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

  var _useState = useState(0),
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

  useEffect(function() {
    var throttledHandleResize = throttle(calculatePosition, 200);
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
  createContext({
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
          var resettedSkills = mapValues(skills, function(skill) {
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
      return createElement(
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
  })(Component);
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
    skillPoint = _ref.skillPoint,
    isOwner = _ref.isOwner;

  var _useContext = useContext(SkillContext),
    mounting = _useContext.mounting,
    skills = _useContext.skills,
    updateSkillState = _useContext.updateSkillState,
    decrementSelectedCount = _useContext.decrementSelectedCount,
    incrementSelectedCount = _useContext.incrementSelectedCount,
    handleNodeSelect = _useContext.handleNodeSelect,
    handleNodeRemove = _useContext.handleNodeRemove;

  var skillNodeRef = useRef(null);

  var _React$useState = React__default.useState(skill.learned),
    learned = _React$useState[0],
    setLearned = _React$useState[1];

  var nodeState = skills[skill.id] ? skills[skill.id].nodeState : 'locked';
  var childrenLearnedState = skill.children.map(function(child) {
    return skills[child.id];
  });
  useEffect(
    function() {
      setLearned(skill.learned);
    },
    [skill.learned]
  );
  useEffect(
    function() {
      if (mounting) return;

      if (nodeState === SELECTED_STATE && !shouldBeUnlocked) {
        return updateSkillState(
          skill.id,
          LOCKED_STATE,
          skill.learned,
          skill.optional
        );
      }

      if (nodeState === UNLOCKED_STATE && !shouldBeUnlocked) {
        setLearned(skill.learned);
        return updateSkillState(
          skill.id,
          LOCKED_STATE,
          skill.learned,
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
          skill.learned,
          skill.optional
        );
      }

      if (nodeState === SELECTED_STATE && shouldBeUnlocked && learned === 0) {
        return updateSkillState(
          skill.id,
          UNLOCKED_STATE,
          skill.learned,
          skill.optional
        );
      }
    },
    [nodeState, shouldBeUnlocked, mounting, learned, childrenLearnedState]
  );
  useEffect(
    function() {
      if (mounting) return;

      if (isEmpty(skills)) {
        return updateSkillState(skill.id, UNLOCKED_STATE, skill.learned);
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
        incSkillCount: useCallback(incrementSelectedCount, []),
        decSkillCount: useCallback(decrementSelectedCount, []),
        updateSkillState: updateSkillState,
        currentLevel: currentLevel,
        skill: skill,
        learned: learned,
        skillPoint: skillPoint,
        isOwner: isOwner,
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
  return createElement(
    'div',
    {
      style: {
        height: '2px',
      },
    },
    display &&
      createElement('hr', {
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

  var _useState = useState(isVisible),
    hasBeenVisible = _useState[0],
    setHasBeenVisibleState = _useState[1];

  useEffect(
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
  styled.div(
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

  var _useContext = useContext(AppContext),
    addToSkillCount = _useContext.addToSkillCount;

  var _useContext2 = useContext(SkillContext),
    setSkillCount = _useContext2.setSkillCount;

  useEffect(function() {
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

function _templateObject5$2() {
  var data = _taggedTemplateLiteralLoose([
    '\n      transform: rotate(180deg);\n    ',
  ]);

  _templateObject5$2 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$4() {
  var data = _taggedTemplateLiteralLoose([
    '\n  color: ',
    ';\n  display: ',
    ';\n  font-family: ',
    ';\n  font-size: ',
    ';\n  left: 8px;\n  position: absolute;\n  transform: rotate(90deg);\n  transition: 0.15s transform ease-out;\n\n  ',
    '\n',
  ]);

  _templateObject4$4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$7() {
  var data = _taggedTemplateLiteralLoose([
    '\n      background: ',
    ';\n      border: ',
    ';\n      border-radius: ',
    ';\n      cursor: pointer;\n      min-width: 300px;\n      transition: ',
    ';\n      user-select: none;\n\n      &:hover {\n        background: ',
    ';\n      }\n    ',
  ]);

  _templateObject3$7 = function _templateObject3() {
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

  var _useContext = useContext(ThemeContext),
    tooltipZIndex = _useContext.tooltipZIndex;

  var memoizedHandleKeyDown = useCallback(
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
  styled.div(
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
          _templateObject3$7(),
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
  styled.span(
    /*#__PURE__*/
    _templateObject4$4(),
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
      return isVisible && css$6(_templateObject5$2());
    }
  );
var StyledTippy$1 =
  /*#__PURE__*/
  styled(Tippy)(
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
  styled.h2(
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

  var _useContext = useContext(FilterContext),
    addToSkillMap = _useContext.addToSkillMap;

  useEffect(function() {
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

  var _useContext = useContext(FilterContext),
    filtersMatches = _useContext.filtersMatches;

  var _useState = useState(false),
    hasLoaded = _useState[0],
    setLoadingState = _useState[1];

  useEffect(
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
    isOwner = _ref.isOwner,
    handleSave = _ref.handleSave,
    handleNodeSelect = _ref.handleNodeSelect,
    handleNodeRemove = _ref.handleNodeRemove,
    _ref$collapsible = _ref.collapsible,
    collapsible = _ref$collapsible === void 0 ? false : _ref$collapsible,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  var isMobile = useMobile();
  var initialVisibility = closedByDefault || disabled ? false : true;

  var _useState = useState(initialVisibility),
    isVisible = _useState[0],
    setVisibility = _useState[1];

  var memoizedToggleVisibility = useCallback(
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
                  isOwner: isOwner,
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
  styled.div(
    /*#__PURE__*/
    _templateObject$d(),
    function(_ref2) {
      var theme = _ref2.theme;
      return theme.backgroundColor;
    }
  );
var StyledSkillTree =
  /*#__PURE__*/
  styled.div(
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

export { SkillProvider, SkillTree, SkillTreeGroup };
//# sourceMappingURL=beautiful-skill-tree.esm.js.map
