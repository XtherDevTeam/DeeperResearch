import { createTheme } from '@mui/material';
import imgBackground3 from './assets/background-3.png'

import imgOops from './assets/oops.jpg'
import loginBackground from './assets/loginBackground.jpg'

let darkTheme = {
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    },
    "unit": "px"
  },
  "direction": "ltr",
  "components": {
    "MuiCssBaseline": {
      "defaultProps": {
        "enableColorScheme": true
      },
      "styleOverrides": {
        "*::-webkit-scrollbar": {
          "display": "none"
        }
      }
    },
    "MuiAccordion": {
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          "border": "0px solid #40484b",
          "color": "#e1e3e4",
          "backgroundColor": "#373a3b",
          "&:before": {
            "backgroundColor": "#373a3b",
            "display": "none"
          },
          "&.Mui-disabled": {
            "backgroundColor": "#2e3132",
            "color": "#e1e3e4",
            "border": "0px solid #40484b"
          },
          "& .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper ": {
            "color": "#e1e3e4"
          }
        }
      }
    },
    "MuiAlert": {
      "defaultProps": {
        "variant": "standard"
      },
      "styleOverrides": {
        "root": {
          "borderRadius": "20px"
        },
        "standardError": {
          "background": "#93000a",
          "color": "#ffdad6"
        },
        "standardInfo": {
          "background": "#004c69",
          "color": "#c4e7ff"
        },
        "standardWarning": {
          "background": "#5b4300",
          "color": "#ffdf9f"
        },
        "standardSuccess": {
          "background": "#005231",
          "color": "#92f7bc"
        },
        "filledError": {
          "background": "#ffb4ab",
          "color": "#690005"
        },
        "filledInfo": {
          "background": "#7cd0ff",
          "color": "#00344a"
        },
        "filledWarning": {
          "background": "#f8bd26",
          "color": "#402d00"
        },
        "filledSuccess": {
          "background": "#76daa1",
          "color": "#003920"
        },
        "outlinedError": {
          "color": "#ffb4ab"
        },
        "outlinedInfo": {
          "color": "#7cd0ff"
        },
        "outlinedWarning": {
          "color": "#f8bd26"
        },
        "outlinedSuccess": {
          "color": "#76daa1"
        }
      }
    },
    "MuiAppBar": {
      "defaultProps": {
        "elevation": 0,
        "color": "default"
      },
      "styleOverrides": {
        "colorDefault": {
          "background": "#1d2021",
          "color": "#e1e3e4"
        },
        "colorPrimary": {
          "background": "#111415",
          "color": "#e1e3e4"
        }
      }
    },
    "MuiBadge": {
      "defaultProps": {
        "color": "default"
      },
      "variants": [
        {
          "props": {
            "color": "default"
          },
          "style": {
            ".MuiBadge-badge": {
              "backgroundColor": "#ffb4ab",
              "color": "#690005"
            }
          }
        }
      ]
    },
    "MuiButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "30px",
          "textTransform": "none",
          "fontWeight": "bold",
          "&:has(>svg)": {
            "padding": "8px",
            "borderRadius": "50%",
            "minWidth": "1em",
            "minHeight": "1em"
          }
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevated"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#191c1d",
            "color": "#5ad5fa",
            "&:hover": {
              "background": "#23292c",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#283033"
            },
            "&:active": {
              "background": "#283033"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(225, 227, 228, 0.12)",
              "color": "rgba(225, 227, 228, 0.38)",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "backgroundColor": "#5ad5fa",
            "color": "#003543",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(225, 227, 228, 0.12)",
              "color": "rgba(225, 227, 228, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#53c6e9",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#50bfe0",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#50bfe0",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "tonal"
          },
          "style": {
            "backgroundColor": "#344a52",
            "color": "#cfe6f0",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(225, 227, 228, 0.12)",
              "color": "rgba(225, 227, 228, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#3f555d",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#445a63",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#445a63",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "color": "#5ad5fa",
            "borderColor": "#899296",
            "borderWidth": "1px",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "borderColor": "rgba(225, 227, 228, 0.12)",
              "color": "rgba(225, 227, 228, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#1c2225",
              "borderColor": "#89979c"
            },
            "&:focus": {
              "backgroundColor": "#21292c",
              "borderColor": "#5ad5fa"
            },
            "&:active": {
              "backgroundColor": "#21292c",
              "borderColor": "#8a99a0"
            }
          }
        },
        {
          "props": {
            "variant": "text"
          },
          "style": {
            "backgroundColor": "transparent",
            "color": "#5ad5fa",
            "boxShadow": "none",
            "padding": "5px 15px",
            "&.Mui-disabled": {
              "color": "rgba(225, 227, 228, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#1c2225"
            },
            "&:focus": {
              "backgroundColor": "#21292c"
            },
            "&:active": {
              "backgroundColor": "#21292c"
            }
          }
        }
      ]
    },
    "MuiCard": {
      "styleOverrides": {
        "root": {
          "borderRadius": "20px",
          "padding": "10px 6px"
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevation"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#191c1d",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#23292c",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#283033"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#283033"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(25, 28, 29, 0.38)",
              "color": "#40484b",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#323537",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#3a4043",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#3d464a"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#3d464a"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(50, 53, 55, 0.38)",
              "color": "#40484b",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#111415",
            "borderColor": "#899296",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#1c2225",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#21292c"
            },
            "&:active": {
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
              "background": "#3d464a"
            },
            "&.Mui-disabled": {
              "borderColor": "rgba(50, 53, 55, 0.12)",
              "boxShadow": "none"
            }
          }
        }
      ]
    },
    "MuiDrawer": {
      "styleOverrides": {
        "paper": {
          "border": "0px",
          "background": "#1d2021",
          "color": "#bfc8cc"
        }
      }
    },
    "MuiFab": {
      "defaultProps": {
        "color": "secondary"
      },
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "borderRadius": "18px"
        }
      },
      "variants": [
        {
          "props": {
            "color": "primary"
          },
          "style": {
            "backgroundColor": "#004e5f",
            "color": "#b4ebff",
            "&:hover": {
              "background": "#17596a",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#1f5f70",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#1f5f70",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "secondary"
          },
          "style": {
            "backgroundColor": "#344a52",
            "color": "#cfe6f0",
            "&:hover": {
              "background": "#3f555d",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#445a63",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#445a63",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "surface"
          },
          "style": {
            "backgroundColor": "#1d2021",
            "color": "#5ad5fa",
            "&:hover": {
              "background": "#272d2f",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#2b3336",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#2b3336",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "tertiary"
          },
          "style": {
            "backgroundColor": "#414465",
            "color": "#e0e0ff",
            "&:hover": {
              "background": "#4c4f70",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#525475",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#525475",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        }
      ]
    },
    "MuiListItem": {
      "styleOverrides": {
        "root": {
          "paddingTop": 1,
          "paddingBottom": 1,
          "& .MuiListItemButton-root": {
            "paddingTop": 8,
            "paddingBottom": 8
          }
        }
      }
    },
    "MuiListItemButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": 50,
          "color": "#bfc8cc",
          "&:hover": {
            "backgroundColor": "#282b2c",
            "color": "#c2cace"
          },
          "&:active": {
            "backgroundColor": "#2e3234",
            "color": "#c3cbcf"
          },
          "&.Mui-selected": {
            "color": "#cfe6f0",
            "background": "#344a52",
            "& > .MuiListItemText-root > .MuiTypography-root": {
              "fontWeight": "bold"
            },
            "&:hover": {
              "backgroundColor": "#3f555d",
              "color": "#c0d7e1"
            },
            "&:active": {
              "backgroundColor": "#445a63",
              "color": "#b9d0da"
            }
          }
        }
      }
    },
    "MuiListItemIcon": {
      "styleOverrides": {
        "root": {
          "color": "inherit",
          "minWidth": 32,
          "&.Mui-selected": {
            "fontWeight": "bold"
          }
        }
      }
    },
    "MuiMenu": {
      "defaultProps": {
        "color": "default"
      },
      "styleOverrides": {
        "root": {},
        "paper": {
          "backgroundColor": "#191c1d",
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "color": "#e1e3e4"
        }
      }
    },
    "MuiSwitch": {
      "styleOverrides": {
        "root": {
          "width": 42,
          "height": 26,
          "padding": 0,
          "marginLeft": 12,
          "marginRight": 8,
          "borderColor": "#899296",
          "& .MuiSwitch-switchBase": {
            "padding": 0,
            "margin": 7,
            "transitionDuration": "100ms",
            "&.Mui-checked": {
              "transform": "translateX(16px)",
              "margin": 4,
              "& + .MuiSwitch-track": {
                "backgroundColor": "#5ad5fa",
                "opacity": 1,
                "border": 0
              },
              "& .MuiSwitch-thumb": {
                "color": "#003543",
                "width": 18,
                "height": 18
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                "backgroundColor": "rgba(225, 227, 228, 0.1)"
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                "color": "rgba(17, 20, 21, 0.8)"
              }
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
              "color": "#5ad5fa",
              "border": "6px solid #003543"
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              "color": "rgba(225, 227, 228, 0.3)"
            }
          },
          "& .MuiSwitch-thumb": {
            "boxSizing": "border-box",
            "color": "#899296",
            "width": 12,
            "height": 12,
            "&:before": {
              "content": "''",
              "position": "absolute",
              "width": "100%",
              "height": "100%",
              "left": 0,
              "top": 0,
              "backgroundRepeat": "no-repeat",
              "backgroundPosition": "center"
            }
          },
          "& .MuiSwitch-track": {
            "borderRadius": 20,
            "border": "2px solid #899296",
            "backgroundColor": "#323537",
            "opacity": 1,
            "transition": "background .2s"
          }
        }
      }
    },
    "MuiToggleButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "50px",
          "textTransform": "none",
          "color": "#e1e3e4",
          "&.Mui-selected": {
            "color": "#cfe6f0",
            "backgroundColor": "#344a52"
          },
          "&.MuiToggleButton-primary": {
            "borderColor": "transparent"
          },
          "&.MuiToggleButton-primary.Mui-selected": {
            "color": "#003543",
            "backgroundColor": "#5ad5fa"
          }
        }
      }
    },
    "MuiToggleButtonGroup": {
      "styleOverrides": {
        "grouped": {
          "borderRadius": "50px",
          "borderColor": "#899296",
          "&:not(:first-of-type)": {
            "marginLeft": 0,
            "borderLeft": 0
          },
          "&:hover": {
            "background": "#1c2225"
          },
          "&.Mui-selected:hover": {
            "background": "#3f555d"
          }
        }
      }
    },
    "MuiTooltip": {
      "styleOverrides": {
        "tooltip": {
          "background": "#e1e3e4",
          "color": "#2e3132"
        }
      }
    }
  },
  "palette": {
    "mode": "light",
    "themeMode": "dark",
    "primary": {
      "main": "#5ad5fa",
      "contrastText": "#003543",
      "light": "rgb(123, 221, 251)",
      "dark": "rgb(62, 149, 175)"
    },
    "onPrimary": {
      "main": "#003543",
      "contrastText": "#5ad5fa"
    },
    "primaryContainer": {
      "main": "#004e5f",
      "contrastText": "#b4ebff"
    },
    "onPrimaryContainer": {
      "main": "#b4ebff",
      "contrastText": "#004e5f"
    },
    "secondary": {
      "main": "#b3cad4",
      "contrastText": "#1d333b",
      "light": "rgb(194, 212, 220)",
      "dark": "rgb(125, 141, 148)"
    },
    "onSecondary": {
      "main": "#1d333b",
      "contrastText": "#b3cad4"
    },
    "secondaryContainer": {
      "main": "#344a52",
      "contrastText": "#cfe6f0"
    },
    "onSecondaryContainer": {
      "main": "#cfe6f0",
      "contrastText": "#344a52"
    },
    "tertiary": {
      "main": "#c2c4eb",
      "contrastText": "#2b2e4d"
    },
    "onTertiary": {
      "main": "#2b2e4d",
      "contrastText": "#c2c4eb"
    },
    "tertiaryContainer": {
      "main": "#414465",
      "contrastText": "#e0e0ff"
    },
    "onTertiaryContainer": {
      "main": "#e0e0ff",
      "contrastText": "#414465"
    },
    "error": {
      "main": "#ffb4ab",
      "contrastText": "#690005",
      "light": "rgb(255, 195, 187)",
      "dark": "rgb(178, 125, 119)"
    },
    "onError": {
      "main": "#690005",
      "contrastText": "#ffb4ab"
    },
    "errorContainer": {
      "main": "#93000a",
      "contrastText": "#ffdad6"
    },
    "onErrorContainer": {
      "main": "#ffdad6",
      "contrastText": "#93000a"
    },
    "primaryFixed": {
      "main": "#b4ebff"
    },
    "primaryFixedDim": {
      "main": "#5ad5fa"
    },
    "onPrimaryFixed": {
      "main": "#001f28"
    },
    "onPrimaryFixedVariant": {
      "main": "#004e5f"
    },
    "secondaryFixed": {
      "main": "#cfe6f0"
    },
    "secondaryFixedDim": {
      "main": "#b3cad4"
    },
    "onSecondaryFixed": {
      "main": "#071e25"
    },
    "onSecondaryFixedVariant": {
      "main": "#344a52"
    },
    "tertiaryFixed": {
      "main": "#e0e0ff"
    },
    "tertiaryFixedDim": {
      "main": "#c2c4eb"
    },
    "onTertiaryFixed": {
      "main": "#161937"
    },
    "onTertiaryFixedVariant": {
      "main": "#414465"
    },
    "surface": {
      "main": "#111415",
      "contrastText": "#e1e3e4"
    },
    "onSurface": {
      "main": "#e1e3e4",
      "contrastText": "#111415"
    },
    "surfaceDim": {
      "main": "#111415"
    },
    "surfaceBright": {
      "main": "#373a3b"
    },
    "surfaceContainerLowest": {
      "main": "#0c0f10"
    },
    "surfaceContainerLow": {
      "main": "#191c1d"
    },
    "surfaceContainer": {
      "main": "#1d2021"
    },
    "surfaceContainerHigh": {
      "main": "#272a2c"
    },
    "surfaceContainerHighest": {
      "main": "#323537"
    },
    "surfaceVariant": {
      "main": "#40484b",
      "contrastText": "#bfc8cc"
    },
    "onSurfaceVariant": {
      "main": "#bfc8cc",
      "contrastText": "#40484b"
    },
    "outline": {
      "main": "#899296"
    },
    "outlineVariant": {
      "main": "#40484b"
    },
    "inversePrimary": {
      "main": "#00677e",
      "contrastText": ""
    },
    "inverseOnPrimary": {
      "main": "",
      "contrastText": "#00677e"
    },
    "inverseSurface": {
      "main": "#e1e3e4",
      "contrastText": "#e1e3e4"
    },
    "inverseOnSurface": {
      "main": "#2e3132",
      "contrastText": "#e1e3e4"
    },
    "shadow": {
      "main": "#000000"
    },
    "scrim": {
      "main": "#000000"
    },
    "surfaceTintColor": {
      "main": "#5ad5fa"
    },
    "background": {
      "default": "#1d2021",
      "paper": "#111415"
    },
    "onBackground": {
      "main": "#e1e3e4"
    },
    "common": {
      "white": "#111415",
      "black": "#e1e3e4"
    },
    "text": {
      "primary": "#e1e3e4",
      "secondary": "#cfe6f0",
      "disabled": "rgba(0, 0, 0, 0.38)"
    },
    "info": {
      "main": "#7cd0ff",
      "contrastText": "#00344a",
      "light": "rgb(150, 217, 255)",
      "dark": "rgb(86, 145, 178)"
    },
    "onInfo": {
      "main": "#00344a",
      "contrastText": "#7cd0ff"
    },
    "infoContainer": {
      "main": "#004c69",
      "contrastText": "#c4e7ff"
    },
    "onInfoContainer": {
      "main": "#c4e7ff",
      "contrastText": "#004c69"
    },
    "success": {
      "main": "#76daa1",
      "contrastText": "#003920",
      "light": "rgb(145, 225, 179)",
      "dark": "rgb(82, 152, 112)"
    },
    "onSuccess": {
      "main": "#003920",
      "contrastText": "#76daa1"
    },
    "successContainer": {
      "main": "#005231",
      "contrastText": "#92f7bc"
    },
    "onSuccessContainer": {
      "main": "#92f7bc",
      "contrastText": "#005231"
    },
    "warning": {
      "main": "#f8bd26",
      "contrastText": "#402d00",
      "light": "rgb(249, 202, 81)",
      "dark": "rgb(173, 132, 26)"
    },
    "onWarning": {
      "main": "#402d00",
      "contrastText": "#f8bd26"
    },
    "warningContainer": {
      "main": "#5b4300",
      "contrastText": "#ffdf9f"
    },
    "onWarningContainer": {
      "main": "#ffdf9f",
      "contrastText": "#5b4300"
    },
    "divider": "#899296",
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "hover": "rgba(0, 0, 0, 0.04)",
      "hoverOpacity": 0.04,
      "selected": "rgba(0, 0, 0, 0.08)",
      "selectedOpacity": 0.08,
      "disabled": "rgba(0, 0, 0, 0.26)",
      "disabledBackground": "rgba(0, 0, 0, 0.12)",
      "disabledOpacity": 0.38,
      "focus": "rgba(0, 0, 0, 0.12)",
      "focusOpacity": 0.12,
      "activatedOpacity": 0.12
    }
  },
  "shape": {
    "borderRadius": 4
  },
  "tones": {
    "primary": {
      "0": "#000000",
      "4": "#001016",
      "6": "#00161d",
      "10": "#001f28",
      "12": "#00232d",
      "17": "#002f3a",
      "20": "#003543",
      "22": "#003a48",
      "24": "#003f4e",
      "30": "#004e5f",
      "40": "#00677e",
      "50": "#00829e",
      "60": "#009ebf",
      "70": "#34b9dd",
      "80": "#5ad5fa",
      "87": "#9ae5ff",
      "90": "#b4ebff",
      "92": "#c5efff",
      "94": "#d4f3ff",
      "95": "#dcf5ff",
      "96": "#e3f7ff",
      "98": "#f2fbff",
      "99": "#f9fdff",
      "100": "#ffffff"
    },
    "secondary": {
      "0": "#000000",
      "4": "#001016",
      "6": "#00161d",
      "10": "#071e25",
      "12": "#0b222a",
      "17": "#172d34",
      "20": "#1d333b",
      "22": "#22383f",
      "24": "#263c44",
      "30": "#344a52",
      "40": "#4c626a",
      "50": "#647b83",
      "60": "#7d949d",
      "70": "#98afb8",
      "80": "#b3cad4",
      "87": "#c6dee8",
      "90": "#cfe6f0",
      "92": "#d4ecf6",
      "94": "#daf2fc",
      "95": "#ddf5ff",
      "96": "#e3f7ff",
      "98": "#f2fbff",
      "99": "#f9fdff",
      "100": "#ffffff"
    },
    "tertiary": {
      "0": "#000000",
      "4": "#080b29",
      "6": "#0d102e",
      "10": "#161937",
      "12": "#1a1d3b",
      "17": "#252746",
      "20": "#2b2e4d",
      "22": "#2f3252",
      "24": "#343756",
      "30": "#414465",
      "40": "#595c7e",
      "50": "#727498",
      "60": "#8c8eb3",
      "70": "#a6a8ce",
      "80": "#c2c4eb",
      "87": "#d5d7ff",
      "90": "#e0e0ff",
      "92": "#e7e6ff",
      "94": "#edecff",
      "95": "#f1efff",
      "96": "#f4f2ff",
      "98": "#fbf8ff",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutral": {
      "0": "#000000",
      "4": "#0c0f10",
      "6": "#111415",
      "10": "#191c1d",
      "12": "#1d2021",
      "17": "#272a2c",
      "20": "#2e3132",
      "22": "#323537",
      "24": "#373a3b",
      "30": "#444749",
      "40": "#5c5f60",
      "50": "#757779",
      "60": "#8f9192",
      "70": "#a9abad",
      "80": "#c5c7c8",
      "87": "#d8dadc",
      "90": "#e1e3e4",
      "92": "#e7e8ea",
      "94": "#eceeef",
      "95": "#eff1f2",
      "96": "#f2f4f5",
      "98": "#f8f9fb",
      "99": "#fbfcfe",
      "100": "#ffffff"
    },
    "neutralVariant": {
      "0": "#000000",
      "4": "#070f12",
      "6": "#0c1518",
      "10": "#151d20",
      "12": "#192124",
      "17": "#232b2e",
      "20": "#293235",
      "22": "#2e3639",
      "24": "#323a3e",
      "30": "#40484b",
      "40": "#576063",
      "50": "#70787c",
      "60": "#899296",
      "70": "#a4adb0",
      "80": "#bfc8cc",
      "87": "#d3dbdf",
      "90": "#dbe4e8",
      "92": "#e1e9ee",
      "94": "#e7eff3",
      "95": "#eaf2f6",
      "96": "#ecf5f9",
      "98": "#f2fbff",
      "99": "#f9fdff",
      "100": "#ffffff"
    },
    "error": {
      "0": "#000000",
      "4": "#280001",
      "6": "#310001",
      "10": "#410002",
      "12": "#490002",
      "17": "#5c0004",
      "20": "#690005",
      "22": "#710005",
      "24": "#790006",
      "30": "#93000a",
      "40": "#ba1a1a",
      "50": "#de3730",
      "60": "#ff5449",
      "70": "#ff897d",
      "80": "#ffb4ab",
      "87": "#ffcfc9",
      "90": "#ffdad6",
      "92": "#ffe2de",
      "94": "#ffe9e6",
      "95": "#ffedea",
      "96": "#fff0ee",
      "98": "#fff8f7",
      "99": "#fffbff",
      "100": "#ffffff"
    }
  },
  "unstable_sxConfig": {
    "border": {
      "themeKey": "borders"
    },
    "borderTop": {
      "themeKey": "borders"
    },
    "borderRight": {
      "themeKey": "borders"
    },
    "borderBottom": {
      "themeKey": "borders"
    },
    "borderLeft": {
      "themeKey": "borders"
    },
    "borderColor": {
      "themeKey": "palette"
    },
    "borderTopColor": {
      "themeKey": "palette"
    },
    "borderRightColor": {
      "themeKey": "palette"
    },
    "borderBottomColor": {
      "themeKey": "palette"
    },
    "borderLeftColor": {
      "themeKey": "palette"
    },
    "borderRadius": {
      "themeKey": "shape.borderRadius"
    },
    "color": {
      "themeKey": "palette"
    },
    "bgcolor": {
      "themeKey": "palette",
      "cssProperty": "backgroundColor"
    },
    "backgroundColor": {
      "themeKey": "palette"
    },
    "p": {},
    "pt": {},
    "pr": {},
    "pb": {},
    "pl": {},
    "px": {},
    "py": {},
    "padding": {},
    "paddingTop": {},
    "paddingRight": {},
    "paddingBottom": {},
    "paddingLeft": {},
    "paddingX": {},
    "paddingY": {},
    "paddingInline": {},
    "paddingInlineStart": {},
    "paddingInlineEnd": {},
    "paddingBlock": {},
    "paddingBlockStart": {},
    "paddingBlockEnd": {},
    "m": {},
    "mt": {},
    "mr": {},
    "mb": {},
    "ml": {},
    "mx": {},
    "my": {},
    "margin": {},
    "marginTop": {},
    "marginRight": {},
    "marginBottom": {},
    "marginLeft": {},
    "marginX": {},
    "marginY": {},
    "marginInline": {},
    "marginInlineStart": {},
    "marginInlineEnd": {},
    "marginBlock": {},
    "marginBlockStart": {},
    "marginBlockEnd": {},
    "displayPrint": {
      "cssProperty": false
    },
    "display": {},
    "overflow": {},
    "textOverflow": {},
    "visibility": {},
    "whiteSpace": {},
    "flexBasis": {},
    "flexDirection": {},
    "flexWrap": {},
    "justifyContent": {},
    "alignItems": {},
    "alignContent": {},
    "order": {},
    "flex": {},
    "flexGrow": {},
    "flexShrink": {},
    "alignSelf": {},
    "justifyItems": {},
    "justifySelf": {},
    "gap": {},
    "rowGap": {},
    "columnGap": {},
    "gridColumn": {},
    "gridRow": {},
    "gridAutoFlow": {},
    "gridAutoColumns": {},
    "gridAutoRows": {},
    "gridTemplateColumns": {},
    "gridTemplateRows": {},
    "gridTemplateAreas": {},
    "gridArea": {},
    "position": {},
    "zIndex": {
      "themeKey": "zIndex"
    },
    "top": {},
    "right": {},
    "bottom": {},
    "left": {},
    "boxShadow": {
      "themeKey": "shadows"
    },
    "width": {},
    "maxWidth": {},
    "minWidth": {},
    "height": {},
    "maxHeight": {},
    "minHeight": {},
    "boxSizing": {},
    "fontFamily": {
      "themeKey": "typography"
    },
    "fontSize": {
      "themeKey": "typography"
    },
    "fontStyle": {
      "themeKey": "typography"
    },
    "fontWeight": {
      "themeKey": "typography"
    },
    "letterSpacing": {},
    "textTransform": {},
    "lineHeight": {},
    "textAlign": {},
    "typography": {
      "cssProperty": false,
      "themeKey": "typography"
    }
  },
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          "minHeight": 48
        }
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "shadows": [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  "typography": {
    "htmlFontSize": 16,
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "h1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "6rem",
      "lineHeight": 1.167,
      "letterSpacing": "-0.01562em"
    },
    "h2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "3.75rem",
      "lineHeight": 1.2,
      "letterSpacing": "-0.00833em"
    },
    "h3": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "3rem",
      "lineHeight": 1.167,
      "letterSpacing": "0em"
    },
    "h4": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "2.125rem",
      "lineHeight": 1.235,
      "letterSpacing": "0.00735em"
    },
    "h5": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1.5rem",
      "lineHeight": 1.334,
      "letterSpacing": "0em"
    },
    "h6": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "1.25rem",
      "lineHeight": 1.6,
      "letterSpacing": "0.0075em"
    },
    "subtitle1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.00938em"
    },
    "subtitle2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.57,
      "letterSpacing": "0.00714em"
    },
    "body1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.5,
      "letterSpacing": "0.00938em"
    },
    "body2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.875rem",
      "lineHeight": 1.43,
      "letterSpacing": "0.01071em"
    },
    "button": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.02857em",
      "textTransform": "uppercase"
    },
    "caption": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 1.66,
      "letterSpacing": "0.03333em"
    },
    "overline": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 2.66,
      "letterSpacing": "0.08333em",
      "textTransform": "uppercase"
    },
    "inherit": {
      "fontFamily": "inherit",
      "fontWeight": "inherit",
      "fontSize": "inherit",
      "lineHeight": "inherit",
      "letterSpacing": "inherit"
    }
  },
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  "zIndex": {
    "mobileStepper": 1000,
    "fab": 1050,
    "speedDial": 1050,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
}

let lightTheme = {
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    },
    "unit": "px"
  },
  "direction": "ltr",
  "components": {
    "MuiCssBaseline": {
      "defaultProps": {
        "enableColorScheme": true
      },
      "styleOverrides": {
        "*::-webkit-scrollbar": {
          "display": "none"
        }
      }
    },
    "MuiAccordion": {
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          "border": "0px solid #bfc8cc",
          "color": "#191c1d",
          "backgroundColor": "#f8f9fb",
          "&:before": {
            "backgroundColor": "#f8f9fb",
            "display": "none"
          },
          "&.Mui-disabled": {
            "backgroundColor": "#eff1f2",
            "color": "#2e3132",
            "border": "0px solid #bfc8cc"
          },
          "& .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper ": {
            "color": "#191c1d"
          }
        }
      }
    },
    "MuiAlert": {
      "defaultProps": {
        "variant": "standard"
      },
      "styleOverrides": {
        "root": {
          "borderRadius": "20px"
        },
        "standardError": {
          "background": "#ffdad6",
          "color": "#410002"
        },
        "standardInfo": {
          "background": "#c4e7ff",
          "color": "#001e2c"
        },
        "standardWarning": {
          "background": "#ffdf9f",
          "color": "#261a00"
        },
        "standardSuccess": {
          "background": "#92f7bc",
          "color": "#002111"
        },
        "filledError": {
          "background": "#ba1a1a",
          "color": "#ffffff"
        },
        "filledInfo": {
          "background": "#00658a",
          "color": "#ffffff"
        },
        "filledWarning": {
          "background": "#795900",
          "color": "#ffffff"
        },
        "filledSuccess": {
          "background": "#006d43",
          "color": "#ffffff"
        },
        "outlinedError": {
          "color": "#ba1a1a"
        },
        "outlinedInfo": {
          "color": "#00658a"
        },
        "outlinedWarning": {
          "color": "#795900"
        },
        "outlinedSuccess": {
          "color": "#006d43"
        }
      }
    },
    "MuiAppBar": {
      "defaultProps": {
        "elevation": 0,
        "color": "default"
      },
      "styleOverrides": {
        "colorDefault": {
          "background": "#eceeef",
          "color": "#191c1d"
        },
        "colorPrimary": {
          "background": "#f8f9fb",
          "color": "#191c1d"
        }
      }
    },
    "MuiBadge": {
      "defaultProps": {
        "color": "default"
      },
      "variants": [
        {
          "props": {
            "color": "default"
          },
          "style": {
            ".MuiBadge-badge": {
              "backgroundColor": "#ba1a1a",
              "color": "#ffffff"
            }
          }
        }
      ]
    },
    "MuiButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "30px",
          "textTransform": "none",
          "fontWeight": "bold",
          "&:has(>svg)": {
            "padding": "8px",
            "borderRadius": "50%",
            "minWidth": "1em",
            "minHeight": "1em"
          }
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevated"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#f2f4f5",
            "color": "#00677e",
            "&:hover": {
              "background": "#e1e6e8",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#d8dfe2"
            },
            "&:active": {
              "background": "#d8dfe2"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(25, 28, 29, 0.12)",
              "color": "rgba(25, 28, 29, 0.38)",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "backgroundColor": "#00677e",
            "color": "#ffffff",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(25, 28, 29, 0.12)",
              "color": "rgba(25, 28, 29, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#2c7186",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#38768a",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#38768a",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "tonal"
          },
          "style": {
            "backgroundColor": "#cfe6f0",
            "color": "#071e25",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(25, 28, 29, 0.12)",
              "color": "rgba(25, 28, 29, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#bcd2dc",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#b2c9d3",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#b2c9d3",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "color": "#00677e",
            "borderColor": "#70787c",
            "borderWidth": "1px",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "borderColor": "rgba(25, 28, 29, 0.12)",
              "color": "rgba(25, 28, 29, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#e6eaee",
              "borderColor": "#6b767c"
            },
            "&:focus": {
              "backgroundColor": "#dde3e7",
              "borderColor": "#00677e"
            },
            "&:active": {
              "backgroundColor": "#dde3e7",
              "borderColor": "#69767b"
            }
          }
        },
        {
          "props": {
            "variant": "text"
          },
          "style": {
            "backgroundColor": "transparent",
            "color": "#00677e",
            "boxShadow": "none",
            "padding": "5px 15px",
            "&.Mui-disabled": {
              "color": "rgba(25, 28, 29, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#e6eaee"
            },
            "&:focus": {
              "backgroundColor": "#dde3e7"
            },
            "&:active": {
              "backgroundColor": "#dde3e7"
            }
          }
        }
      ]
    },
    "MuiCard": {
      "styleOverrides": {
        "root": {
          "borderRadius": "20px",
          "padding": "10px 6px"
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevation"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#f2f4f5",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#e1e6e8",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#d8dfe2"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#d8dfe2"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(242, 244, 245, 0.38)",
              "color": "#dbe4e8",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#e1e3e4",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#d2d7d9",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#cad1d4"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#cad1d4"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(225, 227, 228, 0.38)",
              "color": "#dbe4e8",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#f8f9fb",
            "borderColor": "#70787c",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#e6eaee",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#dde3e7"
            },
            "&:active": {
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
              "background": "#cad1d4"
            },
            "&.Mui-disabled": {
              "borderColor": "rgba(225, 227, 228, 0.12)",
              "boxShadow": "none"
            }
          }
        }
      ]
    },
    "MuiDrawer": {
      "styleOverrides": {
        "paper": {
          "border": "0px",
          "background": "#eceeef",
          "color": "#40484b"
        }
      }
    },
    "MuiFab": {
      "defaultProps": {
        "color": "secondary"
      },
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "borderRadius": "18px"
        }
      },
      "variants": [
        {
          "props": {
            "color": "primary"
          },
          "style": {
            "backgroundColor": "#b4ebff",
            "color": "#001f28",
            "&:hover": {
              "background": "#a3d7ea",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#9acde0",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#9acde0",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "secondary"
          },
          "style": {
            "backgroundColor": "#cfe6f0",
            "color": "#071e25",
            "&:hover": {
              "background": "#bcd2dc",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#b2c9d3",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#b2c9d3",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "surface"
          },
          "style": {
            "backgroundColor": "#eceeef",
            "color": "#00677e",
            "&:hover": {
              "background": "#dbe1e3",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#d3dadd",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#d3dadd",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "tertiary"
          },
          "style": {
            "backgroundColor": "#e0e0ff",
            "color": "#161937",
            "&:hover": {
              "background": "#cccceb",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#c3c3e2",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#c3c3e2",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        }
      ]
    },
    "MuiListItem": {
      "styleOverrides": {
        "root": {
          "paddingTop": 1,
          "paddingBottom": 1,
          "& .MuiListItemButton-root": {
            "paddingTop": 8,
            "paddingBottom": 8
          }
        }
      }
    },
    "MuiListItemButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": 50,
          "color": "#40484b",
          "&:hover": {
            "backgroundColor": "#dcdedf",
            "color": "#3d4547"
          },
          "&:active": {
            "backgroundColor": "#d0d4d6",
            "color": "#3b4345"
          },
          "&.Mui-selected": {
            "color": "#071e25",
            "background": "#cfe6f0",
            "& > .MuiListItemText-root > .MuiTypography-root": {
              "fontWeight": "bold"
            },
            "&:hover": {
              "backgroundColor": "#bcd2dc",
              "color": "#172d34"
            },
            "&:active": {
              "backgroundColor": "#b2c9d3",
              "color": "#1f343c"
            }
          }
        }
      }
    },
    "MuiListItemIcon": {
      "styleOverrides": {
        "root": {
          "color": "inherit",
          "minWidth": 32,
          "&.Mui-selected": {
            "fontWeight": "bold"
          }
        }
      }
    },
    "MuiMenu": {
      "defaultProps": {
        "color": "default"
      },
      "styleOverrides": {
        "root": {},
        "paper": {
          "backgroundColor": "#f2f4f5",
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "color": "#191c1d"
        }
      }
    },
    "MuiSwitch": {
      "styleOverrides": {
        "root": {
          "width": 42,
          "height": 26,
          "padding": 0,
          "marginLeft": 12,
          "marginRight": 8,
          "borderColor": "#70787c",
          "& .MuiSwitch-switchBase": {
            "padding": 0,
            "margin": 7,
            "transitionDuration": "100ms",
            "&.Mui-checked": {
              "transform": "translateX(16px)",
              "margin": 4,
              "& + .MuiSwitch-track": {
                "backgroundColor": "#00677e",
                "opacity": 1,
                "border": 0
              },
              "& .MuiSwitch-thumb": {
                "color": "#ffffff",
                "width": 18,
                "height": 18
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                "backgroundColor": "rgba(25, 28, 29, 0.1)"
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                "color": "rgba(248, 249, 251, 0.8)"
              }
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
              "color": "#00677e",
              "border": "6px solid #ffffff"
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              "color": "rgba(25, 28, 29, 0.3)"
            }
          },
          "& .MuiSwitch-thumb": {
            "boxSizing": "border-box",
            "color": "#70787c",
            "width": 12,
            "height": 12,
            "&:before": {
              "content": "''",
              "position": "absolute",
              "width": "100%",
              "height": "100%",
              "left": 0,
              "top": 0,
              "backgroundRepeat": "no-repeat",
              "backgroundPosition": "center"
            }
          },
          "& .MuiSwitch-track": {
            "borderRadius": 20,
            "border": "2px solid #70787c",
            "backgroundColor": "#e1e3e4",
            "opacity": 1,
            "transition": "background .2s"
          }
        }
      }
    },
    "MuiToggleButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "50px",
          "textTransform": "none",
          "color": "#191c1d",
          "&.Mui-selected": {
            "color": "#071e25",
            "backgroundColor": "#cfe6f0"
          },
          "&.MuiToggleButton-primary": {
            "borderColor": "transparent"
          },
          "&.MuiToggleButton-primary.Mui-selected": {
            "color": "#ffffff",
            "backgroundColor": "#00677e"
          }
        }
      }
    },
    "MuiToggleButtonGroup": {
      "styleOverrides": {
        "grouped": {
          "borderRadius": "50px",
          "borderColor": "#70787c",
          "&:not(:first-of-type)": {
            "marginLeft": 0,
            "borderLeft": 0
          },
          "&:hover": {
            "background": "#e6eaee"
          },
          "&.Mui-selected:hover": {
            "background": "#bcd2dc"
          }
        }
      }
    },
    "MuiTooltip": {
      "styleOverrides": {
        "tooltip": {
          "background": "#2e3132",
          "color": "#eff1f2"
        }
      }
    }
  },
  "palette": {
    "mode": "light",
    "themeMode": "light",
    "primary": {
      "main": "#00677e",
      "contrastText": "#ffffff",
      "light": "rgb(51, 133, 151)",
      "dark": "rgb(0, 72, 88)"
    },
    "onPrimary": {
      "main": "#ffffff",
      "contrastText": "#00677e"
    },
    "primaryContainer": {
      "main": "#b4ebff",
      "contrastText": "#001f28"
    },
    "onPrimaryContainer": {
      "main": "#001f28",
      "contrastText": "#b4ebff"
    },
    "secondary": {
      "main": "#4c626a",
      "contrastText": "#ffffff",
      "light": "rgb(111, 129, 135)",
      "dark": "rgb(53, 68, 74)"
    },
    "onSecondary": {
      "main": "#ffffff",
      "contrastText": "#4c626a"
    },
    "secondaryContainer": {
      "main": "#cfe6f0",
      "contrastText": "#071e25"
    },
    "onSecondaryContainer": {
      "main": "#071e25",
      "contrastText": "#cfe6f0"
    },
    "tertiary": {
      "main": "#595c7e",
      "contrastText": "#ffffff"
    },
    "onTertiary": {
      "main": "#ffffff",
      "contrastText": "#595c7e"
    },
    "tertiaryContainer": {
      "main": "#e0e0ff",
      "contrastText": "#161937"
    },
    "onTertiaryContainer": {
      "main": "#161937",
      "contrastText": "#e0e0ff"
    },
    "error": {
      "main": "#ba1a1a",
      "contrastText": "#ffffff",
      "light": "rgb(199, 71, 71)",
      "dark": "rgb(130, 18, 18)"
    },
    "onError": {
      "main": "#ffffff",
      "contrastText": "#ba1a1a"
    },
    "errorContainer": {
      "main": "#ffdad6",
      "contrastText": "#410002"
    },
    "onErrorContainer": {
      "main": "#410002",
      "contrastText": "#ffdad6"
    },
    "primaryFixed": {
      "main": "#b4ebff"
    },
    "primaryFixedDim": {
      "main": "#5ad5fa"
    },
    "onPrimaryFixed": {
      "main": "#001f28"
    },
    "onPrimaryFixedVariant": {
      "main": "#004e5f"
    },
    "secondaryFixed": {
      "main": "#cfe6f0"
    },
    "secondaryFixedDim": {
      "main": "#b3cad4"
    },
    "onSecondaryFixed": {
      "main": "#071e25"
    },
    "onSecondaryFixedVariant": {
      "main": "#344a52"
    },
    "tertiaryFixed": {
      "main": "#e0e0ff"
    },
    "tertiaryFixedDim": {
      "main": "#c2c4eb"
    },
    "onTertiaryFixed": {
      "main": "#161937"
    },
    "onTertiaryFixedVariant": {
      "main": "#414465"
    },
    "surface": {
      "main": "#f8f9fb",
      "contrastText": "#191c1d"
    },
    "onSurface": {
      "main": "#191c1d",
      "contrastText": "#f8f9fb"
    },
    "surfaceDim": {
      "main": "#d8dadc"
    },
    "surfaceBright": {
      "main": "#f8f9fb"
    },
    "surfaceContainerLowest": {
      "main": "#ffffff"
    },
    "surfaceContainerLow": {
      "main": "#f2f4f5"
    },
    "surfaceContainer": {
      "main": "#eceeef"
    },
    "surfaceContainerHigh": {
      "main": "#e7e8ea"
    },
    "surfaceContainerHighest": {
      "main": "#e1e3e4"
    },
    "surfaceVariant": {
      "main": "#dbe4e8",
      "contrastText": "#40484b"
    },
    "onSurfaceVariant": {
      "main": "#40484b",
      "contrastText": "#dbe4e8"
    },
    "outline": {
      "main": "#70787c"
    },
    "outlineVariant": {
      "main": "#bfc8cc"
    },
    "inversePrimary": {
      "main": "#5ad5fa",
      "contrastText": ""
    },
    "inverseOnPrimary": {
      "main": "",
      "contrastText": "#5ad5fa"
    },
    "inverseSurface": {
      "main": "#2e3132",
      "contrastText": "#2e3132"
    },
    "inverseOnSurface": {
      "main": "#eff1f2",
      "contrastText": "#2e3132"
    },
    "shadow": {
      "main": "#000000"
    },
    "scrim": {
      "main": "#000000"
    },
    "surfaceTintColor": {
      "main": "#00677e"
    },
    "background": {
      "default": "#eceeef",
      "paper": "#f8f9fb"
    },
    "onBackground": {
      "main": "#191c1d"
    },
    "common": {
      "white": "#f8f9fb",
      "black": "#191c1d"
    },
    "text": {
      "primary": "#191c1d",
      "secondary": "#071e25",
      "disabled": "rgba(0, 0, 0, 0.38)"
    },
    "info": {
      "main": "#00658a",
      "contrastText": "#ffffff",
      "light": "rgb(51, 131, 161)",
      "dark": "rgb(0, 70, 96)"
    },
    "onInfo": {
      "main": "#ffffff",
      "contrastText": "#00658a"
    },
    "infoContainer": {
      "main": "#c4e7ff",
      "contrastText": "#001e2c"
    },
    "onInfoContainer": {
      "main": "#001e2c",
      "contrastText": "#c4e7ff"
    },
    "success": {
      "main": "#006d43",
      "contrastText": "#ffffff",
      "light": "rgb(51, 138, 104)",
      "dark": "rgb(0, 76, 46)"
    },
    "onSuccess": {
      "main": "#ffffff",
      "contrastText": "#006d43"
    },
    "successContainer": {
      "main": "#92f7bc",
      "contrastText": "#002111"
    },
    "onSuccessContainer": {
      "main": "#002111",
      "contrastText": "#92f7bc"
    },
    "warning": {
      "main": "#795900",
      "contrastText": "#ffffff",
      "light": "rgb(147, 122, 51)",
      "dark": "rgb(84, 62, 0)"
    },
    "onWarning": {
      "main": "#ffffff",
      "contrastText": "#795900"
    },
    "warningContainer": {
      "main": "#ffdf9f",
      "contrastText": "#261a00"
    },
    "onWarningContainer": {
      "main": "#261a00",
      "contrastText": "#ffdf9f"
    },
    "divider": "#70787c",
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "hover": "rgba(0, 0, 0, 0.04)",
      "hoverOpacity": 0.04,
      "selected": "rgba(0, 0, 0, 0.08)",
      "selectedOpacity": 0.08,
      "disabled": "rgba(0, 0, 0, 0.26)",
      "disabledBackground": "rgba(0, 0, 0, 0.12)",
      "disabledOpacity": 0.38,
      "focus": "rgba(0, 0, 0, 0.12)",
      "focusOpacity": 0.12,
      "activatedOpacity": 0.12
    }
  },
  "shape": {
    "borderRadius": 4
  },
  "tones": {
    "primary": {
      "0": "#000000",
      "4": "#001016",
      "6": "#00161d",
      "10": "#001f28",
      "12": "#00232d",
      "17": "#002f3a",
      "20": "#003543",
      "22": "#003a48",
      "24": "#003f4e",
      "30": "#004e5f",
      "40": "#00677e",
      "50": "#00829e",
      "60": "#009ebf",
      "70": "#34b9dd",
      "80": "#5ad5fa",
      "87": "#9ae5ff",
      "90": "#b4ebff",
      "92": "#c5efff",
      "94": "#d4f3ff",
      "95": "#dcf5ff",
      "96": "#e3f7ff",
      "98": "#f2fbff",
      "99": "#f9fdff",
      "100": "#ffffff"
    },
    "secondary": {
      "0": "#000000",
      "4": "#001016",
      "6": "#00161d",
      "10": "#071e25",
      "12": "#0b222a",
      "17": "#172d34",
      "20": "#1d333b",
      "22": "#22383f",
      "24": "#263c44",
      "30": "#344a52",
      "40": "#4c626a",
      "50": "#647b83",
      "60": "#7d949d",
      "70": "#98afb8",
      "80": "#b3cad4",
      "87": "#c6dee8",
      "90": "#cfe6f0",
      "92": "#d4ecf6",
      "94": "#daf2fc",
      "95": "#ddf5ff",
      "96": "#e3f7ff",
      "98": "#f2fbff",
      "99": "#f9fdff",
      "100": "#ffffff"
    },
    "tertiary": {
      "0": "#000000",
      "4": "#080b29",
      "6": "#0d102e",
      "10": "#161937",
      "12": "#1a1d3b",
      "17": "#252746",
      "20": "#2b2e4d",
      "22": "#2f3252",
      "24": "#343756",
      "30": "#414465",
      "40": "#595c7e",
      "50": "#727498",
      "60": "#8c8eb3",
      "70": "#a6a8ce",
      "80": "#c2c4eb",
      "87": "#d5d7ff",
      "90": "#e0e0ff",
      "92": "#e7e6ff",
      "94": "#edecff",
      "95": "#f1efff",
      "96": "#f4f2ff",
      "98": "#fbf8ff",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutral": {
      "0": "#000000",
      "4": "#0c0f10",
      "6": "#111415",
      "10": "#191c1d",
      "12": "#1d2021",
      "17": "#272a2c",
      "20": "#2e3132",
      "22": "#323537",
      "24": "#373a3b",
      "30": "#444749",
      "40": "#5c5f60",
      "50": "#757779",
      "60": "#8f9192",
      "70": "#a9abad",
      "80": "#c5c7c8",
      "87": "#d8dadc",
      "90": "#e1e3e4",
      "92": "#e7e8ea",
      "94": "#eceeef",
      "95": "#eff1f2",
      "96": "#f2f4f5",
      "98": "#f8f9fb",
      "99": "#fbfcfe",
      "100": "#ffffff"
    },
    "neutralVariant": {
      "0": "#000000",
      "4": "#070f12",
      "6": "#0c1518",
      "10": "#151d20",
      "12": "#192124",
      "17": "#232b2e",
      "20": "#293235",
      "22": "#2e3639",
      "24": "#323a3e",
      "30": "#40484b",
      "40": "#576063",
      "50": "#70787c",
      "60": "#899296",
      "70": "#a4adb0",
      "80": "#bfc8cc",
      "87": "#d3dbdf",
      "90": "#dbe4e8",
      "92": "#e1e9ee",
      "94": "#e7eff3",
      "95": "#eaf2f6",
      "96": "#ecf5f9",
      "98": "#f2fbff",
      "99": "#f9fdff",
      "100": "#ffffff"
    },
    "error": {
      "0": "#000000",
      "4": "#280001",
      "6": "#310001",
      "10": "#410002",
      "12": "#490002",
      "17": "#5c0004",
      "20": "#690005",
      "22": "#710005",
      "24": "#790006",
      "30": "#93000a",
      "40": "#ba1a1a",
      "50": "#de3730",
      "60": "#ff5449",
      "70": "#ff897d",
      "80": "#ffb4ab",
      "87": "#ffcfc9",
      "90": "#ffdad6",
      "92": "#ffe2de",
      "94": "#ffe9e6",
      "95": "#ffedea",
      "96": "#fff0ee",
      "98": "#fff8f7",
      "99": "#fffbff",
      "100": "#ffffff"
    }
  },
  "unstable_sxConfig": {
    "border": {
      "themeKey": "borders"
    },
    "borderTop": {
      "themeKey": "borders"
    },
    "borderRight": {
      "themeKey": "borders"
    },
    "borderBottom": {
      "themeKey": "borders"
    },
    "borderLeft": {
      "themeKey": "borders"
    },
    "borderColor": {
      "themeKey": "palette"
    },
    "borderTopColor": {
      "themeKey": "palette"
    },
    "borderRightColor": {
      "themeKey": "palette"
    },
    "borderBottomColor": {
      "themeKey": "palette"
    },
    "borderLeftColor": {
      "themeKey": "palette"
    },
    "borderRadius": {
      "themeKey": "shape.borderRadius"
    },
    "color": {
      "themeKey": "palette"
    },
    "bgcolor": {
      "themeKey": "palette",
      "cssProperty": "backgroundColor"
    },
    "backgroundColor": {
      "themeKey": "palette"
    },
    "p": {},
    "pt": {},
    "pr": {},
    "pb": {},
    "pl": {},
    "px": {},
    "py": {},
    "padding": {},
    "paddingTop": {},
    "paddingRight": {},
    "paddingBottom": {},
    "paddingLeft": {},
    "paddingX": {},
    "paddingY": {},
    "paddingInline": {},
    "paddingInlineStart": {},
    "paddingInlineEnd": {},
    "paddingBlock": {},
    "paddingBlockStart": {},
    "paddingBlockEnd": {},
    "m": {},
    "mt": {},
    "mr": {},
    "mb": {},
    "ml": {},
    "mx": {},
    "my": {},
    "margin": {},
    "marginTop": {},
    "marginRight": {},
    "marginBottom": {},
    "marginLeft": {},
    "marginX": {},
    "marginY": {},
    "marginInline": {},
    "marginInlineStart": {},
    "marginInlineEnd": {},
    "marginBlock": {},
    "marginBlockStart": {},
    "marginBlockEnd": {},
    "displayPrint": {
      "cssProperty": false
    },
    "display": {},
    "overflow": {},
    "textOverflow": {},
    "visibility": {},
    "whiteSpace": {},
    "flexBasis": {},
    "flexDirection": {},
    "flexWrap": {},
    "justifyContent": {},
    "alignItems": {},
    "alignContent": {},
    "order": {},
    "flex": {},
    "flexGrow": {},
    "flexShrink": {},
    "alignSelf": {},
    "justifyItems": {},
    "justifySelf": {},
    "gap": {},
    "rowGap": {},
    "columnGap": {},
    "gridColumn": {},
    "gridRow": {},
    "gridAutoFlow": {},
    "gridAutoColumns": {},
    "gridAutoRows": {},
    "gridTemplateColumns": {},
    "gridTemplateRows": {},
    "gridTemplateAreas": {},
    "gridArea": {},
    "position": {},
    "zIndex": {
      "themeKey": "zIndex"
    },
    "top": {},
    "right": {},
    "bottom": {},
    "left": {},
    "boxShadow": {
      "themeKey": "shadows"
    },
    "width": {},
    "maxWidth": {},
    "minWidth": {},
    "height": {},
    "maxHeight": {},
    "minHeight": {},
    "boxSizing": {},
    "fontFamily": {
      "themeKey": "typography"
    },
    "fontSize": {
      "themeKey": "typography"
    },
    "fontStyle": {
      "themeKey": "typography"
    },
    "fontWeight": {
      "themeKey": "typography"
    },
    "letterSpacing": {},
    "textTransform": {},
    "lineHeight": {},
    "textAlign": {},
    "typography": {
      "cssProperty": false,
      "themeKey": "typography"
    }
  },
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          "minHeight": 48
        }
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "shadows": [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  "typography": {
    "htmlFontSize": 16,
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "h1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "6rem",
      "lineHeight": 1.167,
      "letterSpacing": "-0.01562em"
    },
    "h2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "3.75rem",
      "lineHeight": 1.2,
      "letterSpacing": "-0.00833em"
    },
    "h3": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "3rem",
      "lineHeight": 1.167,
      "letterSpacing": "0em"
    },
    "h4": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "2.125rem",
      "lineHeight": 1.235,
      "letterSpacing": "0.00735em"
    },
    "h5": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1.5rem",
      "lineHeight": 1.334,
      "letterSpacing": "0em"
    },
    "h6": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "1.25rem",
      "lineHeight": 1.6,
      "letterSpacing": "0.0075em"
    },
    "subtitle1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.00938em"
    },
    "subtitle2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.57,
      "letterSpacing": "0.00714em"
    },
    "body1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.5,
      "letterSpacing": "0.00938em"
    },
    "body2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.875rem",
      "lineHeight": 1.43,
      "letterSpacing": "0.01071em"
    },
    "button": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.02857em",
      "textTransform": "uppercase"
    },
    "caption": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 1.66,
      "letterSpacing": "0.03333em"
    },
    "overline": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 2.66,
      "letterSpacing": "0.08333em",
      "textTransform": "uppercase"
    },
    "inherit": {
      "fontFamily": "inherit",
      "fontWeight": "inherit",
      "fontSize": "inherit",
      "lineHeight": "inherit",
      "letterSpacing": "inherit"
    }
  },
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  "zIndex": {
    "mobileStepper": 1000,
    "fab": 1050,
    "speedDial": 1050,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
}

darkTheme = createTheme(darkTheme)
lightTheme = createTheme(lightTheme)

let theme = () => {
  if (window.localStorage.getItem('themeMode') === null) {
    setThemeMode('light')
    return lightTheme
  }

  document.getElementsByTagName('body')[0].style.backgroundColor = window.localStorage.getItem('themeMode') === 'light' ? '#fafafa' : '#303030'
  return window.localStorage.getItem('themeMode') === 'light' ? lightTheme : darkTheme
}


let setThemeMode = (mode) => {
  let event = new Event('themeModeChange')
  window.localStorage.setItem('themeMode', mode)
  event.newValue = mode
  window.dispatchEvent(event)
}

let rotateThemeMode = () => {
  let mode = window.localStorage.getItem('themeMode') === 'light' ? 'dark' : 'light'
  setThemeMode(mode)
}

let getCurrentThemeMode = () => {
  return window.localStorage.getItem('themeMode')
}

let listenToThemeModeChange = (callback) => {
  window.addEventListener('themeModeChange', (e) => {
    callback(e.newValue)
  })
}

const Background = (props) => (<div style={{
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${props.img})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2000,
  transition: 'background-image 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
}}>{props.children}</div>)


export default {
    lightTheme,
    darkTheme,
    theme,
    setThemeMode,
    rotateThemeMode,
    listenToThemeModeChange,
    imgBackground3,
    imgOops,
    Background,
    getCurrentThemeMode,
    loginBackground
}