const Block = require('./block')

class Blockchain {
    constructor () {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i-1];
            if (block.lastHash !== lastBlock.hash) return false;
            if (Block.hash(block.timestamp,lastBlock.hash,block.data) !== block.hash) return false;
        }
        return true;
    }

    replaceChain(newChain) {
        if (this.chain.length >= newChain.length) {
            console.log('[ERROR] Cannot Replace chain as newChain is not longer than existing chain');
            return false;
        }
        if ( ! this.isValidChain(newChain) ) {
            console.log('[ERROR] Cannot Replace chain as newChain is invalid');
            return false;
        }
        console.log('[INFO] Replacing existing chain by new chain');
        this.chain = newChain;
        return true;
    }
}

module.exports = Blockchain;