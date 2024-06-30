import { toNano } from '@ton/core';
import { MockMinter } from '../wrappers/MockMinter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const mockMinter = provider.open(MockMinter.createFromConfig({}, await compile('MockMinter')));

    await mockMinter.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(mockMinter.address);

    // run methods on `mockMinter`
}
