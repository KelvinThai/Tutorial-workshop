import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [deployer] = await ethers.getSigners();
    console.log('deploy from address: ', deployer.address);


    // const Floppy = await ethers.getContractFactory("Floppy");
    // const floppy = await Floppy.deploy();
    // console.log('Floppy address: ', floppy.address);
    // Config.setConfig(network + '.Floppy', floppy.address);

    // const Vault = await ethers.getContractFactory("Vault");
    // const vault = await Vault.deploy();
    // console.log('Floppy address: ', vault.address);
    // Config.setConfig(network + '.Vault', vault.address);
    
    // const Floppy = await ethers.getContractFactory("USDT");
    // const floppy = await Floppy.deploy();
    // console.log('USDT address: ', floppy.address);
    //Config.setConfig(network + '.USDT', floppy.address);

    // const Ico = await ethers.getContractFactory("FLPCrowdSale");
    // const ico = await Ico.deploy(1000,100,'0xdF8De3b50Be87dE8676c4731187c5DC5C00E70F3', '0xd54D6d5BD983a6cA18F8820f80E0A970FE4A9a8c');
    // console.log('ICO address: ', ico.address);
    // Config.setConfig(network + '.ico', ico.address);

    
    // const Hero = await ethers.getContractFactory("Hero");
    // const hero = await Hero.deploy();
    // console.log('stman hero address: ', hero.address);
    // Config.setConfig(network + '.Hero', hero.address);


    // const MKP = await ethers.getContractFactory("HeroMarketplace");
    // const heroMarketplace = await MKP.deploy("0x65f00a282A58B30f8376D41832d76CeCB7b6186C", "0xd54D6d5BD983a6cA18F8820f80E0A970FE4A9a8c");
    // console.log('Market deployed at: ', heroMarketplace.address);
    
    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy("0xd54D6d5BD983a6cA18F8820f80E0A970FE4A9a8c", "0x65f00a282A58B30f8376D41832d76CeCB7b6186C");
    console.log('Market deployed at: ', auction.address);
    
    Config.setConfig(network + '.Auction', auction.address);

    await Config.updateConfig();
    
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
});
