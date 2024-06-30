import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type MockMinterConfig = {};

export function mockMinterConfigToCell(config: MockMinterConfig): Cell {
    return beginCell().endCell();
}

export class MockMinter implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new MockMinter(address);
    }

    static createFromConfig(config: MockMinterConfig, code: Cell, workchain = 0) {
        const data = mockMinterConfigToCell(config);
        const init = { code, data };
        return new MockMinter(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
