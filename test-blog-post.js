const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'h8jbyz2f',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function testBlogPost() {
  try {
    console.log('🔍 ブログ記事「test」のデータを確認中...\n');
    
    const post = await client.fetch(`
      *[_type == "post" && slug.current == "test" && !draft][0] {
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
    `);
    
    if (!post) {
      console.log('❌ 記事「test」が見つかりません');
      return;
    }
    
    console.log('✅ 記事が見つかりました:');
    console.log(`タイトル: ${post.title}`);
    console.log(`スラッグ: ${post.slug?.current}`);
    console.log(`公開日: ${post.publishedAt}`);
    console.log(`更新日: ${post.updatedAt || 'なし'}`);
    console.log(`画像: ${post.image ? 'あり' : 'なし'}`);
    console.log(`本文: ${post.body ? `${post.body.length}ブロック` : 'なし'}`);
    console.log(`カテゴリー: ${post.categories ? post.categories.length : 0}個`);
    console.log(`タグ: ${post.tags ? post.tags.length : 0}個`);
    console.log(`注目記事: ${post.featured ? 'はい' : 'いいえ'}`);
    console.log(`下書き: ${post.draft ? 'はい' : 'いいえ'}`);
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

testBlogPost();