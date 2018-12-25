import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Binary', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['a + b + c', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "c"
                }
            }
        }
    ],
    "sourceType": "script"
}],
    ['a + b * c * d', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "+",
                  "left": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "right": {
                      "type": "BinaryExpression",
                      "operator": "*",
                      "left": {
                          "type": "BinaryExpression",
                          "operator": "*",
                          "left": {
                              "type": "Identifier",
                              "name": "b"
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "c"
                          }
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "d"
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
   ['a * b + c * d', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "*",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b"
                    }
                },
                "right": {
                    "type": "BinaryExpression",
                    "operator": "*",
                    "left": {
                        "type": "Identifier",
                        "name": "c"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "d"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
    ['(a * b + c) * d', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "*",
                  "left": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                          "type": "BinaryExpression",
                          "operator": "*",
                          "left": {
                              "type": "Identifier",
                              "name": "a"
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "b"
                          }
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "c"
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "d"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a=b+=c-=d**=e*=f/=g%=h<<=i>>=j>>>=k&=l^=m|=n', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "operator": "=",
                  "left": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "right": {
                      "type": "AssignmentExpression",
                      "operator": "+=",
                      "left": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "right": {
                          "type": "AssignmentExpression",
                          "operator": "-=",
                          "left": {
                              "type": "Identifier",
                              "name": "c"
                          },
                          "right": {
                              "type": "AssignmentExpression",
                              "operator": "**=",
                              "left": {
                                  "type": "Identifier",
                                  "name": "d"
                              },
                              "right": {
                                  "type": "AssignmentExpression",
                                  "operator": "*=",
                                  "left": {
                                      "type": "Identifier",
                                      "name": "e"
                                  },
                                  "right": {
                                      "type": "AssignmentExpression",
                                      "operator": "/=",
                                      "left": {
                                          "type": "Identifier",
                                          "name": "f"
                                      },
                                      "right": {
                                          "type": "AssignmentExpression",
                                          "operator": "%=",
                                          "left": {
                                              "type": "Identifier",
                                              "name": "g"
                                          },
                                          "right": {
                                              "type": "AssignmentExpression",
                                              "operator": "<<=",
                                              "left": {
                                                  "type": "Identifier",
                                                  "name": "h"
                                              },
                                              "right": {
                                                  "type": "AssignmentExpression",
                                                  "operator": ">>=",
                                                  "left": {
                                                      "type": "Identifier",
                                                      "name": "i"
                                                  },
                                                  "right": {
                                                      "type": "AssignmentExpression",
                                                      "operator": ">>>=",
                                                      "left": {
                                                          "type": "Identifier",
                                                          "name": "j"
                                                      },
                                                      "right": {
                                                          "type": "AssignmentExpression",
                                                          "operator": "&=",
                                                          "left": {
                                                              "type": "Identifier",
                                                              "name": "k"
                                                          },
                                                          "right": {
                                                              "type": "AssignmentExpression",
                                                              "operator": "^=",
                                                              "left": {
                                                                  "type": "Identifier",
                                                                  "name": "l"
                                                              },
                                                              "right": {
                                                                  "type": "AssignmentExpression",
                                                                  "operator": "|=",
                                                                  "left": {
                                                                      "type": "Identifier",
                                                                      "name": "m"
                                                                  },
                                                                  "right": {
                                                                      "type": "Identifier",
                                                                      "name": "n"
                                                                  }
                                                              }
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a|=b^=c&=d>>>=e>>=f<<=g%=h/=i*=j**=k-=l+=m=n', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "operator": "|=",
                  "left": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "right": {
                      "type": "AssignmentExpression",
                      "operator": "^=",
                      "left": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "right": {
                          "type": "AssignmentExpression",
                          "operator": "&=",
                          "left": {
                              "type": "Identifier",
                              "name": "c"
                          },
                          "right": {
                              "type": "AssignmentExpression",
                              "operator": ">>>=",
                              "left": {
                                  "type": "Identifier",
                                  "name": "d"
                              },
                              "right": {
                                  "type": "AssignmentExpression",
                                  "operator": ">>=",
                                  "left": {
                                      "type": "Identifier",
                                      "name": "e"
                                  },
                                  "right": {
                                      "type": "AssignmentExpression",
                                      "operator": "<<=",
                                      "left": {
                                          "type": "Identifier",
                                          "name": "f"
                                      },
                                      "right": {
                                          "type": "AssignmentExpression",
                                          "operator": "%=",
                                          "left": {
                                              "type": "Identifier",
                                              "name": "g"
                                          },
                                          "right": {
                                              "type": "AssignmentExpression",
                                              "operator": "/=",
                                              "left": {
                                                  "type": "Identifier",
                                                  "name": "h"
                                              },
                                              "right": {
                                                  "type": "AssignmentExpression",
                                                  "operator": "*=",
                                                  "left": {
                                                      "type": "Identifier",
                                                      "name": "i"
                                                  },
                                                  "right": {
                                                      "type": "AssignmentExpression",
                                                      "operator": "**=",
                                                      "left": {
                                                          "type": "Identifier",
                                                          "name": "j"
                                                      },
                                                      "right": {
                                                          "type": "AssignmentExpression",
                                                          "operator": "-=",
                                                          "left": {
                                                              "type": "Identifier",
                                                              "name": "k"
                                                          },
                                                          "right": {
                                                              "type": "AssignmentExpression",
                                                              "operator": "+=",
                                                              "left": {
                                                                  "type": "Identifier",
                                                                  "name": "l"
                                                              },
                                                              "right": {
                                                                  "type": "AssignmentExpression",
                                                                  "operator": "=",
                                                                  "left": {
                                                                      "type": "Identifier",
                                                                      "name": "m"
                                                                  },
                                                                  "right": {
                                                                      "type": "Identifier",
                                                                      "name": "n"
                                                                  }
                                                              }
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a || b || c', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "LogicalExpression",
                  "operator": "||",
                  "left": {
                      "type": "LogicalExpression",
                      "operator": "||",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b"
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "c"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a && b && c', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "LogicalExpression",
                  "operator": "&&",
                  "left": {
                      "type": "LogicalExpression",
                      "operator": "&&",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b"
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "c"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['x || y && z', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "LogicalExpression",
            "left": {
              "type": "Identifier",
              "name": "x"
            },
            "right": {
              "type": "LogicalExpression",
              "left": {
                "type": "Identifier",
                "name": "y"
              },
              "right": {
                "type": "Identifier",
                "name": "z"
              },
              "operator": "&&"
            },
            "operator": "||"
          }
        }
      ]
    }],
    ['a && b || c', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "LogicalExpression",
                  "operator": "||",
                  "left": {
                      "type": "LogicalExpression",
                      "operator": "&&",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b"
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "c"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a || b && c', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "LogicalExpression",
                  "operator": "||",
                  "left": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "right": {
                      "type": "LogicalExpression",
                      "operator": "&&",
                      "left": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "c"
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a | b && c', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "LogicalExpression",
                  "operator": "&&",
                  "left": {
                      "type": "BinaryExpression",
                      "operator": "|",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b"
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "c"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a && b | c', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "LogicalExpression",
                  "operator": "&&",
                  "left": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "right": {
                      "type": "BinaryExpression",
                      "operator": "|",
                      "left": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "c"
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a ^ b | c', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "|",
                  "left": {
                      "type": "BinaryExpression",
                      "operator": "^",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b"
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "c"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a & b ^ c', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "^",
                  "left": {
                      "type": "BinaryExpression",
                      "operator": "&",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b"
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "c"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
  ['a & b == c', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "&",
                "left": {
                    "type": "Identifier",
                    "name": "a"
                },
                "right": {
                    "type": "BinaryExpression",
                    "operator": "==",
                    "left": {
                        "type": "Identifier",
                        "name": "b"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "c"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a == b != c === d !== e', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "!==",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "===",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "!=",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": "==",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "c"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "d"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "e"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a == b & c', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "&",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "==",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "c"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a < b <= c > d >= e in f instanceof g', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "instanceof",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "in",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": ">=",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": ">",
                            "left": {
                                "type": "BinaryExpression",
                                "operator": "<=",
                                "left": {
                                    "type": "BinaryExpression",
                                    "operator": "<",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "c"
                                }
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "d"
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "e"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "f"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "g"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a instanceof b in c >= d > e <= f < g', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "<",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "<=",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": ">",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": ">=",
                            "left": {
                                "type": "BinaryExpression",
                                "operator": "in",
                                "left": {
                                    "type": "BinaryExpression",
                                    "operator": "instanceof",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "c"
                                }
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "d"
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "e"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "f"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "g"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a << b < c', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "<",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "<<",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "c"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a < b << c', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "<",
                "left": {
                    "type": "Identifier",
                    "name": "a"
                },
                "right": {
                    "type": "BinaryExpression",
                    "operator": "<<",
                    "left": {
                        "type": "Identifier",
                        "name": "b"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "c"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a << b >> c >>> d', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": ">>>",
                "left": {
                    "type": "BinaryExpression",
                    "operator": ">>",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "<<",
                        "left": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "c"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "d"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a >>> b >> c << d', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "<<",
                "left": {
                    "type": "BinaryExpression",
                    "operator": ">>",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": ">>>",
                        "left": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "c"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "d"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a << b + c', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "<<",
                "left": {
                    "type": "Identifier",
                    "name": "a"
                },
                "right": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Identifier",
                        "name": "b"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "c"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a * b / c % d', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "%",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "/",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "c"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "d"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a % b / c * d', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "*",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "/",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "%",
                        "left": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "c"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "d"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a ** b ** c', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "**",
                "left": {
                    "type": "Identifier",
                    "name": "a"
                },
                "right": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "b"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "c"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a ** b ** c + d', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "**",
                        "left": {
                            "type": "Identifier",
                            "name": "b"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "c"
                        }
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "d"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a ? b ** c : d', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ConditionalExpression",
                "test": {
                    "type": "Identifier",
                    "name": "a"
                },
                "consequent": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "b"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "c"
                    }
                },
                "alternate": {
                    "type": "Identifier",
                    "name": "d"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a ? b : c ** d', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ConditionalExpression",
                "test": {
                    "type": "Identifier",
                    "name": "a"
                },
                "consequent": {
                    "type": "Identifier",
                    "name": "b"
                },
                "alternate": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "c"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "d"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['b && c == d', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "LogicalExpression",
                "operator": "&&",
                "left": {
                    "type": "Identifier",
                    "name": "b"
                },
                "right": {
                    "type": "BinaryExpression",
                    "operator": "==",
                    "left": {
                        "type": "Identifier",
                        "name": "c"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "d"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['a !== b === c != d == e', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "==",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "!=",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "===",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": "!==",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "c"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "d"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "e"
                }
            }
        }
    ],
    "sourceType": "script"
}]
];

pass('Expressions - Binary (pass)', valids);

});
