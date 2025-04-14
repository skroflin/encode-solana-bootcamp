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
  let accountKeyPair: anchor.web3.Keypair;

  before(async () => {
    accountKeyPair = anchor.web3.Keypair.generate();

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
  })

  it("Initialized an account with a balance of 100!", async () => {
    // Add your test here.
    const account = await program.account.balanceAccount.fetch(accountKeyPair.publicKey);
    expect(account.balance.toNumber()).to.equals(100);
  });

  it("Can update balance in steps of 100!", async () => {
    for (let i = 0; i < 3; i++) {
      await program.methods
        .updateBalance()
        .accounts({
          account: accountKeyPair.publicKey,
          user: user.publicKey
        })
        .rpc();

      const account = await program.account.balanceAccount.fetch(accountKeyPair.publicKey);
      console.log(`Balance after update ${i + 1}: ${account.balance.toNumber()}`);
      expect(account.balance.toNumber()).to.equals(100 + (i + 1) * 100);
    }
  });

  it("Can update balance up to maximum of 1000", async () => {
    for (let i = 0; i < 6; i++) {
      await program.methods
        .updateBalance()
        .accounts({
          account: accountKeyPair.publicKey,
          user: user.publicKey
        })
        .rpc();

      const accountAfterUpdate = await program.account.balanceAccount.fetch(accountKeyPair.publicKey);
      console.log(`Balance after additional update ${i + 1}: ${accountAfterUpdate.balance.toNumber()}`);
    }
    const account = await program.account.balanceAccount.fetch(accountKeyPair.publicKey);
    expect(account.balance.toNumber()).to.equals(1000);
  });

  it("Throws error when trying to update balance beyond maximum", async () => {
    try {
      await program.methods
        .updateBalance()
        .accounts({
          account: accountKeyPair.publicKey,
          user: user.publicKey,
        })
        .rpc();
      expect.fail("Expected an error but none was thrown!");
    } catch (error) {
      console.log("Error message:", error.message);
      expect(error.message).to.include("Balance maximum reached!");
    }
  });
});
