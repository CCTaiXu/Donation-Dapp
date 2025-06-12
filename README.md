# 去中心化捐赠平台（Donation Dapp）

本项目是一个基于区块链的去中心化公益捐赠平台，前端采用 React + TypeScript + Vite，后端基于 Solidity 智能合约，支持链上捐赠数据的写入与读取，确保每一笔善款公开透明、可追溯。适合公益组织、个人发起和参与捐赠，支持本地开发与以太坊测试网部署。

## 主要特性

- **链上存证**：所有捐赠数据上链，公开透明，无法篡改
- **钱包连接**：支持 MetaMask 钱包一键连接，用户自主控制资产
- **捐赠留言**：捐赠时可附加留言，链上永久保存
- **实时记录**：前端实时展示最新捐赠记录
- **现代美观 UI**：界面简洁现代，适合公益场景
- **本地与测试网支持**：支持 Hardhat 本地链和以太坊 Sepolia 测试网

---

## 快速开始

### 1. 克隆项目并安装依赖

```bash
git clone https://github.com/CCTaiXu/Donation-Dapp.git
cd donation-dapp
npm install
```

### 2. 启动本地 Hardhat 区块链

```bash
npx hardhat node
```

### 3. 部署智能合约

```bash
npx hardhat run scripts/deploy.cjs --network localhost
```

部署成功后，终端会输出合约地址。将该地址填入 `src/App.tsx` 的 `CONTRACT_ADDRESS` 变量。

### 4. 启动前端开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看效果。

---

## 钱包与账户配置

### MetaMask 连接本地链

1. 打开 MetaMask，添加自定义网络：
   - 网络名称：自定义即可
   - RPC: `http://127.0.0.1:8545`
   - Chain ID: `31337`
2. 导入 Hardhat 节点输出的私钥账户（默认有 10000 ETH 测试币）。
3. 切换到导入的账户，即可在前端发起捐赠。

---

## 主要文件说明

| 文件/目录                        | 说明                                               |
|-----------------------------------|----------------------------------------------------|
| src/App.tsx                      | 前端主页面，集成钱包连接、捐赠、链上数据读取等功能 |
| contracts/Donation.sol            | Solidity 智能合约，负责捐赠数据存储与查询           |
| scripts/deploy.cjs                | 合约部署脚本，支持本地和测试网                      |
| hardhat.config.cjs                | Hardhat 配置，支持 dotenv、Sepolia 网络             |
| .env                              | 环境变量配置（私钥、RPC 地址等）                    |
| .github/copilot-instructions.md   | Copilot 代码生成指令，强调区块链和美观 UI           |

---

## 常见问题与解决

- **钱包无法切换账户/地址？**  
  前端无法直接切换钱包地址，需在 MetaMask 手动切换。导入账户后，切换到目标账户即可。
- **合约未部署或地址错误？**  
  请确保合约已部署，且 `CONTRACT_ADDRESS` 填写正确。
- **没有测试币？**  
  本地链账户默认有测试币。
- **捐赠失败/交易被拒绝？**  
  检查钱包余额、网络连接、合约地址是否正确。

---

## 扩展建议

- 支持 ERC20 代币捐赠（可部署自定义 ERC20 合约）
- 增加公益项目分类、目标金额等功能
- 捐赠排行榜、数据可视化
- 多语言支持

---

## 贡献与反馈

欢迎提交 Issue、PR 或建议，一起让公益更透明！

---

## License

MIT