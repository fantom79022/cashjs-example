var bitcoin = require('bitcoinjs-lib');
function GetKeyPair() {
	var litecoincash = {
                messagePrefix: '\x19Litecoin Signed Message:\n',
                bip32: {
                        public: 0x019da462,
                        private: 0x019d9cfe
                },
                pubKeyHash: 28,
                scriptHash: 5,
        wif: 176
        };

	var keyPair = bitcoin.ECPair.makeRandom({network:litecoincash});
	console.log(keyPair);
	var address = keyPair.getAddress();
	var publicKeyHash = bitcoin.crypto.hash160(keyPair.getPublicKeyBuffer());
	document.writeln("<strong>pubKeyHash: " + publicKeyHash.toString('hex') + "</strong><br>");
	document.writeln("privKey: " + keyPair.toWIF() + "<br>");
	document.writeln("address: " + address + "<br>");


	var key = bitcoin.ECPair.fromWIF("TAoYVtt8x67VzwP1YVpLsGp1qTHGa559rZwzpgMimtiXGiFqnK85", litecoincash);
    var tx = new bitcoin.TransactionBuilder(litecoincash);
    tx.addInput("4ab4b9fc1c8e94b7fb89d61e72dd832e5a84fde21c479958cae3d8324b3d185d", 1);
    tx.addOutput("CJKGNER7XauqVU4bwWqumkQWoyBGkiUjtL", 2500000);
    tx.addOutput("CH4jrxu1uePWBEgbeULCgzUTVucHEpjHxH", 4800000);
    console.log(tx);
    var hashType = bitcoin.Transaction.SIGHASH_ALL | bitcoin.Transaction.SIGHASH_BITCOINCASHBIP143;
    tx.sign(0, key, null, hashType, 0);
    var result = tx.build();
    console.log(result.toHex());
    console.log(result.getId());



}

module.exports = {
	GetKeyPair
}
