import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (name) => readFile(new URL(`../${name}`, import.meta.url), "utf8");

test("publishes an external account deletion route with required disclosures", async () => {
  const page = await read("account-deletion.html");
  assert.match(page, /Delete your HanBloom account/);
  assert.match(page, /Settings[^<]*Account/i);
  assert.match(page, /Google Play subscription/i);
  assert.match(page, /mugen\.techlab@gmail\.com/);
});

test("legal index links to account deletion", async () => {
  const page = await read("index.html");
  assert.match(page, /href="account-deletion\.html"/);
});

test("privacy and terms describe accounts subscriptions and anonymous aggregates", async () => {
  const privacy = await read("privacy-policy.html");
  const terms = await read("terms-of-service.html");
  assert.match(privacy, /Google account/i);
  assert.match(privacy, /anonymous aggregate/i);
  assert.match(privacy, /account-deletion\.html/);
  assert.match(terms, /Premium subscription/i);
  assert.doesNotMatch(terms, /does not include paid subscriptions/i);
});
