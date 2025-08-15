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
      bio: '仏教は今を生きている"あなた"のために説かれたもの。\n仏教を学べば、今まで気づくことのなかった喜びに気付き、目を逸らしてきた苦しみと向き合うことができます。\nあなたのすぐ近くにある仏教の学びを、誰よりもわかりやすくお届けするサイトです。',
      catchphrase: '仏教をもっと近くに',
      experience: [
        {
          company: '浄土真宗本願寺派',
          position: '僧侶',
          period: '現在',
          description: '浄土真宗本願寺派の僧侶として活動'
        },
        {
          company: 'ブログ運営',
          position: 'ブロガー',
          period: '2020年〜現在（4年）',
          description: '仏教とマインドフルネスに関するブログを運営'
        },
        {
          company: 'マインドフルネススペシャリスト',
          position: '資格取得',
          period: '2023年12月',
          description: 'マインドフルネススペシャリスト資格を取得。メタバース、AIなど最先端の技術に興味津々。趣味はブログと読書と朝活。'
        }
      ],
      skills: [],
      socialLinks: {
        twitter: 'https://twitter.com/yoshibow',
        instagram: 'https://www.instagram.com/yoshi_bows/',
        youtube: 'https://www.youtube.com/@yoshibows',
        github: 'https://github.com/yoshibow'
      },
      contactEmail: 'contact@yoshibow.com'
    };
    
    // プロフィールを更新（存在する場合は更新、存在しない場合は作成）
    console.log('📝 プロフィールを更新中...');
    
    // 既存のプロフィールを確認
    const existingProfile = await client.fetch(`*[_type == "profile"][0]`);
    
    if (existingProfile) {
      // 既存のプロフィールを更新
      const result = await client
        .patch(existingProfile._id)
        .set(profileUpdate)
        .commit();
      console.log('✅ プロフィールを更新しました:', result._id);
    } else {
      // 新規プロフィールを作成
      const result = await client.create({
        _type: 'profile',
        ...profileUpdate
      });
      console.log('✅ 新しいプロフィールを作成しました:', result._id);
    }
    
    console.log('');
    console.log('🎉 プロフィール情報の更新が完了しました！');
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

createSampleData();