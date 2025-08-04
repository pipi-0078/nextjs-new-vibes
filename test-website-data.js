const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'h8jbyz2f',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// src/lib/sanity.tsの関数をテスト
async function getFeaturedPosts() {
  return client.fetch(`
    *[_type == "post" && featured == true && !draft] | order(publishedAt desc) [0...5] {
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
      categories[] {
        title,
        slug,
        color
      },
      tags[] {
        title,
        slug
      },
      featured
    }
  `);
}

async function getProfile() {
  return client.fetch(`
    *[_type == "profile"][0] {
      _id,
      name,
      bio,
      catchphrase,
      profileImage {
        alt,
        asset
      },
      experience[] {
        company,
        position,
        period,
        description
      },
      skills,
      socialLinks {
        twitter,
        instagram,
        youtube,
        github,
        linkedin
      },
      contactEmail
    }
  `);
}

async function getCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color
    }
  `);
}

async function testWebsiteData() {
  try {
    console.log('🌐 ウェブサイトデータ機能をテスト中...\n');
    
    console.log('✅ 注目記事を取得:');
    const featuredPosts = await getFeaturedPosts();
    console.log(`注目記事数: ${featuredPosts.length}`);
    featuredPosts.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.title} (featured: ${post.featured})`);
    });
    console.log('');
    
    console.log('✅ プロフィール情報を取得:');
    const profile = await getProfile();
    if (profile) {
      console.log(`名前: ${profile.name}`);
      console.log(`キャッチフレーズ: ${profile.catchphrase || 'なし'}`);
      console.log(`バイオ: ${profile.bio || 'なし'}`);
      console.log(`経歴数: ${profile.experience ? profile.experience.length : 0}`);
      console.log(`スキル数: ${profile.skills ? profile.skills.length : 0}`);
    } else {
      console.log('プロフィールデータなし');
    }
    console.log('');
    
    console.log('✅ カテゴリー一覧を取得:');
    const categories = await getCategories();
    console.log(`カテゴリー数: ${categories.length}`);
    categories.forEach((category, index) => {
      console.log(`  ${index + 1}. ${category.title} (${category.color})`);
    });
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
    console.error('スタックトレース:', error.stack);
  }
}

testWebsiteData();