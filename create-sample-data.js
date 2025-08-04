const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'h8jbyz2f',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Write tokenが必要
});

async function createSampleData() {
  try {
    console.log('🔨 サンプルデータを作成中...\n');
    
    // カテゴリーを作成
    const categories = [
      {
        _type: 'category',
        title: 'テクノロジー',
        slug: { current: 'technology' },
        description: '最新のテクノロジーに関する記事',
        color: '#3b82f6'
      },
      {
        _type: 'category', 
        title: 'ライフスタイル',
        slug: { current: 'lifestyle' },
        description: '日常生活や趣味に関する記事',
        color: '#10b981'
      }
    ];
    
    // タグを作成
    const tags = [
      {
        _type: 'tag',
        title: 'React',
        slug: { current: 'react' },
        description: 'Reactに関する記事'
      },
      {
        _type: 'tag',
        title: 'Next.js',
        slug: { current: 'nextjs' },
        description: 'Next.jsに関する記事'
      },
      {
        _type: 'tag',
        title: '日記',
        slug: { current: 'diary' },
        description: '日常の出来事'
      }
    ];
    
    // プロフィール情報を更新
    const profileUpdate = {
      name: 'ヨシボウ',
      bio: 'テクノロジーとライフスタイルについて発信するブロガーです。最新の技術トレンドや日常の気づきを共有しています。',
      catchphrase: '技術で人生を豊かに',
      experience: [
        {
          company: 'テック企業A',
          position: 'フロントエンドエンジニア',
          period: '2020-2023',
          description: 'React/Next.jsを使ったWebアプリケーション開発'
        }
      ],
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python'],
      socialLinks: {
        twitter: 'https://twitter.com/yoshibow',
        github: 'https://github.com/yoshibow'
      },
      contactEmail: 'contact@yoshibow.com'
    };
    
    console.log('注意: この操作にはSANITY_API_TOKENが必要です');
    console.log('現在はread-onlyモードで動作しています');
    console.log('');
    console.log('作成予定のデータ:');
    console.log(`カテゴリー: ${categories.length}個`);
    console.log(`タグ: ${tags.length}個`);
    console.log('プロフィール: 1個更新');
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

createSampleData();