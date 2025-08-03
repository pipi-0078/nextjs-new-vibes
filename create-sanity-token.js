#!/usr/bin/env node

console.log('📋 Sanity APIトークンの作成手順:\n');

console.log('1. ブラウザで以下のURLを開いてください:');
console.log('   https://www.sanity.io/manage/project/h8jbyz2f\n');

console.log('2. 左側のメニューから「API」を選択\n');

console.log('3. 「Tokens」タブをクリック\n');

console.log('4. 「Add API token」ボタンをクリック\n');

console.log('5. トークンの設定:');
console.log('   - Name: "Blog Write Token" (任意の名前)');
console.log('   - Permissions: "Editor" または "Administrator"');
console.log('   - 「Save」をクリック\n');

console.log('6. 作成されたトークンをコピーして以下のファイルに貼り付け:');
console.log('   - /Users/matsumotoyoshihide/new-vibes/nextjs-new-vibes/.env.local');
console.log('   - /Users/matsumotoyoshihide/new-vibes/studio-new-vibes/.env.local\n');

console.log('7. ファイル内の以下の行を更新:');
console.log('   SANITY_API_TOKEN=ここにトークンを貼り付け\n');

console.log('8. 完了後、サーバーを再起動してください\n');

console.log('⚠️  重要: APIトークンは秘匿情報です。');
console.log('   - Gitにコミットしないでください');
console.log('   - 他の人と共有しないでください');
console.log('   - 必要に応じてトークンを再生成できます\n');

console.log('✅ トークン設定完了後、Sanity Studioでコンテンツの作成・編集が可能になります');