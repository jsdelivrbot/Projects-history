let CurrencyFormats = {
  /**
   *
   * @param { string } currencyCode
   * @param { number } amt - value
   * @returns { string }
   */
  asCurrency (currencyCode, amt) {
    // Currencies:
    // https://github.com/CrowdSurge/currency-json/blob/master/currencies.json

    // decimalFormat.js
    // https://gist.github.com/benhodgson87/becf5884a53d90f86b6e

    var { format, units } = CurrencyFormats.formats[currencyCode]
    var neg;

    // If no formatting string supplied
    // or amount is not a number, return as is
    if (!format || isNaN(amt)) return amt;

    // Extract placeholders from format string
    var formFig = format.match(/\#(.*)\#/g).pop();

    // Is number negative?
    if (amt < 0) {
      neg = true;
      amt = (amt * -1);
    }

    // zero decimal currency
    amt = (units.decimal === 0
      ? parseInt(amt, 10)
      : Number((amt * 100).toFixed(2)))

    // Remove any decimals
    amt = amt.toString().replace(/[ ,.]/, '');

    // Split and flip the numbers and format
    var formArr = formFig.split('').reverse(),
      amtArr = amt.split('').reverse();

    // Add leading zeros to small amounts, if there's a separator in last 3 digits
    if (amtArr.length < 3 && format.slice(-3).match(/[ ,.]/)) {
      while (3 - amtArr.length) {
        amtArr.push('0');
      }
    }

    // Loop through the formatting, and look for separators
    // Only get separators that fit within the length of the amount
    for (var i = 0; i < amtArr.length; ++i) {
      // If we find a matching separator, splice it into the amount in the same place
      if (/[ ,.]/.test(formArr[i])) {
        amtArr.splice(i, 0, formArr[i]);
      }
    }

    // Flip the amount back in the right direction, and rejoin
    var amount = amtArr.reverse().join('');

    // Handle Negatives (minus or parentheses)
    if (!neg) format = format.replace(/[\-\(\)]/gi, '');

    // Merge the amount back with the currency symbols
    var money = format.replace(/\#(.*)\#/g, amount);

    return money;
  },
  formats: {
    "AED": {
      "name": "Emirati Dirham",
      "iso": {
        "code": "AED",
        "num": "784"
      },
      "symbol": {
        "default": {
          "display": "Dhs",
          "code": "Dhs"
        },
        "native": {
          "display": "د.إ",
          "code": "&#x62f;.&#x625;"
        }
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Dirham",
          "minor": "Fil"
        }
      },
      "format": "-###,###,###.## Dhs"
    },
    "AFN": {
      "name": "Afghan Afghani",
      "iso": {
        "code": "AFN",
        "num": "971"
      },
      "symbol": {
        "default": {
          "display": "؋",
          "code": "&#x60b;"
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Afghani",
          "minor": "Pul"
        }
      },
      "format": "-###,###,###.##"
    },
    "ALL": {
      "name": "Albanian Lek",
      "iso": {
        "code": "ALL",
        "num": "008"
      },
      "symbol": {
        "default": {
          "display": "L",
          "code": "L"
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Lek",
          "minor": "Qindarka"
        }
      },
      "format": "L -###,###,###.##"
    },
    "AMD": {
      "name": "Armenian Dram",
      "iso": {
        "code": "AMD",
        "num": "051"
      },
      "symbol": {
        "default": {
          "display": "AMD",
          "code": "&#x58f;"
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Dram",
          "minor": "Luma"
        }
      },
      "format": "AMD -###,###,###.##"
    },
    "ANG": {
      "name": "Netherlands Antillean Guilder",
      "iso": {
        "code": "ANG",
        "num": "532"
      },
      "symbol": {
        "default": {
          "display": "NAƒ",
          "code": "NA&#x192;"
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Guilder",
          "minor": "Cent"
        }
      },
      "format": "NAƒ -###,###,###.##"
    },
    "AOA": {
      "name": "Angolan Kwanza",
      "iso": {
        "code": "AOA",
        "num": "973"
      },
      "symbol": {
        "default": {
          "display": "Kz",
          "code": "Kz"
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Kwanza",
          "minor": "Cêntimos"
        }
      },
      "format": "-###,###,###.## Kz"
    },
    "ARS": {
      "name": "Argentine Peso",
      "iso": {
        "code": "ARS",
        "num": "032"
      },
      "symbol": {
        "default": {
          "display": "AR$",
          "code": "AR&#x24;"
        },
        "native": {
          "display": "$",
          "code": "&#x24;"
        }
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Peso",
          "minor": "Centavo"
        }
      },
      "format": "AR$-###.###.###,##"
    },
    "AUD": {
      "name": "Australian Dollar",
      "iso": {
        "code": "AUD",
        "num": "036"
      },
      "symbol": {
        "default": {
          "display": "AU$",
          "code": "AU&#x24;"
        },
        "native": {
          "display": "$",
          "code": "&#x24;"
        }
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Dollar",
          "minor": "Cent"
        }
      },
      "format": "-AU$###,###,###.##"
    },
    "AWG": {
      "name": "Aruban Florin",
      "iso": {
        "code": "AWG",
        "num": "533"
      },
      "symbol": {
        "default": {
          "display": "Afl.",
          "code": "Afl."
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Florin",
          "minor": "Cent"
        }
      },
      "format": "Afl. -###,###,###.##"
    },
    "AZN": {
      "name": "Azerbaijani Manat",
      "iso": {
        "code": "BRL",
        "num": "944"
      },
      "symbol": {
        "default": {
          "display": "man.",
          "code": "man."
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Manat",
          "minor": "Qəpik"
        }
      },
      "format": "man. -$###.###.###,##"
    },
    "CAD": {
      "name": "Canadian Dollar",
      "iso": {
        "code": "CAD",
        "num": "124"
      },
      "symbol": {
        "default": {
          "display": "CA$",
          "code": "CA&#x24;"
        },
        "native": {
          "display": "$",
          "code": "&#x24;"
        }
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Dollar",
          "minor": "Cent"
        }
      },
      "format": "-CA$###,###,###.##"
    },
    "DKK": {
      "name": "Danish Krone",
      "iso": {
        "code": "DKK",
        "num": "208"
      },
      "symbol": {
        "default": {
          "display": "kr",
          "code": "kr"
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Krone",
          "minor": "Øre"
        }
      },
      "format": "kr -###.###.###,##"
    },
    "EUR": {
      "name": "Euro",
      "iso": {
        "code": "EUR",
        "num": "978"
      },
      "symbol": {
        "default": {
          "display": "€",
          "code": "&#x20ac;"
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Euro",
          "minor": "Cent"
        }
      },
      "format": "-€###.###.###,##"
    },
    "GBP": {
      "name": "Pound Sterling",
      "iso": {
        "code": "GBP",
        "num": "826"
      },
      "symbol": {
        "default": {
          "display": "£",
          "code": "&#xa3;"
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Pound",
          "minor": "Pence"
        }
      },
      "format": "-£###,###,###.##"
    },
    "JPY": {
      "name": "Japanese Yen",
      "iso": {
        "code": "JPY",
        "num": "392"
      },
      "symbol": {
        "default": {
          "display": "¥",
          "code": "&#xa5;"
        },
        "native": {
          "display": "¥", // 円
          "code": "&#x5186;"
        }
      },
      "units": {
        "decimal": 0,
        "sub": 0,
        "name": {
          "major": "Yen",
          "minor": null
        }
      },
      "format": "-¥###,###,###"
    },
    "USD": {
      "name": "US Dollar",
      "iso": {
        "code": "USD",
        "num": "840"
      },
      "symbol": {
        "default": {
          "display": "$",
          "code": "&#x24;"
        },
        "native": null
      },
      "units": {
        "decimal": 2,
        "sub": 100,
        "name": {
          "major": "Dollar",
          "minor": "Cent"
        }
      },
      "format": "-$###,###,###.##"
    }
  }
}

export default CurrencyFormats
