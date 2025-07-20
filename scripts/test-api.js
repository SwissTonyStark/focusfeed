const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing FocusFeed API endpoints...\n');

  try {
    // Test GET /api/content
    console.log('1. Testing GET /api/content');
    const contentResponse = await fetch(`${BASE_URL}/api/content`);
    const content = await contentResponse.json();
    console.log(`   ✅ Status: ${contentResponse.status}`);
    console.log(`   📊 Found ${content.length} articles\n`);

    // Test GET /api/content with category filter
    console.log('2. Testing GET /api/content?category=IA');
    const filteredResponse = await fetch(`${BASE_URL}/api/content?category=IA`);
    const filteredContent = await filteredResponse.json();
    console.log(`   ✅ Status: ${filteredResponse.status}`);
    console.log(`   📊 Found ${filteredContent.length} IA articles\n`);

    // Test GET /api/user/preferences
    console.log('3. Testing GET /api/user/preferences');
    const prefsResponse = await fetch(`${BASE_URL}/api/user/preferences`);
    const prefs = await prefsResponse.json();
    console.log(`   ✅ Status: ${prefsResponse.status}`);
    console.log(`   👤 User preferences:`, prefs.categories || 'No preferences set\n');

    // Test POST /api/webhook/new-content
    console.log('4. Testing POST /api/webhook/new-content');
    const webhookData = {
      title: "Test Article - API Testing",
      summary: "This is a test article to verify the webhook endpoint is working correctly.",
      fullText: "This is the full text of the test article. It contains enough content to test the duration calculation and other features of the application.",
      originalLink: "https://test.com/article",
      category: "Tecnología",
      estimatedDuration: 3
    };

    const webhookResponse = await fetch(`${BASE_URL}/api/webhook/new-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData)
    });
    const webhookResult = await webhookResponse.json();
    console.log(`   ✅ Status: ${webhookResponse.status}`);
    console.log(`   📝 Result:`, webhookResult.message || webhookResult.error);

    console.log('\n🎉 All API tests completed!');
    console.log('\n📋 Next steps:');
    console.log('   1. Open http://localhost:3000 in your browser');
    console.log('   2. Click "Obtener noticias frescas" to load content');
    console.log('   3. Test the category filters');
    console.log('   4. Try the "Escuchar" buttons (simulated)');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('\n💡 Make sure the development server is running:');
    console.log('   npm run dev');
  }
}

testAPI(); 