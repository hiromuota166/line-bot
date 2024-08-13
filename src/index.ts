import express from 'express';
import webhookRoutes from './routes/webhookRoutes';
import { loadEnv } from './utils/envLoader';
import groupRoutes from './routes/groupRoutes'
import orderRoutes from './routes/orderRoutes'

// 環境変数の読み込み
loadEnv();

const app = express();
const PORT = process.env.PORT || 3000;

// JSONとURLエンコードを受け取れるようにする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルートの設定
app.use('/webhook', webhookRoutes);
app.use('/api', groupRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
