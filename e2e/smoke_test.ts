SuiteOf('smoke');

Scenario('test something',  ({ I }) => {
  I.amOnPage("https://example.com");
  I.see("Example Domain");
});

Scenario("Webサイトを開きログインする", ({ I }) => {
  I.amOnPage("https://fastify-webapp-sample-production-e5d6.up.railway.app");
  I.click("ログインする");
  I.fillField("ユーザー名", "user1");
  I.fillField("パスワード", "super-strong-passphrase");
  I.click("ログイン");
  I.see("user1 さん");
})