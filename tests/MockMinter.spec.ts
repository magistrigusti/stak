import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { MockMinter } from '../wrappers/MockMinter';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('MockMinter', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('MockMinter');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let mockMinter: SandboxContract<MockMinter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        mockMinter = blockchain.openContract(MockMinter.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await mockMinter.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: mockMinter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and mockMinter are ready to use
    });
});
