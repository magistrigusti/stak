import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type StakingV1Config = {};

export function stakingV1ConfigToCell(config: StakingV1Config): Cell {
    return beginCell().endCell();
}

export class StakingV1 implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new StakingV1(address);
    }

    static createFromConfig(config: StakingV1Config, code: Cell, workchain = 0) {
        const data = stakingV1ConfigToCell(config);
        const init = { code, data };
        return new StakingV1(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
