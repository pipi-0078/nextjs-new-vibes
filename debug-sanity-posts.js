const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'h8jbyz2f',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugPosts() {
  try {
    console.log('🔍 Sanityの記事データを確認中...\n');
    
    const posts = await client.fetch(`
      *[_type == "post" && !draft] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        featured
      }
    `);
    
    console.log(`📝 記事数: ${posts.length}\n`);
    
    posts.forEach((post, index) => {
      console.log(`${index + 1}. タイトル: ${post.title}`);
      console.log(`   スラッグ: ${post.slug?.current || 'スラッグなし'}`);
      console.log(`   URL: /blog/${post.slug?.current || 'NO-SLUG'}`);
      console.log(`   公開日: ${post.publishedAt}`);
      console.log(`   注目記事: ${post.featured ? 'はい' : 'いいえ'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

debugPosts();