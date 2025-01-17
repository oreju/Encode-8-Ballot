import { expect } from 'chai';
import { viem } from "hardhat";

describe('HelloWorld', function() {
    it('should return Hello World', async function () {
        const publicClient = await viem.getPublicClient();
        const block = await publicClient.getBlock();
        console.log(block);
        console.log({block});
        const [owner, otherAccount] = await viem.getWalletClients();
        const helloWorldContract = await viem.deployContract("HelloWorld");
        const helloWorldText = await helloWorldContract.read.helloWorld();
        expect(helloWorldText).to.equal('Hello World!');

    });

    it("should change text correctly", async function() {
      const helloWorldContract = await viem.deployContract("HelloWorld");
      const helloWorldText = await helloWorldContract.read.helloWorld();
      const tx = await helloWorldContract.write.setText(["Potato!"])
      const publicClient = await viem.getPublicClient();
      const receipt = await publicClient.getTransactionReceipt({hash: tx});
      const helloWorldText2 = await helloWorldContract.read.helloWorld();
      expect(helloWorldText2).to.equal('Potato!');
    });
});
