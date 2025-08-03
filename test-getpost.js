const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'h8jbyz2f',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// getPost関数をテスト（lib/sanity.tsから複製）
async function getPost(slug) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug && !draft][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      updatedAt,
      image {
        alt,
        asset
      },
      body,
      categories[] {
        title,
        slug,
        color
      },
      tags[] {
        title,
        slug
      },
      featured,
      draft
    }
  `, { slug });
}

async function testGetPost() {
  try {
    console.log('🔍 getPost("test")をテスト中...\n');
    
    const post = await getPost('test');
    
    if (!post) {
      console.log('❌ getPost("test")がnullを返しました');
      console.log('これはNotFoundページを表示する原因です');
      return;
    }
    
    console.log('✅ getPost("test")が成功しました:');
    console.log(`タイトル: ${post.title}`);
    console.log(`スラッグ: ${post.slug?.current}`);
    console.log(`URL: /blog/${post.slug?.current}`);
    console.log();
    
    // ナビゲーションが機能するかをシミュレート
    console.log('🔗 リンクのシミュレーション:');
    console.log(`ホームページ → /blog/${post.slug?.current}`);
    console.log(`ブログ一覧 → /blog/${post.slug?.current}`);
    
  } catch (error) {
    console.error('❌ getPostでエラー:', error.message);
    console.error('スタックトレース:', error.stack);
  }
}

testGetPost();