const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'h8jbyz2f',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugAllContentTypes() {
  try {
    console.log('🔍 全コンテンツタイプのデータを確認中...\n');
    
    // Posts
    const posts = await client.fetch(`*[_type == "post"]`);
    console.log(`📝 記事数: ${posts.length}`);
    if (posts.length > 0) {
      posts.forEach((post, index) => {
        console.log(`  ${index + 1}. ${post.title} (${post.slug?.current})`);
      });
    }
    console.log('');
    
    // Categories
    const categories = await client.fetch(`*[_type == "category"]`);
    console.log(`📂 カテゴリー数: ${categories.length}`);
    if (categories.length > 0) {
      categories.forEach((category, index) => {
        console.log(`  ${index + 1}. ${category.title} (${category.slug?.current})`);
      });
    }
    console.log('');
    
    // Tags
    const tags = await client.fetch(`*[_type == "tag"]`);
    console.log(`🏷️ タグ数: ${tags.length}`);
    if (tags.length > 0) {
      tags.forEach((tag, index) => {
        console.log(`  ${index + 1}. ${tag.title} (${tag.slug?.current})`);
      });
    }
    console.log('');
    
    // Profile
    const profiles = await client.fetch(`*[_type == "profile"]`);
    console.log(`👤 プロフィール数: ${profiles.length}`);
    if (profiles.length > 0) {
      profiles.forEach((profile, index) => {
        console.log(`  ${index + 1}. ${profile.name} - ${profile.catchphrase || 'キャッチフレーズなし'}`);
      });
    }
    console.log('');
    
    // All document types
    const allTypes = await client.fetch(`*[defined(_type)] | { "_type": _type } | order(_type)`);
    const uniqueTypes = [...new Set(allTypes.map(doc => doc._type))];
    console.log(`📋 存在するドキュメントタイプ: ${uniqueTypes.join(', ')}`);
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

debugAllContentTypes();