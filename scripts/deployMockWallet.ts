import { toNano } from '@ton/core';
import { MockWallet } from '../wrappers/MockWallet';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const mockWallet = provider.open(MockWallet.createFromConfig({}, await compile('MockWallet')));

    await mockWallet.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(mockWallet.address);

    // run methods on `mockWallet`
}
