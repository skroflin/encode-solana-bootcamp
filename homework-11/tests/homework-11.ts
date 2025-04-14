import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Homework11 } from "../target/types/homework_11";
import { expect } from "chai";

describe("homework-11", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Homework11 as Program<Homework11>;
  const balanceAccount = anchor.web3.Keypair.generate();

  it("Initializes with a balance of 100!", async () => {
    await program.methods
      .initialize()
      .accounts({
        balanceAccount: balanceAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([balanceAccount])
      .rpc();

    const account = await program.account.balanceAccount.fetch(balanceAccount.publicKey);
    expect(account.balance.toNumber()).to.equal(100);
  });
});
