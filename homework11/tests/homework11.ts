import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Homework11 } from "../target/types/homework11";
import { expect, use } from "chai";

describe("homework11", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();

  anchor.setProvider(provider);

  const program = anchor.workspace.homework11 as Program<Homework11>;
  const user = provider.wallet;

  it("Initialized an account with a balance of 100!", async () => {
    // Add your test here.
    const accountKeyPair = anchor.web3.Keypair.generate();

    const accounts = {
      account: accountKeyPair.publicKey,
      user: user.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    }

    await program.methods
      .initialize()
      .accounts(accounts)
      .signers([accountKeyPair])
      .rpc()

    const account = await program.account.balanceAccount.fetch(accountKeyPair.publicKey);
    expect(account.balance.toNumber()).to.equals(100);
  });
});
