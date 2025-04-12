import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloWorldProgram } from "../target/types/hello_world_program";

describe("hello-world-program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.helloWorldProgram as Program<HelloWorldProgram>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
