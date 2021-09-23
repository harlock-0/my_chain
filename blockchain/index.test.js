const Blockchain = require('./index')
const Block = require('./block')

describe('Blockchain', () => {
    let bc,bc2;

    beforeEach (() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    })

    it('starts wil genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    })

    it('add a new block', () => {
        const data = 'testData';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    })

    it('validates a valid chain', () => {
        bc2.addBlock('testData');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'Bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    
    it('invalidates a corrupt chain', () => {
        bc2.addBlock('Data');
        bc2.chain[1].data = 'Not Data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        bc.addBlock('NewData1');
        bc2.replaceChain(bc.chain)
        expect(bc2.chain).toEqual(bc.chain);
      });

      it('does not replcace a chain with the same lengh', () => {
        bc.addBlock('NewData1');
        bc2.addBlock('NewData2');
        bc2.replaceChain(bc.chain)
        expect(bc2.chain).not.toEqual(bc.chain);
      });

      it('does not replcace a chain with the same lengh', () => {
        bc.addBlock('NewData1');
        bc.chain[1].data = 'Not NewData1';
        bc2.replaceChain(bc.chain)
        expect(bc2.chain).not.toEqual(bc.chain);
      });
});