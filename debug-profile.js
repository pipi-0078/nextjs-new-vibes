const { createClient } = require("next-sanity");

const client = createClient({
  projectId: "h8jbyz2f",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function debugProfile() {
  try {
    const profile = await client.fetch(`*[_type == "profile"][0]`);
    console.log('Current profile data:');
    console.log(JSON.stringify(profile, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

debugProfile();