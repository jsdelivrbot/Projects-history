class Tokens {
  static get APIURL () {
    return localStorage.getItem('APIURL') ||
      'https://testapi.qntlr.com/api/'
  }

  static get CODEGENURL () {
    return localStorage.getItem('CODEGENURL') ||
      'https://testcodegen.qntlr.com/api/'
  }

  static get LOGENTRIESTOKEN () {
    return localStorage.getItem('LOGENTRIESTOKEN') ||
      'UNKOWN-UNKNOWN-UNKOWN-UNKOWN'
  }
}

export const APIURL = Tokens.APIURL;
export const CODEGENURL = Tokens.CODEGENURL;
export const LOGENTRIESTOKEN = Tokens.LOGENTRIESTOKEN;
