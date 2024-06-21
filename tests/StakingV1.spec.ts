import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { StakingV1 } from '../wrappers/StakingV1';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('StakingV1', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('StakingV1');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let stakingV1: SandboxContract<StakingV1>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        stakingV1 = blockchain.openContract(StakingV1.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await stakingV1.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: stakingV1.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and stakingV1 are ready to use
    });
});
