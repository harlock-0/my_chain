const Block = require('./block');
const genesisBlock = Block.genesis();

console.log(Block.mineBlock(genesisBlock,'My Data').toString());