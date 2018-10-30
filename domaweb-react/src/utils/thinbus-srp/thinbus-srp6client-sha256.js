/**
This is the recommended class as it uses the strong hash which
comes with JDK8 by default.

You must include config which defines your safe prime constant such as SRP6CryptoParams.N_base10 before loading this file e.g.:
*/

import SRP6JavascriptClientSession from './thinbus-srp6client';
import BigInteger from './biginteger';
import CryptoJS from './sha256';

export default function SRP6JavascriptClientSessionSHA256(cryptoParams) {
	this.SRP6CryptoParams = cryptoParams;
	this.k = new BigInteger(cryptoParams.k_base16, 16);
}

SRP6JavascriptClientSessionSHA256.prototype = new SRP6JavascriptClientSession();

SRP6JavascriptClientSessionSHA256.prototype.N = function() {
	return new BigInteger(this.SRP6CryptoParams.N_base10, 10);
}

SRP6JavascriptClientSessionSHA256.prototype.g = function() {
	return new BigInteger(this.SRP6CryptoParams.g_base10, 10);
}

SRP6JavascriptClientSessionSHA256.prototype.H = function (x) {
	return CryptoJS.SHA256(x).toString().toLowerCase();
}
