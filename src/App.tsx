import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 部署后替换
const CONTRACT_ABI = [
  // 只包含用到的 ABI 片段
  "function donate(string message) payable",
  "function getDonationsCount() view returns (uint256)",
  "function getDonation(uint256) view returns (address,uint256,string,uint256)"
];

function App() {
  const [account, setAccount] = useState<string>("");
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 连接钱包
  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("请先安装 MetaMask！");
    }
  };

  // 读取链上捐赠记录
  const fetchDonations = async () => {
    if (!CONTRACT_ADDRESS.startsWith("0x")) return;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const count = await contract.getDonationsCount();
      const records = [];
      for (let i = Number(count) - 1; i >= 0 && i > Number(count) - 10; i--) {
        const [donor, amount, msg, ts] = await contract.getDonation(i);
        records.push({ donor, amount: ethers.formatEther(amount), msg, ts });
      }
      setDonations(records);
    } catch (e) {
      // 忽略未部署合约时的报错
    }
    setLoading(false);
  };

  // 发起捐赠
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return alert("请先连接钱包");
    if (!donationAmount || isNaN(Number(donationAmount)) || Number(donationAmount) <= 0) return alert("请输入有效金额");
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.donate(message, { value: ethers.parseEther(donationAmount) });
      await tx.wait();
      setDonationAmount("");
      setMessage("");
      fetchDonations();
      alert("捐赠成功，感谢您的支持！");
    } catch (e: any) {
      alert(e?.message || "捐赠失败");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDonations();
    // eslint-disable-next-line
  }, [CONTRACT_ADDRESS]);

  return (
    <div className="donation-app-bg">
      <div className="donation-container">
        <h1>去中心化捐赠平台</h1>
        <p>让每一笔善款公开透明，链上可查</p>
        <button className="wallet-btn" onClick={connectWallet} disabled={!!account}>
          {account ? `已连接: ${account.slice(0, 6)}...${account.slice(-4)}` : "连接钱包"}
        </button>
        <form className="donate-form" onSubmit={handleDonate}>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="捐赠金额 (ETH)"
            value={donationAmount}
            onChange={e => setDonationAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="留言（可选）"
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={64}
          />
          <button type="submit" disabled={loading}>
            {loading ? "处理中..." : "立即捐赠"}
          </button>
        </form>
        <h2>最新捐赠记录</h2>
        {loading && <div>加载中...</div>}
        <ul className="donation-list">
          {donations.length === 0 && <li>暂无捐赠记录</li>}
          {donations.map((d, i) => (
            <li key={i}>
              <span className="donor">{d.donor.slice(0, 6)}...{d.donor.slice(-4)}</span>
              <span className="amount">{d.amount} ETH</span>
              <span className="msg">{d.msg}</span>
              <span className="ts">{new Date(Number(d.ts) * 1000).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
      <footer>公益 · 透明 · 去中心化</footer>
    </div>
  );
}

export default App;
