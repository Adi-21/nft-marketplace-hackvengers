require("@nomicfoundation/hardhat-toolbox");

// const fs = require("fs")
// const privateKey = fs.readFileSync(".secret").toString()
const projectId = "SyOFb3S3_TNhX25e1YzZklZPdVzQO-VO"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks:{
    // hardhat:{
    //   chainId : 1337,
    // },
    mumbai:{
      url : `https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
      accounts : ["f08531a78307c394db7d7b267d9c32649218eec72442f88d7d1bc2d62378dcd1"]
    }
  },
  solidity: "0.8.17",
};
