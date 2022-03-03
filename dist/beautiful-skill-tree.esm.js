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
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABvCAIAAACLjsJzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAG6BJREFUeNrMXVmXHMWVji0jt8qq3iW1dpAESEgYvDC2MRgvZ+bXzsO8zZzj8QxgDEhiE4sByxJaW+q1KvfIWOYhukvZuURmdat9Jh4Ep7u6MuPLG3f57pLwt2//2nVd26Zgb0kpoyhWSgkhGGN5zqSUYMblea7jOJ0fU0qlaZbnuVIKHHRRSn3fgxBOf2LbtM/VAQAPHz5mjBk+YNvU9/223+Krr162LKv8IwghxoRzDiG0LMtxHEIsCKFSqv8mi4JLqSi1zB/bu4QNAOCcHww+IYQQoiwBQghCMELI/IdJkkwmYef369trhu/yKy/Vf4oQsixLCKHxwhhRajmOgzGWUkqpeu6qKLhlWWW5MIBIKeWcH0wM9V2VnxbnnFJquHRR8DRNsyzvPB+O47R9D375pYttW6KU6iP87NMY27ZNKdXo9NkVYwUhpFMQ9DOzbSql7PPNjU8LAGhZpLwJQkjbh5MkVUp1wqelrw2+jl25ruO6bhVyjH3fGw6HbTdXQTAMo6LodTAhhIOBbzgs5pWmaZ4/g4OxvPGgKKU0dv1Fu/WR91DM1mDg18WHEDwcBp7n9rEPURQxVvQ2O15PxV9fcZxMdahSgLG8hoWK43gmY3go+LS4DQY+xqhJsJ3RaNh5NpVScRz3Nw49DXfjiqJn6FTcBiFEHMdCzOZIGOQUX7zwgupaU3PRqJUQQrZtSyk6b4uxwrJ66UEAgLY5PU99ZbdSKq2g9T3r/y+KIo6TMhY9dR+lVpuaIlEUg0MvCOFgMEjTLE1T88bCMAqCQR+lqUUbY6yd0JnuhzHGGNWGWAgRRTEhpKwWn9dCz/G7XNcZDPxO0QjDqCj66kHLsobDACF4ADNSPrNHgd1zhk8HAMNhYHb0lFJRFPf3TjDGw+EQYzyrH9MJ2SEinaOBDwBACOkpg/3NH0JoOAym6qy3AGbmU6+U/H8Hnz5xvu/18QebtP6+NTVfAADf92zb7i8yUsokMeniA4eJz2QFHM2ybVsIYbZrQogkSSil40mYZXkfI9gk7JhgYttWo0HP89zz3DZl0t8V7QWfUopzzrkoPXxZftoQQoQQxpgQrJdBzbmuy1hROaFSyjwvuOCci+fynDgXnItsT83V0cxz1hjGSCmfg/QppYqCc14UBe9U5/pwcc6nSnkKpWVZFe0OIXQcJ0mSo0CtE01CMMHYtiljzfDlOXsOin57e+cwf6/JIq2pNU9j23Tq1tk2jeM4y/KcFerwdm52HHNW2JS5rlMh5bRvePir4OPHVp7XHWt6Js+Z1ilSyvEkHE+io5a4DhyFmISRVJJaz0405zzLst7eWHvUcRR3XBRFFCU5YzNJHEKIEkIowQgDCJQCSkrOxfRLFFDPnhMXCoCKajY8152dyWQSDYeD0TAghPTH7p9teRkrki6HCwAAAYAIEUIcx3Zth9rWaDRcWpxfXFgIgoHjOL7v7bGzUutc/Z2ci+2dne3tMcvzR2tPHq895UUhpOKcC86V0Y/RIC4uzB3eaOzCFwSBplKUUpwLbUQOkNzojx0hxPfcxcWFleXFk6snjh9fmZ+fp5YFIMQIQYQQhABC/W8D46HUqVMnNRNeFEWWZXnOwih6cP/hnbv3njzdyBnjnLdtQUq5sbntuU5nIqFsA1t/9e47bzWdPp7n+azK1YwdQsjznOMrK6dPn7x08cWVlSXLooQQs/fTW+1KxlgUxTs746cbm99/98OdHx9kWdYGIoRQI4gQcl2HUhpFcVskHgSDuuUxwTdVYXGc9JREA3YIofm54cmTq69dvXzq5EnPdymlEKIjshVCiHAyuXvv/nff/fDD7TtR1LqFYOAvLS1M7UkblzEatUbc+Py5M3XRy7IsSZL++UMDdp7nvfLShd+9+9bPf/r6yVOrnucRQg4vbmYT5LjusWMr58+dXZgfaWqeNeGi8zCObZclpkFOvdYA9Bl8Qog0zeI4zvN8mmM7DHYIoZWVpd/86hdvv/2r1dVV23GOTuIajyel9MTx42fPnPJ9L4zCuCm/kSQpxlgjiBCsB44IIQPvjc+fO1MUPEmSJEkPkOJqw44QcuGFs7//3W9eu3bNdb0jFTczio7nrZ44trw0n6bpeDKpU+JJkhKMbduGELKae08IKWeQq/AtLS6kaXowU2vA7idXL//bv/7+7JlzPan5I10I44WFxdXjSwDAjc2tegIgSVKLENumpSDqGfexP/m5H77lpcWD3ZOUMoobjgOl5Nqrr/zxD+8uLS3NHLWUTamUUnDOCyG4EFyIQggupNCuMuxyKRpUmD9YWVrwXGd9fSurMalJmlkWwRhXXELXdQxM7cHd5jwvWuTuyru/e3thYaEvaFJnxoUUQkipKwaEkIJzIXiJ0dRIKQggxNiyKLWoZVkIWwijPjgiiEbzi1dfvUKI9d5fPt7eHlee3frG1vLSQgX0NpflUDEvY0Vai3sQQi9ferGn3CmllBR5nidJGEVhGsd5njGWM8aKohB71RqwtgCEQCnOC8byLEsZy3Sw8ewDJgSh63lLiwu+5zx89LhCuuikIiG4dJKomeLuCx9CCCGEMUIIKQDCsCE/d+b06h9//9vV1dXOXIcUPEmTKJxkacQL3gxT12HUn1FSFgVjWcJYBhHu4xVR215ZXiEE37v/sHJUuRCUPivKcRzbnBRshg9CqKNR23Y8z9Vpf8ex9UqShsqa+bnRH3739sVLF822QimVZWk43skzrTfh4Y2yFkklZZFnUilCrE57hTFeWlyIoujx4ycVFQQBmNqKSt1bh+6zdhcxp7Xq2DmO/eYvXn/p5Uvm+xZCZGkcRyFQJq2vAABKafpWKaW/UylFLEJMER5UACRxJDj3B4HVlVfyff/Nn79x9+79J0/X9+l0Vtg21aR652MgU8/QtmkfQSgKXofvxfNn3/jJT2xqG7HjcTRJ0wQCCGCzYOaM7exMtnfGYRRPJmGSZEpJjDGESCk5GPgry4tBMBj4/mg4aNwbhCDPUyXFYDiyaEep0crKytUrL29sbpadQaVUnheuaxvcvWfw+b7f53PTVa8npJReu3p5OBoaQWdROClY1oiclHJ7Z/zw0ZPHa09v37mv+X3DWl5efPWVi+fPnp6bG9Uz6BBCVrAomgyCkWVRIw9Kr1x5+dbXf6sIIBccANtsc3fhmwm7xpN74YWz58+b3GPOWRROWJ7VpVspNQmjv9/+8fNb31Q8CcNaX9/88/rmjeCrd9568+KLZ+uqBkLI8jwC42A4b9b9S0tLL75w9un6RlkDci50Iuw506VKqYrDSQi5cvnlIAgMZzYKJ4zldew45/fuP3r/rzfW1zcPYDHCMPqvP70vpXj50oVmGczzNAn9wcjwaC2LrJ44blmkkrQ0RBr7HJLD0q0Yrxxbbrs/KWUchnme1U9sluc3Prv17//xnwfDbs/9ZJ/c+GIShm0WOU0SxjIj6Q0XFxfmRqO6aX7+8NXDDEyI3V5CnGfprq2oMYnXb3z5wYc3Dh/PTsLw8drTNn5IKVWYUy4QDgb+3Nyw9uNeyJDOwFbnGYSQOt9QD7nalEtRFHEcAqDAfviUUrfv3Lv+6ZcGp4wQTC0LQmBZ1rQ6WEoZRnGltIMxPp6EUso2eYFdzgcEsNkVOBh8uzlzLup17vWnKKTQTBfUOO0FA1KpLIkE53XBjOLk+o0vGjmeYTAIAj/L8vJvp8YtTRvId0qJ77U7t0ph1HEMpZJCiroD1Lk456Tk7DDGmDkFVf/SouAff3Lj3LmzhGCllOu6nutYxJJKZkkMEUQQIoQgghhhjFGes2++/eFJTd8NBv5oFGja0rKsySTcy6vxzc3tLG+tgCGEzo2CNuWrAECog1DgXAguG4SyayVJSoqi0MD1FVeCy2lvKeX1m198+vktjZJlEc9xKaUIQQUBRohgjPBuvYTj2ONx+OP9B/WAemFhztpTAhjjIAi2t3eyPC+Kjk6PudFgfm5kOJnIKH1KqSiOoySu3RLstFqcc1KvEus0tfWqASEkAFIzMXGczqpBlpcWpthxzvsXXHme97PXrxmK4ToDLynl2pMn9QrlznAtTbNW06FbsBp/Zdv0+RasjEbBtJwyiuL1ja2e1Pfi4vzbv/r5+XOn286mlNJzBh1hOOd3796vlwuZzztjTJPSZEoWkN2FIYSTSdimBBFCnuv0qSPoSZYMh4HWoZNJuDOe9Pmrs2dOnjxx7OKF80uL84371ESD47i+PzBb3vF4cv/B48oD6+zL0aIHACCe51XIgjRNzQaEUosQnOfskGIIIVxaWqCWFUbxxsamuVUOIbR6YmX1xLGlxfnTp1YHLVSSUgpBaFHbdlzX8xDChjvM8/zGp58nNcVnhk9nInfhq3w0z/MptObNuK7j+35RFKwoZi0M1WZkOAyoZYVhtL6xZdjk8vLimVMnVpaXTq4eGwath1EpBRGiFrVt23Y9Qixg7GhRSv3jzt2PPr5Zyb0hhEZDQwwqygW/pIJdHCf97C/RJTwlf1DTdLrqqfSDvX+1+60LKad2bRJGGxubjXtECJ05vXr29MlzZ08tzI/MUZRSihDLcT3H8YhFzMDptbm5+d//8349ZzQcmtpOKo01pHxm+8gdxtjz3FoL8K6jBCEAoG8HgT6zjds8fmz5yisXL14477dXJpfVnG07rj+wqQ3ajd5+3ij74MNPfvyxwYUatotemmZltQYh3H1QcRz3qZN2HNt13eeS8y4K3ogdIeT11y6/dvWVYdCjG0YpQojjeq43wBhrIe+D3Xvv/eXGzc/qurjsQtVj0ErPlO97RDepdLb56CbUns1UPWnXuq1wHPudt9585aUXuy+klIKAUtvzA9txYD+hk1JsbW1/8MFHH358o9H9bOtI4VxUfEOdhCOTSdhZm+E4jus6z7HQoiiKcY219jzv97/95aUL5zsvpJSCADqO6/uBRWnPKQF5nt2+fefDj65//8M/mqKXYRAM2i4Xx/v66rQwAQCIGTsIoe97s7bzdK7xJKqXkvz6X17viR2CyPF93w92D2y30Mnxzs71G59d//Tz8Tg0uJ9t5qKC0mDg6/skZu8kCAazNpNJKTVbo0s86yGElHJSSxOfPnn84oUX+mCHCXFd3/MHCKFO7KSUcRzfu3f/kxufffu3H9pEZHlpsY1eTpK0Qgh4njvFhBiUXRAMehb46DpZzgVj3VNL6tUdDqVXLr/kuk633GHs+4Hr+QB0KDsp5WQyefTo8a2vv/3bd7fjuLnvdjgczI1GbdhlWV4pIqd034gTckjsOOd5ns/UYsJFNaSZmx+dXD0Gu7AjmHiDget5ZkMhpUyT5O6P9z658dm9+4/agAMAzM+PFubnDAq6nvODEDDGlFJCSCE4aTyzfZpKdU32ASrb6oTNieMrbkfrvUIIu37g+j5slzulVJqmd+/++MWtr/9++05jJUnZzg6N0UVjo3ies7KskLoiCIKBATvGGGOsk4Yz4F4zuM7pkycaByWUojHoep7reQbshOBra08+/uTmra+/M0gcAGA4DEbDwFBZL6WMoqjPBkkduzZbURTFwSpQO+Jfavt+hytOqeN6PkK4rQM3y7Ivv/zq4+uf3n/wqINbXF4ctjgoU7nr32tMKjal0V/V9mumqQw6zYwQ0sOQpjkQIeROzXUwYqcwxo7rEWK1YccYe+/9D9//y0dmFew49tLivG3bZlUehlH/g0XKNqXxqxljSdKrepcQYlkWIa1VYrqBd9akgkVtg+MphPjy1lfvffBXQ9Bp29Rznbm5kdkY9mdMAACEYNd1ScWNru+2j9BhjD3PM2TmlVJxnDDGZFMBfpv0KaUQwpTaGJM2iUiS5NPPvmzDzrapTSmlVqcjkSRJT9qNEDJt0SQVN7qsTcyd7OWQzjxLqFObGDaGMSbGUp3JJJxMojbgMEYYIzN2ejZOZ9snQsiyiG3vK5gkWimUzUVPEkF/o+975kqkLMvTtFRBXpMhBJEhS4uMpTo6Gi1q3LjvudqwIoSCIDAwrFmWtdF0ukZU5+zbppgRhFB5yFee5z3HY3XyCD0NDoLAnKU1BWdKKaBQTX1qNaKH87R9eZtO103duoe3M4gkUwj6azoAgGVZWkj3NqGkVPpW9LchhKYtpDVMKk8ZGW5yrxYctOGrpJJNv96bu4X7eGAIIW33+s+I2oVPW1vGWIWG7mSczI5xf/cQQnBgKgxBaFlWXfowJobACULouo5SSk+20OsAV0/TjOj/mGdPHelCCJkqdDSBDFEjjSykiJOES14nAgyP5PCk79SRIP0NtsEDIsTCGM00U7AEH4SoVUx0lxQhSO3NShBCSCk5L9Ike7q+8eWtb+oewpG20HHOpzPuyMGwwxhTaunkOtgbCXSwKBghhNqL6YqiyLO0wDyO4+3tnY3NrbXHTza3tjOWs5wlaZokaUVfO7Z9dPBVXOvZxBhCaNu2bdO6o9NT2eHawcEYT6VvmtbkXCRpujMO19c3Nza3WcGTNEmSzOBnlIOzowBOSpkkScU/nwG++njkKR/bf7KCU4sLC87DKCIER1GyvrH5dH1ze3tS8CLN8izL+7ezT42JgYY68GozraSn0A0GfqN7rOnS3kce1UXj6dPNP/35rxYlaZolcZoeYkQIgnBpebFnVXfPpcsK2jyN7itZluX7fmPKteT69VqWRSGEtk3L1AhjrNJWUY7kEEIIQSlVZ4O7xi7omn3X/6hqZtMczHWkijzPM9CKjdWy5icBAHAdx8AsUUqPryydO3dqcX7OtqllWY7jKgDjJJlMwh/+/o9/3LnXqCukUhsbWxCAwSEQLIqiKHSaq5c6Ioat1nmEiujNNNFSh9wGhsp1nFevXHrp4gtBMHBsqpkYpZRFqR+MqEU5L167emVza+vHew9u3vxifXOrLjLrG1udbZCVP9HTzYXg5YlFM/N9++kKu3N+YTpjiZ8WPcbYzk5DEd+lC+d/9sbVleXFys4hhAUrkjBEwZDajjVPR3NzZ86cuXjhxQ8/+uSzz7+qD7gbT8LFhfkWl01IKXbbr4WcaeJFszavN6Q6jt1j9qMy5xMahMt1McZb2+P6yb326svvvPXm4sJ8W5ef3jMhuzPuMMbDYXDu7BmE4L37DyoQ5DmDcHeSj14635gkaZ7njO2O2jvwpCQTfH3kTnuP/affgr1qBc75+sZWXe7eeevNzosKyaWQlmUhjMHenJHjx5dZxh4+XqsgKKXECOnxV9MBnkcScc4qd2DvJRszBnYEQlivzRgOBz99/dU+FwUKsDzN9pqo91je4Je//PnZ06fqh/SfFLCXsTOMy6n4kLM+TG006mPfVo8fa9NTjbY1TZOiYGV7tri4cO3a5Yo3LoT45wxbRNOwvyd2oKkntSc/WNF6DqVnTq/ONMmMFwXnRYWbOrl63B94NQfIOuppT7uWV7OyM1n6WUkBPYmvem1qBQN/pslMSim531zC3baA6jNwPZdgPL1h3ZYnpZRSTJndQy7XdQgAwMBoN53cmYf16tEedUFgrJiEkVLyMLOtVNfw70Y2dDojeMqAzaSOpnV7ZDDwZwoSZzK4exvAe2xNNVxbe7L+yksXKEX973vqTk+BmEwmWZbWYzjz9+ipF+VTpeW0M5QqpwHQrKWPB4CvHFdUfrL2dKN/1KzTvhiTcuDCOb//4FG9GmhW/h1CqGkVM3a6n2LK1812jUM6BHUqaXNz+/Nb3/aub1OO61rULldrrK+vf//97cqeLULiOOn/pBlj4/HEbBIJIcNh4O1vfm2osMIYtcF0yPogyyKOY5fvUkr51Tffu679szeuWcZAVSlFLOo4XjlvubW5+cGHHz98vFZnxnS8oQ+pHn40XeX9M8bSNDPvq7EXowE+CKHv+4wxAESL9B124GwFPr2BmzdvKaleu3bZb6lWUEoRyxoO56htTzN5a2trf/7fv3z9zd8qoqeV7PQP672209HxhgmxU3/LcUwTSUiFE+0cA3RI+EbDYDKpFmxkjH10/fMHj9beeO3V1RMrtm3vK/eD0HM9bzAkhAjBBRdRFH319bcfXf90o6mby6ZW5yCo+py+stIkhFgWsSza2VhCpn/j+96UoTw6+Aghy0sLT9c361Hqg4dra0+e+r5/6cL5iy+eC4KBY9uO49iurwdVx1H8dGPj22+/+/vtu2HU/OKosuhpIABQmm2tf3KqrPYGnOE+g5ca3OYpdqB9BseszlHbGgx8PSyvjiBjkrHx9ZtffvbFNwRjiABCiGCy5wArLnk9tVZGxHOd6UaUUp7nHun4SqK95/I12upke75bsc/SDShtjZS7RPmM3zkdxVw+pFEUH0Xm6NlJt227/orPxlBR7h83UR4T2CM0aEBwZXnxeYlGHbuprXsurwJrlb7GrGh9hCfYX9UNIQyCIIp6vT2x7cTrpET/7vs24GxK294WA3ZzjLAXJ9bvcuW3vZAW69NocWDZPGmiIQzDw/jS+o2UB3vZjk7puq7TOZ47z3Pdv31wVhljPa6gYhha22IAKAyY6ketEZxMQrP4dL4BYHFhXim1tbWdZTkXovN5OLatgycdrds2jaLI/I7CNE31G1hngkybYsMbXg3wmX441Y26781ce9vH3SmKQteNlc67mr5PcO8B6Gq/qmrGGI9Go846sTiOAVCN5e/6JTfTr+0zPNUU8za+xaDM/JStMMZ4NBoaCv77JLQqllbDlCTpNELY88laK3ld1xmNhmaDFsdJ44tO9JSAxqjuIPC1uS/TH1bHpULo+56BrzYLoFKqkUaUUs6UVNHvEzTXqSdJmiTVahUhxMHiUWRgGQ3nt1GaDNNPzQa6ruymF8rzfNaN6XfeGjLlWZaHYbUJ/GCFeshgoRvVvNmo118lvQdQYYSvVhq/V7CvX408q2ejE8GGscGci/F4UhbtzpfyPQf42hydMqHSCLG5hbAiCDpWnfK4UqqD1V7atj03NzKU/6dpGoZh6V3IM0s6mvGp7qpVgzi0qR7DnVXJTssCAFD6bNxLZfjMTF6u67oaxEZ1VBR8PJ5M7UmSpDO9O3o26QOlmaht4tD2gguDN1eBT8svhNBx9jWcHDhPMAXR9xtaFfTrZCaTUB+RytSHA1te3MYgdjrDjbNe+kvf1L47jl0WmfJLxw+2bJuORsMgGNDavFXOeRiGYRhxzvtL+myWFwBAafdw8Uqn0tQx7rn58pMrR1r6rb6HJ8107d3c3MjzvIqUFEUxHk/G43HPC5kOb0u9ExwOhwghM39V6ZPbcw6yzpCu4rXa9j4BFEJ0xoj9T7Tj2HvCaJUvmudsY2PzyZP1zngJmaPRNkJBSilEh5Gqe9F53l0cU79opVr0OSJYEsbB/PzccBi4rmtZRGuPNE0fPHhk9ttNjgilViNrqUkbzoWxMRtoiqKs8pRSWZabmY96zp4Q4rpuOZ6VUo7Hk7Zq9YOTd4QQQgBwps9JSt1zwX2/udD2/wYAlB6uLCeIdRsAAAAASUVORK5CYII=';

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
    '\n  background-color: black;\n  position: absolute;\n  padding: 6px 4px;\n  border-radius: 50%;\n  font-size: 14px;\n  bottom: -15px;\n  right: 22%;\n  z-index: 99;\n  font-weight: bold;\n  border: 2px solid darkgray;\n',
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
    '\n      position: relative;\n      border-radius: 50% / 10%;\n      color: white;\n      width: 65px;\n      height: 68px;\n      text-align: center;\n      text-indent: 0.1em;\n      animation: ',
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
  console.log(direction, state);
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
