import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { MockWallet } from '../wrappers/MockWallet';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('MockWallet', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('MockWallet');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let mockWallet: SandboxContract<MockWallet>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        mockWallet = blockchain.openContract(MockWallet.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await mockWallet.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: mockWallet.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and mockWallet are ready to use
    });
});
