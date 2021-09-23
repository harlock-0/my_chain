const { hash } = require('./block');
const Block = require('./block');

describe('Block', () => {
    let data, lastBlock, block;
    
    beforeEach(() => {
        data = 'testData';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock,data);
    })
    
    it('set the `Data` to match the input',() => {
        expect(block.data).toEqual(data);
    });
    it('set the `lastHash` to match the hash of the last block',() => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    })
});