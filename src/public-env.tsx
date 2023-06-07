let CONTRACT_ADDR : string;
let EXPLORER : string;
let INFURA_IPFS_PROJECTID : string;
let INFURA_IPFS_SECRET: string;
if(!process.env.REACT_APP_CONTRACTADDR || process.env.REACT_APP_CONTRACTADDR === ""){
    throw new Error("process.env.REACT_APP_CONTRACTADDR is undefined")
}else{
    CONTRACT_ADDR = process.env.REACT_APP_CONTRACTADDR;
}

if(!process.env.REACT_APP_EXPLORER || process.env.REACT_APP_EXPLORER === ""){
    throw new Error("process.env.REACT_APP_EXPLORER is undefined")
}else{
    EXPLORER = process.env.REACT_APP_EXPLORER;
}

if(!process.env.REACT_APP_INFURA_IPFS_PROJECTID || process.env.REACT_APP_INFURA_IPFS_PROJECTID === ""){
    throw new Error("process.env.REACT_APP_PROJECTID is undefined")
}else{
    INFURA_IPFS_PROJECTID = process.env.REACT_APP_EXPLORER;
}

if(!process.env.REACT_APP_INFURA_IPFS_SECRET || process.env.REACT_APP_INFURA_IPFS_SECRET === ""){
    throw new Error("process.env.REACT_APP_INFURA_IPFS_SECRET is undefined")
}else{
    INFURA_IPFS_SECRET = process.env.REACT_APP_INFURA_IPFS_SECRET;
}


export {CONTRACT_ADDR, EXPLORER, INFURA_IPFS_PROJECTID, INFURA_IPFS_SECRET}
