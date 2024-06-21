import { toNano } from '@ton/core';
import { StakingV1 } from '../wrappers/StakingV1';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const stakingV1 = provider.open(StakingV1.createFromConfig({}, await compile('StakingV1')));

    await stakingV1.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(stakingV1.address);

    // run methods on `stakingV1`
}
